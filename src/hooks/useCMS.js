import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../lib/apiUrl";

export function useGetCMSPage(key) {
  return useQuery({
    queryKey: ["cms", key],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}cms/${key}`);
      return data;
    },
    enabled: !!key,
    staleTime: 1000 * 60 * 10, // cache 10 mins
  });
}

export function useGetStoreSettings() {
  return useQuery({
    queryKey: ["store-settings"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}store-settings`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
