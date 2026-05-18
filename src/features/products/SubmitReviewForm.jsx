import React from "react";
import ReactStars from "react-stars";
import useAddReview from "../../hooks/useAddReview";

export default function SubmitReviewForm({ refetch, productId }) {
  const { formAction, pending, ratingRef } = useAddReview(refetch, productId);
  
  return (
    <div className="bg-[#FAF9F6] border border-[#E8E4DE] rounded-2xl p-6 lg:p-8">
      <h3 className="font-display-lg text-[20px] text-[#06373A] mb-1">
        Share Your Experience
      </h3>
      <p className="font-body-md text-[13px] text-[#555a5b] mb-6">
        Your clinical feedback helps others build their regimen.
      </p>

      <div className="mb-6">
        <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
          Overall Rating
        </label>
        <div className="flex gap-1 text-base-content/30 cursor-pointer bg-white border border-[#E8E4DE] rounded-xl px-4 py-2 w-fit">
          <ReactStars
            count={5}
            size={24}
            color1={"#E8E4DE"}
            color2={"#06373A"}
            value={0}
            half={false}
            ref={ratingRef}
          />
        </div>
      </div>

      <form action={formAction}>
        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
            Clinical Review
          </label>
          <textarea
            rows={4}
            className="w-full rounded-xl border border-[#E8E4DE] bg-white px-4 py-3 text-[14px] text-[#06373A] focus:outline-none focus:border-[#06373A] focus:ring-1 focus:ring-[#06373A] transition-all resize-none placeholder:text-[#aab7c4]"
            placeholder="How did this product perform for your skin concerns?"
            name="comment"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#032b26] text-white py-4 rounded-xl font-semibold text-[13px] tracking-widest uppercase hover:bg-[#06373A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Submit Protocol Review'}
        </button>
      </form>
    </div>
  );
}
