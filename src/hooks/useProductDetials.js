import axios from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiUrl from "../lib/apiUrl";

export default function useProductDetials() {
    const [selectedVariant, setSelectedVariant] = useState({});
  const { id } = useParams();
  async function getProductDetials() {
    const response = await axios.get(
      `${apiUrl}products/${id}`,
    );
    setSelectedVariant(() => response.data.data.variants[0]);
    return response;
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProductDetials", id],
    queryFn: getProductDetials,
  });

    const productDetials = data?.data?.data;
    
    return {
        productDetials,
        selectedVariant,
        setSelectedVariant,
      isLoading,
        isError
    }
}
