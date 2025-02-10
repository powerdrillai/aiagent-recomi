import type { Bot } from "@/apis/bot";

import { Button, Card, CardContent, CardHeader, CardTitle } from "../ui";

interface BotPlaygroundProps {
  bot: Bot | null;
}

export default function BotPlayground({ bot }: BotPlaygroundProps) {
  if (!bot) return null;

  return (
    <Card className="w-full h-[800px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          {bot.name || "Playground"}
        </CardTitle>
        <Button variant="primary" size="md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 4v13.2a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4" />
            <path d="M12 15V3" />
            <path d="m9 6 3-3 3 3" />
          </svg>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 py-4 px-10">
        <iframe
          src={`http://localhost:5175/`}
          className="w-full h-full border-0"
          title="Bot Chat Interface"
        />
      </CardContent>
    </Card>
  );
}
