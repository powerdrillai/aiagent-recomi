import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type Bot, getAllBots } from "../apis/bot";
import { BotList } from "../components/dashboard/BotList";
import { BotStats } from "../components/dashboard/BotStats";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { useMessage } from "../hooks/useMessage";

function Dashboard() {
  const navigate = useNavigate();
  const { error } = useMessage();
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

  return (
    <div className="space-y-6">
      <DashboardHeader onCreateBot={() => navigate("/bot/create")} />
      <BotStats botCount={bots.length} />
      <BotList
        bots={bots}
        isLoading={isLoading}
        onConfigureBot={(id) => navigate(`/bot/${id}/config`)}
      />
    </div>
  );
}

export default Dashboard;
