import React from "react";
import { useParams } from "react-router-dom";

import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import BotUsage from "./components/BotUsage";

function BotConfig() {
  const { id } = useParams<{ id: string }>();

  const tabs = [
    {
      key: "settings",
      label: "Settings",
      children: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Bot Settings</h3>
          <p>Configure your bot settings here.</p>
        </div>
      ),
    },
    {
      key: "usage",
      label: "Usage",
      children: <BotUsage />,
    },
    {
      key: "logs",
      label: "Logs",
      children: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Bot Logs</h3>
          <p>View your bot logs here.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bot Configuration</h1>
      <Card>
        <Tabs items={tabs} />
      </Card>
    </div>
  );
}

export default BotConfig;
