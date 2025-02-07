import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useMessage } from "../../hooks/useMessage";

function BotInit() {
  const navigate = useNavigate();
  const { success, error } = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // TODO: Implement bot creation
      success("Bot created successfully!");
      navigate("/dashboard");
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to create bot");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Bot</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <Input
            label="Bot Name"
            name="name"
            required
            placeholder="Enter bot name"
          />

          <Input
            label="Description"
            name="description"
            placeholder="Enter bot description"
          />

          <Input
            label="API Key"
            name="apiKey"
            type="password"
            required
            placeholder="Enter API key"
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
