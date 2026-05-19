# DermaCare E-Commerce Platform Frontend

Welcome to the frontend repository for the DermaCare Platform. This is a comprehensive Single Page Application (SPA) built to provide a premium skincare shopping experience and a robust administrative control panel.

## Project Overview

DermaCare is divided into two primary interfaces:
1. **Customer-Facing Storefront**: Allows users to browse skincare products, receive personalized recommendations based on a dynamic skin survey, manage their shopping cart, and track orders.
2. **Administrative Dashboard**: A complete backend management suite featuring inventory tracking, order processing, customer profiles, CMS banner management, flash sales, and analytics.

Both interfaces are built with a strong focus on responsiveness, accessibility, and a cohesive dark/light mode design system using DaisyUI and Tailwind CSS.

## Technology Stack

This project leverages modern frontend technologies for performance, maintainability, and scalability:

- **Core Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7 for dynamic client-side routing.
- **State Management & Data Fetching**: 
  - React Query (@tanstack/react-query) for efficient API caching and asynchronous state management.
  - Context API for global UI state.
- **Styling & UI**: 
  - Tailwind CSS v4
  - DaisyUI for accessible components and built-in theming.
  - Lucide React for consistent dashboard iconography.
- **HTTP Client**: Axios
- **Notifications**: Sonner for elegant toast notifications.

## Project Architecture

The project has been heavily refactored to follow a Domain-Driven top-level directory structure inside the `src/` directory, separating concerns between the client and administrative applications:

```text
src/
├── admin/         # Administrative Dashboard
│   ├── components/  # Dashboard-specific UI components
│   ├── hooks/       # Admin API mutations and queries
│   ├── layouts/     # Dashboard sidebar and header layout
│   └── pages/       # Management views (Inventory, Orders, Settings, etc.)
│
├── client/        # Customer-Facing Storefront
│   ├── components/  # Storefront-specific UI components
│   ├── features/    # Modular business logic (auth, cart, products, home)
│   ├── hooks/       # Client API and state hooks
│   ├── layouts/     # Main storefront layouts (Navbar, Footer)
│   └── pages/       # Storefront views (Shop, Profile, Checkout, etc.)
│
├── shared/        # Shared Resources
│   ├── components/  # Reusable UI elements (Buttons, Modals, Inputs)
│   ├── contexts/    # Global Context Providers (Auth, Cart)
│   └── utils/       # Shared utility functions and API configuration
│
├── routes/        # Application router configuration
│   ├── admin.routes.jsx
│   ├── client.routes.jsx
│   └── index.jsx
│
├── styles/        # Global stylesheets and Tailwind directives
└── assets/        # Static assets (images, logos, fonts)
```

## Core Features

### Client Storefront
- **Authentication**: Secure Login and Registration flows protected by custom route wrappers.
- **Personalized Skin Survey**: Users fill out a dynamic survey to receive tailored skincare recommendations.
- **Product Catalog & Cart**: Browse products, view details, and manage shopping carts with global state persistence.
- **Checkout & Orders**: Manage shipping addresses, submit orders securely, and track real-time order status.

### Administrative Dashboard
- **Catalog Management**: Full CRUD operations for products, categories, ingredients database, and inventory batches.
- **Sales Processing**: Detailed order views, order status updates, and returns/refunds management.
- **Customer CRM**: View customer profiles, order history, loyalty program tiers, and quiz analytics.
- **Marketing Tools**: Manage promotional coupons, schedule flash sales, and configure CMS banners.
- **System Configuration**: Manage SEO defaults, store details, payment gateways, and shipping rules.

## Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have Node.js (v18+ recommended) and npm installed on your machine.

### 1. Clone the repository

```bash
git clone <repository-url>
cd depi-gp-front
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add your environment variables. The project requires the backend API URL to be set:

```env
VITE_API_URL="https://depi-gp-production.up.railway.app/api/"
```
*(Note: You can switch this to your local backend `http://localhost:5000/api/` during local development).*

### 4. Run the Development Server

```bash
npm run dev
```

The application will be running at `http://localhost:5173`. Vite provides Hot Module Replacement (HMR) for rapid development.

## Building for Production

To build the application for production deployment:

```bash
npm run build
```

This bundles the React application and optimizes it for maximum performance. The generated static files will be placed in the `dist/` directory, ready to be deployed to Vercel, Netlify, or any static hosting provider. 

You can preview the production build locally by running:

```bash
npm run preview
```
