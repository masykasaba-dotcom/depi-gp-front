import React from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";

export default function useLaboratoryFavorites() {
  async function getSomeProducts() {
    return await axios.get(
      `${apiUrl}products`,
      {
        params: {
          limit: 5,
          page: 1,
        },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getSomeProducts"],
    queryFn: getSomeProducts,
  });

  const someProduct = data?.data?.data;

  return {
    someProduct,
    isLoading,
    isError,
  };
}
