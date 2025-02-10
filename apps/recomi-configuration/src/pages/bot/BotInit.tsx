import JSEncrypt from "jsencrypt";
import React from "react";
import { useNavigate } from "react-router-dom";

import { createBot } from "../../apis/bot";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useMessage } from "../../hooks/useMessage";
import { useAuthStore } from "../../stores/authStore";

function BotInit() {
  const navigate = useNavigate();
  const { success, error } = useMessage();
  const { fetchPublicKey: getPublicKey } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
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

      const bot = await createBot({
        name: formData.get("name") as string,
        secretKey: encryptedSecretKey,
      });

      success("Bot创建成功！");
      navigate(`/bot/${bot._id}/config`);
    } catch (err) {
      error(err instanceof Error ? err.message : "创建bot失败");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">创建新Bot</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <Input
            label="Bot Name"
            name="name"
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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Bot
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default BotInit;
