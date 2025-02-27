"use client";
import { Review } from "@/types";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.actions";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Rating from "@/components/shared/header/rating";
const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const loadReviews = async () => {
      const reviews = await getReviews({ productId });
      setReviews(reviews);
    };
    loadReviews();
  }, [productId]);
  const reload = () => {
    console.log("reload");
  };
  return (
    <div className="space-y-4">
      {reviews.length === 0 && (
        <div>No reviews yet. Be the first to review this product!</div>
      )}

      {userId ? (
        <>
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
          />
        </>
      ) : (
        <div>
          Please{" "}
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className="text-blue-700 px-2"
          >
            Sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <Rating value={Number(review.rating)} />
                  <div className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    By {review?.user?.name}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(review.createdAt, 'date')}
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
