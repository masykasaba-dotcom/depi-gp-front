import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../lib/apiUrl";

function adminAxios() {
  const token = localStorage.getItem("admin-token");
  return axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Dashboard ─────────────────────────────────────────────────
export function useAdminDashboard() {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const { data } = await adminAxios().get("admin/dashboard");
      return data.data;
    },
    refetchInterval: 30_000,
  });
}

// ── Analytics ─────────────────────────────────────────────────
export function useAdminRevenue(days = 30) {
  return useQuery({
    queryKey: ["adminRevenue", days],
    queryFn: async () => {
      const { data } = await adminAxios().get(`admin/analytics/revenue?days=${days}`);
      return data.data;
    },
  });
}

export function useAdminTopProducts() {
  return useQuery({
    queryKey: ["adminTopProducts"],
    queryFn: async () => {
      const { data } = await adminAxios().get("admin/analytics/top-products?limit=10");
      return data.data;
    },
  });
}

export function useAdminOrdersBreakdown() {
  return useQuery({
    queryKey: ["adminOrdersBreakdown"],
    queryFn: async () => {
      const { data } = await adminAxios().get("admin/analytics/orders-breakdown");
      return data.data;
    },
  });
}

export function useAdminCustomerAnalytics(days = 30) {
  return useQuery({
    queryKey: ["adminCustomerAnalytics", days],
    queryFn: async () => {
      const { data } = await adminAxios().get(`admin/analytics/customers?days=${days}`);
      return data.data;
    },
  });
}

export function useAdminQuizAnalytics() {
  return useQuery({
    queryKey: ["adminQuizAnalytics"],
    queryFn: async () => {
      const { data } = await adminAxios().get("admin/analytics/quiz");
      return data.data;
    },
  });
}

// ── Products ──────────────────────────────────────────────────
export function useAdminProducts(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["adminProducts", page, limit, search],
    queryFn: async () => {
      const { data } = await adminAxios().get(
        `products?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`
      );
      return data;
    },
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["adminCategories"],
    queryFn: async () => {
      const { data } = await adminAxios().get("categories");
      return data.data || data;
    },
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await adminAxios().post("admin/products", body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useUpdateProduct(productId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await adminAxios().put(`admin/products/${productId}`, body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await adminAxios().delete(`admin/products/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

// ── Categories ────────────────────────────────────────────────
export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await adminAxios().post("admin/categories", body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminCategories"] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const { data } = await adminAxios().put(`admin/categories/${id}`, body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminCategories"] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await adminAxios().delete(`admin/categories/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminCategories"] }),
  });
}

// ── Orders ────────────────────────────────────────────────────
export function useAdminOrders(page = 1, status = "") {
  return useQuery({
    queryKey: ["adminOrders", page, status],
    queryFn: async () => {
      const { data } = await adminAxios().get(
        `admin/orders?page=${page}&limit=15${status ? `&status=${status}` : ""}`
      );
      return data;
    },
  });
}
