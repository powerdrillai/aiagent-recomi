import { Navigate, Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { useAuthStore } from "../stores/authStore";

function MainLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex">
        {/* <Sidebar items={navItems} /> */}
        <main className="flex-1 p-6 h-[calc(100vh-4rem)] overflow-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
