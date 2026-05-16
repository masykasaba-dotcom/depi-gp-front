# LUMIÈRE Skincare Platform UI

Welcome to the frontend repository for the **LUMIÈRE Skincare Platform**. This is a modern, feature-rich Single Page Application (SPA) built to provide a premium, seamless, and personalized skincare shopping experience.

## 🚀 Project Overview

The LUMIÈRE platform allows users to browse skincare products, receive personalized recommendations based on a skin survey, manage their shopping cart, and track orders. The UI is built with a strong focus on responsiveness, accessibility, and a beautiful dark/light mode toggle using DaisyUI and Tailwind CSS.

## 🛠️ Technology Stack

This project leverages modern frontend technologies for performance, maintainability, and rapid development:

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) for dynamic client-side routing.
- **State Management & Data Fetching**: 
  - [React Query (@tanstack/react-query)](https://tanstack.com/query/latest) for efficient API caching and asynchronous state management.
  - **Context API** (`AuthContext`, `CartContext`) for global UI state.
- **Styling & UI**: 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [DaisyUI](https://daisyui.com/) for pre-designed, accessible components and built-in theming (Dark/Light modes).
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons & Typography**: FontAwesome (`@fortawesome/react-fontawesome`)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for elegant toast notifications.
- **Linting**: ESLint

## 📂 Project Structure

The project follows a modular and scalable folder structure inside the `src/` directory:

```text
src/
├── assets/        # Static assets (images, logos, fonts)
├── components/    # Reusable UI components
│   ├── layout/    # Navbar, Footer, etc.
│   ├── routing/   # AuthRoute, UnAuthRoute
│   └── ui/        # Generic UI elements (Buttons, Inputs, etc.)
├── context/       # Global Context Providers (AuthContext, CartContext)
├── features/      # Feature-based modular components (auth, products, orders, home)
├── hooks/         # Custom React hooks for shared logic
├── layouts/       # Main page layout wrappers
├── lib/           # Utility functions and API configuration (apiUrl.js)
├── pages/         # Main route components (Views)
├── router/        # Application router configuration
├── App.jsx        # Application root and provider wrappers
├── main.jsx       # React DOM entry point
└── index.css      # Global styles, Tailwind directives, and design system tokens
```

## ✨ Core Features

1. **User Authentication**: Secure Login and Registration flows, protected by custom `AuthRoute` and `UnAuthRoute` wrappers. JWT tokens are decoded using `jwt-decode`.
2. **Personalized Skin Survey**: Users can fill out a skin-type survey (`Survey.jsx`) to receive tailored skincare recommendations (`RecommendationsProducts`).
3. **Product Catalog & Search**: Browse a detailed list of products with pagination (via `react-paginate`) and view in-depth product details.
4. **Shopping Cart Management**: Add, edit, or remove products. State is seamlessly managed globally via `CartContext` and persisted for a smooth experience.
5. **Checkout & Address Management**: Users can manage multiple shipping addresses (`Addresses.jsx`, `AddNewAddress.jsx`) and submit orders.
6. **Order Tracking & History**: Real-time order status tracking UI (`TrackingOrder.jsx`) and detailed order history (`Orders.jsx`).
7. **Reviews & Ratings**: Integrated star ratings (`react-star-ratings`, `react-stars`) allowing users to submit and view product reviews.
8. **Dark Mode**: Fully implemented native dark mode using DaisyUI themes that persist across sessions.

## ⚙️ Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and npm installed on your machine.

### 1. Clone the repository

```bash
git clone <repository-url>
cd depi-gp
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

The application will be running at `http://localhost:5173`. Vite provides Hot Module Replacement (HMR) for an instantaneous feedback loop during development.

## 🏗️ Building for Production

To build the application for production deployment:

```bash
npm run build
```

This will bundle the React application and optimize it for maximum performance. The generated static files will be placed in the `dist/` directory, ready to be deployed to Vercel, Netlify, or any static hosting provider. The `vercel.json` file is already included for seamless Vercel deployments.

You can preview the production build locally by running:

```bash
npm run preview
```

## 🧹 Linting & Code Quality

This project uses ESLint to maintain code quality and enforce best practices. To run the linter:

```bash
npm run lint
```
