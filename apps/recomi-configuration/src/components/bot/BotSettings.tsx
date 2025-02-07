import React from "react";

import { type Bot } from "@/apis/bot";

import { DangerZone } from "./DangerZone";
import { GeneralSettings } from "./GeneralSettings";

interface BotSettingsProps {
  bot: Bot | null;
  onBotUpdate: (bot: Bot) => void;
}

const BotSettings: React.FC<BotSettingsProps> = ({ bot, onBotUpdate }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <GeneralSettings bot={bot} onBotUpdate={onBotUpdate} />
      <DangerZone bot={bot} />
    </div>
  );
};

export default BotSettings;
