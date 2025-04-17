
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  Car, 
  Home, 
  GraduationCap, 
  Gift, 
  Smartphone,
  Plus, 
  Calendar,
  Droplets,
  Edit,
  Trash2,
  AlertCircle,
  MoreVertical 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SavingsGoalProps {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  contribution: number;
  frequency: string;
}

// Sample goals data
const savingsGoals: SavingsGoalProps[] = [
  {
    id: "goal1",
    name: "Vacation to Japan",
    currentAmount: 2500,
    targetAmount: 5000,
    deadline: "December 15, 2023",
    icon: <Plane className="h-5 w-5" />,
    color: "#3B82F6",
    category: "Travel",
    contribution: 500,
    frequency: "Monthly"
  },
  {
    id: "goal2",
    name: "New Car",
    currentAmount: 7500,
    targetAmount: 30000,
    deadline: "June 30, 2024",
    icon: <Car className="h-5 w-5" />,
    color: "#10B981",
    category: "Transportation",
    contribution: 1000,
    frequency: "Monthly"
  },
  {
    id: "goal3",
    name: "House Down Payment",
    currentAmount: 35000,
    targetAmount: 60000,
    deadline: "January 31, 2025",
    icon: <Home className="h-5 w-5" />,
    color: "#8B5CF6",
    category: "Housing",
    contribution: 1500,
    frequency: "Monthly"
  },
  {
    id: "goal4",
    name: "Master's Degree",
    currentAmount: 12000,
    targetAmount: 25000,
    deadline: "August 30, 2024",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "#EC4899",
    category: "Education",
    contribution: 800,
    frequency: "Monthly"
  },
  {
    id: "goal5",
    name: "Wedding Fund",
    currentAmount: 8000,
    targetAmount: 20000,
    deadline: "May 15, 2024",
    icon: <Gift className="h-5 w-5" />,
    color: "#F43F5E",
    category: "Personal",
    contribution: 1000,
    frequency: "Monthly"
  },
  {
    id: "goal6",
    name: "New iPhone",
    currentAmount: 700,
    targetAmount: 1200,
    deadline: "September 1, 2023",
    icon: <Smartphone className="h-5 w-5" />,
    color: "#64748B",
    category: "Electronics",
    contribution: 250,
    frequency: "Bi-weekly"
  }
];

function SavingsGoalCard({ goal }: { goal: SavingsGoalProps }) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isNearTarget = percentage >= 90 && percentage < 100;
  const isComplete = percentage >= 100;

  return (
    <Card className="card-gradient overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-full" 
              style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
            >
              {goal.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{goal.name}</h3>
              <span className="text-sm text-muted-foreground">{goal.category}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Goal
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Droplets className="mr-2 h-4 w-4" />
                Add Contribution
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Goal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">${goal.currentAmount.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">
                / ${goal.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${remaining.toLocaleString()} remaining
            </div>
          </div>
          <div>
            {isComplete ? (
              <span className="inline-flex items-center rounded-full bg-finance-success/20 px-2.5 py-1 text-xs font-medium text-finance-success">
                Completed
              </span>
            ) : isNearTarget ? (
              <span className="inline-flex items-center rounded-full bg-finance-warning/20 px-2.5 py-1 text-xs font-medium text-finance-warning">
                Almost there!
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                {percentage.toFixed(0)}% funded
              </span>
            )}
          </div>
        </div>

        <Progress 
          value={percentage} 
          className="h-2 mb-3"
          indicatorClassName={`bg-[${goal.color}]`}
        />

        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Droplets className="h-3.5 w-3.5 mr-1" />
            Contributing ${goal.contribution}/{goal.frequency}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Due {goal.deadline}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Savings() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
          <p className="text-muted-foreground">
            Track and manage your savings goals
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-gradient col-span-full md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Savings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="total-card bg-finance-primary/10 border-finance-primary/20">
                  <span className="text-sm text-muted-foreground">Total Savings Goals</span>
                  <span className="text-2xl font-bold">$141,200.00</span>
                  <span className="text-xs text-muted-foreground mt-1">Across 6 goals</span>
                </div>
                
                <div className="total-card bg-finance-success/10 border-finance-success/20">
                  <span className="text-sm text-muted-foreground">Current Progress</span>
                  <span className="text-2xl font-bold">$65,700.00</span>
                  <span className="text-xs text-muted-foreground mt-1">46.5% of total</span>
                </div>
                
                <div className="total-card bg-finance-warning/10 border-finance-warning/20">
                  <span className="text-sm text-muted-foreground">Monthly Contribution</span>
                  <span className="text-2xl font-bold">$5,050.00</span>
                  <span className="text-xs text-muted-foreground mt-1">Across all goals</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="col-span-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Goals</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Due</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Tap on a goal to add a contribution</span>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {savingsGoals.map((goal) => (
                  <SavingsGoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {savingsGoals
                  .filter((goal) => {
                    const dueDate = new Date(goal.deadline);
                    const now = new Date();
                    const diffTime = dueDate.getTime() - now.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 90 && goal.currentAmount < goal.targetAmount;
                  })
                  .map((goal) => (
                    <SavingsGoalCard key={goal.id} goal={goal} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {savingsGoals
                  .filter((goal) => goal.currentAmount >= goal.targetAmount)
                  .map((goal) => (
                    <SavingsGoalCard key={goal.id} goal={goal} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
