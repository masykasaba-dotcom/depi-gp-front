import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";

export default function useGetCategories() {
  async function fetchCategoriesWithCounts() {
    // 1. Fetch all categories
    const categoriesResponse = await axios.get(`${apiUrl}categories`);
    const categoriesData = categoriesResponse.data?.data || [];

    // 2. Fetch total count for each category concurrently
    const categoryPromises = categoriesData.map(async (cat) => {
      try {
        const productsResponse = await axios.get(`${apiUrl}products`, {
          params: { category: cat.category_name, limit: 1 }
        });
        const count = productsResponse.data?.meta?.total || 0;
        return {
          value: cat.category_name,
          label: cat.category_name,
          count: count
        };
      } catch (error) {
        return {
          value: cat.category_name,
          label: cat.category_name,
          count: 0
        };
      }
    });

    return await Promise.all(categoryPromises);
  }

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["getCategoriesWithCounts"],
    queryFn: fetchCategoriesWithCounts,
  });

  return { categories, isLoading, isError };
}
