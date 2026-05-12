import React from "react";
import { use } from "react";
import { AuthContext } from "../store/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import apiUrl from "../lib/apiUrl";

export default function useTrackingOrder() {
  const { token } = use(AuthContext);
  const { id } = useParams();
  async function getTrackingOrder() {
    return await axios.get(
      `${apiUrl}orders/${id}/tracking`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getTrackingOrder", id, token],
    queryFn: getTrackingOrder,
  });

  const trackingOrder = data?.data?.data;

  return {
    trackingOrder,
    isLoading,
    isError,
  };
}
