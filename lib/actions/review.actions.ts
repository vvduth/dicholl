"use server";

import { z } from "zod";
import { insertReviewSchema } from "../validators";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

// create and update review
export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in to write a review");
    }

    // validate and store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    // get product that is being reviewed
    const product = await prisma.product.findUnique({
      where: {
        id: review.productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // check if user already review that products
    const reviewExists = await prisma.review.findFirst({
      where: {
        userId: review.userId,
        productId: review.productId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        // update review
        await tx.review.update({
          where: {
            id: reviewExists.id,
          },
          data: {
            rating: review.rating,
            description: review.description,
            title: review.title,
          },
        });
      } else {
        await tx.review.create({ data: review });
      }

      // get the avg rating of the product
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: {
          productId: review.productId,
        },
      });

      // get the number of reviews
      const numReviews = await tx.review.count({
        where: {
          productId: review.productId,
        },
      });

      // update product rating
      await tx.product.update({
        where: {
          id: review.productId,
        },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: "Review submitted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get all reviews of a product
export async function getReviews({productId}: {
  productId: string
}) {
  const data = await prisma.review.findMany({
    where: {productId: productId},
    include: {
      user: {
        select: {
          name: true,
          email: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return data;
}


// get one review written by a user
export async function getOneReview({productId}: {productId: string}) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in to write a review");
  }

  const review = await prisma.review.findFirst({
    where: {
      userId: session?.user?.id,
      productId: productId,
    },
  });

  return review;
}