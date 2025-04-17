
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Car, Home, GraduationCap, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface SavingsGoalProps {
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: React.ReactNode;
  deadline: string;
  color: string;
}

function SavingsGoalCard({
  name,
  currentAmount,
  targetAmount,
  icon,
  deadline,
  color
}: SavingsGoalProps) {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const formattedPercentage = percentage.toFixed(0);

  return (
    <Card className="overflow-hidden card-gradient border-t-4" style={{ borderTopColor: color }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color: color }}>
              {icon}
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <span className="text-xs text-muted-foreground">Due {deadline}</span>
        </div>

        <div className="progress-bar mb-2">
          <div
            className="progress-value"
            style={{
              width: `${formattedPercentage}%`,
              backgroundColor: color
            }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">${currentAmount.toLocaleString()}</span>
            <span className="text-muted-foreground"> / ${targetAmount.toLocaleString()}</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">
            {formattedPercentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function SavingsGoals() {
  // Sample data - in a real app this would come from your state or backend
  const goals = [
    {
      id: "goal1",
      name: "Vacation",
      currentAmount: 2500,
      targetAmount: 5000,
      icon: <Plane className="h-5 w-5" />,
      deadline: "Dec 2023",
      color: "#3B82F6"
    },
    {
      id: "goal2",
      name: "New Car",
      currentAmount: 7500,
      targetAmount: 30000,
      icon: <Car className="h-5 w-5" />,
      deadline: "Jun 2024",
      color: "#10B981"
    },
    {
      id: "goal3",
      name: "House Down Payment",
      currentAmount: 35000,
      targetAmount: 60000,
      icon: <Home className="h-5 w-5" />,
      deadline: "Jan 2025",
      color: "#8B5CF6"
    }
  ];

  return (
    <Card className="h-full card-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/savings">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              name={goal.name}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
              icon={goal.icon}
              deadline={goal.deadline}
              color={goal.color}
            />
          ))}

          <Button className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
