import React, { useRef } from 'react'
import { use } from 'react';
import { AuthContext } from '../store/AuthContext';
import axios from 'axios';
import apiUrl from '../lib/apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useActionState } from 'react';
import { toast } from 'sonner';

export default function useAddReview(refetch, productId) {
  const ratingRef = useRef();
  const { token } = use(AuthContext);
  async function handleAddreview(prevState, formData) {
    const comment = formData.get("comment");
    await axios
      .post(
        `${apiUrl}products/${productId}/reviews`,
        {
          rating: ratingRef.current.state.value,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((data) => refetch())
      .catch((err) => {
        toast(err.response.data.error,{
          icon : <FontAwesomeIcon icon={faX} className="text-red-600"/>,
          position: 'top-right'
        })
      });
  }
  const [_, formAction, pending] = useActionState(handleAddreview);

  return {
    formAction,
    pending,
    ratingRef
  }
}
