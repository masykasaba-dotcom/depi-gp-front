import AdminLayout from "../admin/layouts/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminProducts from "../admin/pages/AdminProducts";
import AdminAnalytics from "../admin/pages/AdminAnalytics";
import AdminEditProduct from "../admin/pages/AdminEditProduct";
import AdminCategories from "../admin/pages/AdminCategories";
import AdminOrders from "../admin/pages/AdminOrders";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminRoute from "../admin/components/AdminRoute";

import AdminInventoryBatches from "../admin/pages/AdminInventoryBatches";
import AdminIngredientsDB from "../admin/pages/AdminIngredientsDB";
import AdminOrderDetails from "../admin/pages/AdminOrderDetails";
import AdminReturns from "../admin/pages/AdminReturns";
import AdminShippingLabels from "../admin/pages/AdminShippingLabels";
import AdminCustomersList from "../admin/pages/AdminCustomersList";
import AdminCustomerProfile from "../admin/pages/AdminCustomerProfile";
import AdminQuizAnalytics from "../admin/pages/AdminQuizAnalytics";
import AdminLoyaltyProgram from "../admin/pages/AdminLoyaltyProgram";
import AdminPromotions from "../admin/pages/AdminPromotions";
import AdminFlashSales from "../admin/pages/AdminFlashSales";
import AdminCMSBanners from "../admin/pages/AdminCMSBanners";
import AdminBlogManager from "../admin/pages/AdminBlogManager";
import AdminSEOSettings from "../admin/pages/AdminSEOSettings";
import AdminStoreSettings from "../admin/pages/AdminStoreSettings";
import AdminPaymentGateways from "../admin/pages/AdminPaymentGateways";
import AdminShippingRules from "../admin/pages/AdminShippingRules";
import AdminUsersRoles from "../admin/pages/AdminUsersRoles";
import AdminAuditLog from "../admin/pages/AdminAuditLog";

export const adminRoutes = [
  /* ─── Layout 3: Admin Login (standalone, no sidebar) ─── */
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  /* ─── Layout 4: Admin Dashboard (Sidebar) ─── */
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "analytics", element: <AdminAnalytics /> },
      
      // Catalog
      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <AdminEditProduct /> },
      { path: "products/:id/edit", element: <AdminEditProduct /> },
      { path: "inventory", element: <AdminInventoryBatches /> },
      { path: "ingredients", element: <AdminIngredientsDB /> },
      { path: "categories", element: <AdminCategories /> },

      // Sales
      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <AdminOrderDetails /> },
      { path: "orders/:id/shipping", element: <AdminShippingLabels /> },
      { path: "returns", element: <AdminReturns /> },

      // Marketing & Customers
      { path: "customers", element: <AdminCustomersList /> },
      { path: "customers/:id", element: <AdminCustomerProfile /> },
      { path: "quiz-analytics", element: <AdminQuizAnalytics /> },
      { path: "loyalty", element: <AdminLoyaltyProgram /> },
      { path: "promotions", element: <AdminPromotions /> },
      { path: "flash-sales", element: <AdminFlashSales /> },
      { path: "cms-banners", element: <AdminCMSBanners /> },
      { path: "blog-manager", element: <AdminBlogManager /> },

      // Settings
      { path: "settings", element: <AdminStoreSettings /> },
      { path: "seo", element: <AdminSEOSettings /> },
      { path: "payment", element: <AdminPaymentGateways /> },
      { path: "shipping", element: <AdminShippingRules /> },
      { path: "users", element: <AdminUsersRoles /> },
      { path: "audit", element: <AdminAuditLog /> },
    ],
  },
];
