import { Card } from "../ui/Card";

interface BotStatsProps {
  botCount: number;
}

export const BotStats = ({ botCount }: BotStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card className="p-6 bg-white shadow-md rounded-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
        Active Bots
      </h3>
      <p className="text-3xl font-bold text-center text-blue-600">{botCount}</p>
    </Card>
  </div>
);
