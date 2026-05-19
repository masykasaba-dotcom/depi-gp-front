import ReviewCard from "./ReviewCard";
import SubmitReviewForm from "./SubmitReviewForm";
import ProductsLoadingScreen from "../../../shared/components/ProductsLoadingScreen";
import useGetReviews from "../../hooks/useGetReviews";

export default function ReviewsSection() {
  const {
    avarageRating,
    isError,
    isLoading,
    refetch,
    reviewCount,
    reviews,
    id,
  } = useGetReviews();

  return (
    <div className="mt-24 px-6 md:px-8 max-w-5xl mx-auto border-t border-[#E8E4DE] pt-16">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display-lg text-[28px] text-[#06373A] mb-2">
            Clinical Insights & Reviews
          </h2>
          <p className="font-body-md text-[13px] text-[#555a5b]">
            Verified experiences from the DermaCare community.
          </p>
        </div>

        {!isLoading && (
          <div className="flex items-center gap-4 bg-[#FAF9F6] px-6 py-4 rounded-xl border border-[#E8E4DE]">
            <span className="font-display-lg text-[32px] text-[#06373A] leading-none">
              {avarageRating || "0.0"}
            </span>
            <div>
              <div className="text-[14px] text-[#06373A] font-bold tracking-wider uppercase mb-1">
                Average Rating
              </div>
              <span className="text-[11px] text-[#555a5b] block">
                Based on {reviewCount} verified reviews
              </span>
            </div>
          </div>
        )}
      </div>

      {isLoading && <ProductsLoadingScreen />}
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {reviews?.length === 0 ? (
            <div className="bg-white border border-[#E8E4DE] rounded-2xl p-8 text-center text-[#555a5b] font-body-md">
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            reviews?.map((review) => (
              <ReviewCard
                key={review.review_id}
                name={review.customer.first_name + " " + review.customer.last_name}
                customerId={review.customer_id}
                rating={review.rating}
                comment={review.comment}
                createdAt={review.created_at}
                reviewId={review.review_id}
                refetch={refetch}
              />
            ))
          )}
        </div>
        
        <div>
          <div className="sticky top-24">
            <SubmitReviewForm refetch={refetch} productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
