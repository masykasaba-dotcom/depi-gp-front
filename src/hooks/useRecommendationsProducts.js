import React from 'react'
import { use } from 'react';
import { AuthContext } from '../store/AuthContext';
import apiUrl from '../lib/apiUrl';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useRecommendationsProducts() {
  const { token } = use(AuthContext);

  async function handleGetRecommendationsProducts() {
    return await axios.get(`${apiUrl}recommendations/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["handleGetRecommendationsProducts", token],
    queryFn: handleGetRecommendationsProducts,
  });
  const recommendationsProducts = data?.data?.data;

  return{
    recommendationsProducts,
    isError,
    isLoading
  }
}
