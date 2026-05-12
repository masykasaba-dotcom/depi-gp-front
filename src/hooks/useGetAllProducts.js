import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import apiUrl from "../lib/apiUrl";

export default function useGetAllProducts() {
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [maxAndMinPrice, setMaxAndMinPrice] = useState({
    maxPrice: "",
    minPrice: "",
  });
  async function getAllProducts() {
    return await axios.get(
      `${apiUrl}products`,
      {
        params: {
          limit: 9,
          page: pageNumber,
          category,
          search,
          max_price: maxAndMinPrice.maxPrice,
          min_price: maxAndMinPrice.minPrice,
        },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "getAllProducts",
      pageNumber,
      category,
      search,
      maxAndMinPrice.maxPrice,
      maxAndMinPrice.minPrice,
    ],
    queryFn: getAllProducts,
  });

  const allProduct = useMemo(() => data?.data?.data, [data, pageNumber]);
  const pages = data?.data?.meta.pages;

  function handleUpdatePageNumber({ selected }) {
    setPageNumber(selected + 1);
    sessionStorage.setItem("pageNumber", selected + 1);
  }

  function handleUpdateCategory(category) {
    setCategory((prevState) => category);
    setPageNumber((prevState) => 1);
    sessionStorage.removeItem("pageNumber");
    sessionStorage.setItem("category", category);
  }

  function handleSearch(value) {
    setPageNumber((prevState) => 1);
    sessionStorage.removeItem("pageNumber");
    setSearch((prevValue) => value);
    sessionStorage.setItem("search", value);
  }

  function handleUpdatePrice(min, max) {
    setPageNumber((prevState) => 1);
    setMaxAndMinPrice((prevState) => ({
      maxPrice: max,
      minPrice: min,
    }));
    sessionStorage.setItem(
      "maxAndMinPrice",
      JSON.stringify({
        maxPrice: max,
        minPrice: min,
      }),
    );
  }
  useEffect(() => {
    if (sessionStorage.getItem("pageNumber")) {
      setPageNumber(+sessionStorage.getItem("pageNumber"));
    }
    return () => {
      if (!location.pathname.startsWith("/products")) {
        sessionStorage.removeItem("pageNumber");
      }
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("category")) {
      setCategory(sessionStorage.getItem("category"));
    }
    return () => {
      if (!location.pathname.startsWith("/products")) {
        sessionStorage.removeItem("category");
      }
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("maxAndMinPrice")) {
      const savedPrice = JSON.parse(sessionStorage.getItem("maxAndMinPrice"))
      setMaxAndMinPrice((prevstate) =>
        ({
          maxPrice : `${savedPrice.maxPrice}`,
          minPrice : `${savedPrice.minPrice}`
        }),
      );
    }
    return () => {
      if (!location.pathname.startsWith("/products")) {
        sessionStorage.removeItem("maxAndMinPrice");
      }
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("search")) {
      setSearch(sessionStorage.getItem("search"));
    }
    return () => {
      if (!location.pathname.startsWith("/products")) {
        sessionStorage.removeItem("search");
      }
    };
  }, []);
  return {
    pageNumber,
    isLoading,
    isError,
    allProduct,
    pages,
    handleUpdatePageNumber,
    handleUpdateCategory,
    category,
    handleSearch,
    search,
    maxAndMinPrice,
    handleUpdatePrice,
  };
}
