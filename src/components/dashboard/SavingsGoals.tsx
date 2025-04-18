
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Car, Home, GraduationCap, Plus, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

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
  const { savingsGoals } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Example icons for predefined goals
  const goalIcons = {
    "Vacation": <Plane className="h-5 w-5" />,
    "Car": <Car className="h-5 w-5" />,
    "House": <Home className="h-5 w-5" />,
    "Education": <GraduationCap className="h-5 w-5" />
  };

  return (
    <Card className="h-full card-gradient w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/savings">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {savingsGoals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg mb-2">No savings goals yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first savings goal to start tracking your progress
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover-effect">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Savings Goal</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center text-muted-foreground">
                  Goal creation form will be implemented here.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="grid gap-4">
            {savingsGoals.map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                name={goal.name}
                currentAmount={goal.current}
                targetAmount={goal.target}
                icon={goalIcons[goal.name as keyof typeof goalIcons] || <Home className="h-5 w-5" />}
                deadline={goal.deadline}
                color="#3B82F6"
              />
            ))}

            <Button className="w-full" variant="outline" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Goal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
