import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  subItems?: Array<{
    label: string;
    path: string;
  }>;
}

interface SidebarProps {
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] p-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white hover:text-white hover:bg-blue-700"
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
              {item.subItems && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {item.subItems && (
              <ul className="mt-2 ml-6 space-y-1 border-l border-gray-200 dark:border-gray-700">
                {item.subItems.map((subItem) => (
                  <li key={subItem.path}>
                    <button
                      onClick={() => navigate(subItem.path)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors
                        ${
                          location.pathname === subItem.path
                            ? "text-blue-600 font-medium"
                            : "text-gray-400 hover:text-gray-900"
                        }`}
                    >
                      {subItem.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
