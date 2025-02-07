import React, { useState } from "react";

interface Tab {
  key: string;
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  items: Tab[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {items.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeKey === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {items.find((tab) => tab.key === activeKey)?.children}
      </div>
    </div>
  );
};
