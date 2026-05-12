import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import apiUrl from "../lib/apiUrl";
import { useParams } from "react-router";

export default function useGetReviews() {
  const { id } = useParams();

  async function handleGetReviews() {
    return await axios.get(
      `${apiUrl}products/${id}/reviews`,
    );
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["handleGetReviews", id],
    queryFn: handleGetReviews,
  });

  const reviews = data?.data?.data;

  const reviewCount = reviews?.length;
  let totalRating = 0;
  if (!!reviews) {
    for (const review of reviews) {
      totalRating += review.rating;
    }
  }
  const avarageRating =
    totalRating === 0 ? totalRating : totalRating / reviewCount;

  return {
    reviews,
    isLoading,
    isError,
    refetch,
    reviewCount,
    avarageRating,
    id
  };
}
