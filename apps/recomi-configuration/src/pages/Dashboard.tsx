import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type Bot, deleteBot, getAllBots } from "../apis/bot";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useMessage } from "../hooks/useMessage";

function Dashboard() {
  const navigate = useNavigate();
  const { success, error } = useMessage();
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBots = async () => {
    try {
      const data = await getAllBots();
      setBots(data);
    } catch (err) {
      error("Failed to fetch bots");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const handleDeleteBot = async (id: string) => {
    try {
      await deleteBot(id);
      success("Bot deleted successfully");
      fetchBots();
    } catch (err) {
      error("Failed to delete bot");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="primary" onClick={() => navigate("/bot/create")}>
          Create New Bot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Bots</h3>
          <p className="text-3xl font-bold">{bots.length}</p>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Bots</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : bots.length === 0 ? (
            <p className="text-gray-500">No bots created yet</p>
          ) : (
            <div className="divide-y">
              {bots.map((bot) => (
                <div
                  key={bot.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{bot.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(bot.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/bot/${bot.id}/config`)}
                    >
                      Configure
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBot(bot.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
