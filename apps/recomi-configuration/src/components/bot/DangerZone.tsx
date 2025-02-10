import React from "react";
import { useNavigate } from "react-router-dom";

import { type Bot, deleteBot } from "@/apis/bot";
import { useMessage } from "@/hooks/useMessage";

import { Button } from "../ui/Button";

interface DangerZoneProps {
  bot: Bot | null;
}

export const DangerZone: React.FC<DangerZoneProps> = ({ bot }) => {
  const navigate = useNavigate();
  const { success, error } = useMessage();

  const handleDeleteBot = async () => {
    if (!bot?._id) return;
    try {
      await deleteBot(bot?._id);
      success("Bot deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      error("Failed to delete bot");
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="border-b pb-4 mb-4">
        <h3 className="text-xl font-semibold text-red-600">Danger Zone</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Once you delete this bot, there is no going back. Please be certain.
      </p>
      <Button variant="danger" onClick={handleDeleteBot}>
        Delete Bot
      </Button>
    </div>
  );
};
