"use client";
import { Review } from "@/types";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import ReviewForm from "./review-form";
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

  const reload = () => {
    console.log("reload");
  }
  return (
    <div className="space-y-4">
      {reviews.length === 0 && (
        <div>No reviews yet. Be the first to review this product!</div>
      )}

      {userId ? (
        <><ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        /></>
      ) : (
        <div>
          Please{" "}
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className="text-blue-700 px-2"
          >
            Sign in
          </Link>
          to wrrite a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <></>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
