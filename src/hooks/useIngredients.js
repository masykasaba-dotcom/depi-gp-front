import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../lib/apiUrl";

export default function useIngredients(page = 1, limit = 20, search = "") {
  return useQuery({
    queryKey: ["ingredients", page, limit, search],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}ingredients`, {
        params: { page, limit, search }
      });
      return data; // { meta, data }
    },
    keepPreviousData: true
  });
}
