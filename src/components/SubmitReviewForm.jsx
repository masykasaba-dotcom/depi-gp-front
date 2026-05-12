import axios from "axios";
import React, { useRef } from "react";
import { useActionState } from "react";
import ReactStars from "react-stars";
import apiUrl from "./../lib/apiUrl";
import { use } from "react";
import { AuthContext } from "../store/AuthContext";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useAddReview from "../hooks/useAddReview";

export default function SubmitReviewForm({ refetch, productId }) {
  const {formAction,pending,ratingRef} = useAddReview(refetch,productId)
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-base-300 bg-base-200/30 p-6">
      <p className="text-sm font-medium text-base-content mb-1">
        Write a review
      </p>
      <p className="text-xs text-base-content/60 mb-4">
        Only verified buyers can submit reviews.
      </p>
      <div className="flex gap-1 mb-3 text-base-content/30 cursor-pointer">
        <ReactStars
          count={5}
          size={24}
          color2={"#ffd700"}
          value={1}
          half={false}
          ref={ratingRef}
        />
      </div>
      <form action={formAction}>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm focus:outline-none focus:border-primary"
          placeholder="Share your experience..."
          name="comment"
        />
        <button
          type="submit"
          className="btn btn-neutral  mt-3 w-full rounded-xl text-xs font-semibold uppercase tracking-[0.2em]"
          disabled={pending}
        >
          {pending ? 'Submiting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
