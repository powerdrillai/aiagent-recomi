import { Button } from "../ui/Button";

interface DashboardHeaderProps {
  onCreateBot: () => void;
}

export const DashboardHeader = ({ onCreateBot }: DashboardHeaderProps) => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <Button variant="primary" onClick={onCreateBot}>
      Create New Bot
    </Button>
  </div>
);
