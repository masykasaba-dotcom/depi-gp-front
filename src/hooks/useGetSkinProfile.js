import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import apiUrl from "../lib/apiUrl";

export default function useGetSkinProfile() {
  const { token } = use(AuthContext);

  return useQuery({
    queryKey: ["skinProfile", token],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}profile/skin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data; // { data: skin_profile }
    },
    enabled: !!token,
    retry: false, // don't retry on 404 (no profile yet)
  });
}
