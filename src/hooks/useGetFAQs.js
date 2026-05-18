import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../lib/apiUrl";

export default function useGetFAQs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}faqs`);
      return data; // { data: faqs }
    },
  });
}
