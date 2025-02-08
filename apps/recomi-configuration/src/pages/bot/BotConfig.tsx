import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { type Bot, getBotById } from "@/apis/bot";
import BotPlayground from "@/components/bot/BotPlayground";
import BotSettings from "@/components/bot/BotSettings";
import BotUsage from "@/components/bot/BotUsage";
import { Button, Card, Tabs } from "@/components/ui";
import { useMessage } from "@/hooks/useMessage";

function BotConfig() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { error } = useMessage();
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBot = async () => {
      if (!id) return;
      try {
        const data = await getBotById(id);
        setBot(data);
      } catch (err) {
        error("Failed to fetch bot details");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBot();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const tabs = [
    {
      key: "playground",
      label: "Playground",
      children: <BotPlayground bot={bot} />,
    },
    {
      key: "usage",
      label: "Usage",
      children: <BotUsage bot={bot} />,
    },
    {
      key: "settings",
      label: "Settings",
      children: <BotSettings bot={bot} onBotUpdate={setBot} />,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bot Configuration</h1>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      <Card>
        <Tabs items={tabs} />
      </Card>
    </div>
  );
}

export default BotConfig;
