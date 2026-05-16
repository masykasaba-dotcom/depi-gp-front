import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* You can add a logo or back link here */}
        <Outlet />
      </div>
    </div>
  );
}
