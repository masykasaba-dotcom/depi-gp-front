import React from "react";
import { AuthContext } from "../store/AuthContext";
import { use } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import apiUrl from "../lib/apiUrl";

export default function useGetOrdres() {
  const { token } = use(AuthContext);
  async function handlegetOrders() {
    return await axios.get(
      `${apiUrl}orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["handlegetOrders", token],
    queryFn: handlegetOrders,
  });
  const orders = data?.data.data;
  return {
    orders,
    isLoading,
  };
}
