import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";

export function useGetBlogPosts(page = 1, limit = 9) {
  return useQuery({
    queryKey: ["blog", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}blog?page=${page}&limit=${limit}`);
      return data;
    },
  });
}

export function useGetBlogPost(slug) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}blog/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
