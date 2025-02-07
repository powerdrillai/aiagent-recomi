import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { useAuthStore } from "../stores/authStore";
import { useThemeStore } from "../stores/themeStore";

function MainLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Config Platform</h1>
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={toggleTheme}>
              {isDarkMode ? "🌞" : "🌙"}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </button>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
