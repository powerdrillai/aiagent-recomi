import { type Bot } from "../../apis/bot";
import { Card } from "../ui/Card";
import { LoadingSpinner } from "./LoadingSpinner";

interface BotListProps {
  bots: Bot[];
  isLoading: boolean;
  onConfigureBot: (id: string) => void;
}

export const BotList = ({ bots, isLoading, onConfigureBot }: BotListProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold">ChatBot</h2>
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <Card
            key={bot._id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onConfigureBot(bot._id)}
          >
            <div className="p-2 space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">{bot.name}</h3>
                <p className="text-sm text-gray-500">
                  Created on {new Date(bot.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
        {bots.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No chatbots available</p>
          </div>
        )}
      </div>
    )}
  </div>
);
