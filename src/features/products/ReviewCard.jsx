import { memo, useContext, useRef } from "react";
import ReactStars from "react-stars";
import { AuthContext } from "../../context/AuthContext";
import ConfirmModal from "../../components/ui/ConfirmModal";
import axios from "axios";
import apiUrl from "../../lib/apiUrl";

export default memo(function ReviewCard({
  name,
  customerId,
  rating,
  comment,
  createdAt,
  reviewId,
  refetch
}) {
  const { savedCustomerId, token } = useContext(AuthContext);
  const isOwner = customerId === savedCustomerId;
  const ref = useRef();
  
  function startDeleteReview(){
    ref.current.showModal();
  }
  
  async function handleDeleteReview() {
    await axios.delete(`${apiUrl}reviews/${reviewId}`,{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => refetch());
  }

  // Format date
  const dateStr = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : '';

  return (
    <>
    <ConfirmModal ref={ref} onRemove={handleDeleteReview} />
    <div className="relative rounded-2xl border border-[#E8E4DE] bg-white p-6 hover:shadow-md transition-shadow">
      {/* OWN BADGE */}
      {isOwner && (
        <span className="absolute top-4 right-4 text-[9px] bg-[#032b26] text-white px-2 py-1 uppercase tracking-wider font-bold rounded-sm">
          Your Review
        </span>
      )}

      {/* RATING */}
      <div className="mb-3">
        <ReactStars
          count={5}
          size={18}
          color1={"#E8E4DE"}
          color2={"#06373A"}
          value={rating}
          edit={false}
        />
      </div>

      {/* USER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[#06373A] font-bold text-xs uppercase">
          {name?.[0]}
        </div>

        <div>
          <p className="font-semibold text-[#06373A] text-[13px]">{name}</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#555a5b]">{dateStr}</span>
            <span className="text-[10px] text-[#06373A] font-bold uppercase tracking-wider bg-[#E8E4DE] px-1.5 rounded-sm">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* COMMENT */}
      <p className="font-body-md text-[13px] leading-relaxed text-[#555a5b] mb-4">{comment}</p>

      {/* DELETE BUTTON */}
      {isOwner && (
        <div className="flex justify-end border-t border-[#E8E4DE] pt-3 mt-4">
          <button
            onClick={startDeleteReview} 
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete Review
          </button>
        </div>
      )}
    </div>
    </>
  );
});
