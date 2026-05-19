import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useGetWishlist() {
  const { token } = use(AuthContext);

  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data; // { data: items }
    },
    enabled: !!token
  });
}

export function useAddToWishlist() {
  const { token } = use(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await axios.post(
        `${apiUrl}wishlist`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}

export function useRemoveFromWishlist() {
  const { token } = use(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await axios.delete(
        `${apiUrl}wishlist/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}

export function useClearWishlist() {
  const { token } = use(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${apiUrl}wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}
