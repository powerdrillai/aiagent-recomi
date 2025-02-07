import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../stores/authStore";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">Config Platform</h1>
        <div className="flex items-center gap-4">
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
  );
};
