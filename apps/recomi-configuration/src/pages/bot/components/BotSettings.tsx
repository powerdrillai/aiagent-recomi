import JSEncrypt from "jsencrypt";
import React from "react";

import { type Bot, updateBot } from "@/apis/bot";
import { useMessage } from "@/hooks/useMessage";
import { useAuthStore } from "@/stores/authStore";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

interface BotSettingsProps {
  bot: Bot | null;
  onBotUpdate: (bot: Bot) => void;
}

const BotSettings: React.FC<BotSettingsProps> = ({ bot, onBotUpdate }) => {
  const { success, error } = useMessage();
  const { fetchPublicKey: getPublicKey } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bot?.id) return;

    const formData = new FormData(e.currentTarget);

    const apiKey = formData.get("apiKey");
    const userId = formData.get("userid");
    const datasetId = formData.get("datasetId");

    // 确保类型安全
    if (
      typeof apiKey !== "string" ||
      typeof userId !== "string" ||
      typeof datasetId !== "string"
    ) {
      throw new Error("Invalid input types");
    }

    // 拼接字符串并加密
    const secretKeyString = `${apiKey}+${userId}+${datasetId}`;
    const encrypt = new JSEncrypt();
    const publicKey = await getPublicKey();
    encrypt.setPublicKey(publicKey);
    const encryptedSecretKey = encrypt.encrypt(secretKeyString);
    if (!encryptedSecretKey) {
      throw new Error("unkonwn err");
    }

    try {
      const updatedBot = await updateBot(bot?.id, {
        name: formData.get("name") as string,
        secretkey: encryptedSecretKey,
      });
      onBotUpdate(updatedBot);
      success("Bot updated successfully");
    } catch (err) {
      error("Failed to update bot");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Bot Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-gray-500">
          Please note: For security reasons, you need to re-enter the API Key
          and other fields each time you update.
        </p>
        <Input
          label="Bot Name"
          name="name"
          defaultValue={bot?.name}
          required
          placeholder="Enter bot name"
        />

        <Input
          label="API Key"
          name="apiKey"
          type="password"
          required
          placeholder="Enter API key"
        />

        <Input
          label="User ID"
          name="userid"
          required
          placeholder="Enter user ID"
        />

        <Input
          label="Dataset ID"
          name="datasetId"
          required
          placeholder="Enter dataset ID"
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BotSettings;
