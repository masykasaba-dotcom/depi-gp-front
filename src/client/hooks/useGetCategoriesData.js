import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";

export default function useGetCategoriesData() {
  async function fetchCategoriesWithImages() {
    // 1. Fetch all categories
    const response = await axios.get(`${apiUrl}categories`);
    const categoriesData = response.data?.data || [];

    // 2. For each category, fetch 1 product to grab its image
    const enriched = await Promise.all(
      categoriesData.map(async (cat) => {
        try {
          const prodRes = await axios.get(`${apiUrl}products`, {
            params: { category: cat.category_name, limit: 1 },
          });
          const firstProduct = prodRes.data?.data?.[0];
          const imageUrl = firstProduct?.images?.[0]?.image_url || null;
          return { ...cat, preview_image: imageUrl };
        } catch {
          return { ...cat, preview_image: null };
        }
      })
    );

    return enriched;
  }

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["getCategoriesDataWithImages"],
    queryFn: fetchCategoriesWithImages,
  });

  return { categories, isLoading, isError };
}
