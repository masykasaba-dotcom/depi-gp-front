import { memo, useContext, useRef } from "react";
import ReactStars from "react-stars";
import { AuthContext } from "./../store/AuthContext";
import ConfirmModal from './ConfirmModal';
import axios from "axios";
import apiUrl from "../lib/apiUrl";

export default memo(function ReviewCard({
  name,
  customerId,
  rating,
  comment,
  createdAt,
  reviewId,
  refetch
}) {
  const { savedCustomerId,token } = useContext(AuthContext);
  const isOwner = customerId === savedCustomerId;
  const ref = useRef()
  function startDeleteReview(){
    ref.current.showModal()
  }
  async function handleDeleteReview() {
    await axios.delete(`${apiUrl}reviews/${reviewId}`,{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    }).then(()=>refetch())
  }
  return (
    <>
    <ConfirmModal ref={ref} onRemove={handleDeleteReview} />
    <div className="relative rounded-2xl border border-base-300 bg-base-200/60 p-6 flex flex-col gap-4 hover:shadow-lg transition">
      {/* OWN BADGE */}
      {isOwner && (
        <span className="absolute top-3 right-3 text-[10px] bg-primary text-white px-2 py-1 rounded-full">
          own
        </span>
      )}

      {/* USER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
          {name[0]}
        </div>

        <div>
          <p className="font-semibold text-base-content">{name}</p>
          <p className="text-xs text-base-content/60">{createdAt}</p>
        </div>
      </div>

      {/* RATING */}
      <div>
        <ReactStars
          count={5}
          size={24}
          color2={"#ffd700"}
          value={rating}
          edit={false}
        />
      </div>

      {/* COMMENT */}
      <p className="text-sm leading-relaxed text-base-content/80">{comment}</p>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-success flex items-center gap-1 text-xs font-medium">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified Purchase
        </span>

        {/* DELETE BUTTON */}
        {isOwner && (
          <button
          onClick={startDeleteReview} 
          className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white  hover:bg-red-600 transition">
            Delete
          </button>
        )}
      </div>
    </div>
    </>
  );
});
