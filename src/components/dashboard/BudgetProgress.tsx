
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Home, 
  Utensils, 
  Car, 
  Lightbulb, 
  Heart, 
  Film 
} from "lucide-react";

interface BudgetCategoryProps {
  name: string;
  spent: number;
  budget: number;
  icon: React.ReactNode;
  color: string;
}

const BudgetCategory = ({ name, spent, budget, icon, color }: BudgetCategoryProps) => {
  const percentage = Math.min((spent / budget) * 100, 100);
  const formattedPercentage = percentage.toFixed(0);
  
  const getStatusColor = () => {
    if (percentage >= 100) return "bg-finance-expense";
    if (percentage >= 85) return "bg-finance-warning";
    return `bg-[${color}]`;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div 
            className="p-1.5 rounded-md mr-3" 
            style={{ backgroundColor: `${color}25`, color: color }}
          >
            {icon}
          </div>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">${spent}</span>
          <span className="text-muted-foreground"> / ${budget}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-value" 
          style={{ 
            width: `${formattedPercentage}%`, 
            backgroundColor: color
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">
          {formattedPercentage}% spent
        </span>
        <span className="text-xs text-muted-foreground">
          ${budget - spent} left
        </span>
      </div>
    </div>
  );
};

export function BudgetProgress() {
  // Sample data - in a real app this would come from your state/backend
  const categories = [
    {
      name: "Housing",
      spent: 1200,
      budget: 1200,
      icon: <Home className="h-4 w-4" />,
      color: "#8B5CF6"
    },
    {
      name: "Food",
      spent: 580,
      budget: 650,
      icon: <Utensils className="h-4 w-4" />,
      color: "#F97316"
    },
    {
      name: "Transportation",
      spent: 390,
      budget: 450,
      icon: <Car className="h-4 w-4" />,
      color: "#06B6D4"
    },
    {
      name: "Utilities",
      spent: 280,
      budget: 300,
      icon: <Lightbulb className="h-4 w-4" />,
      color: "#EAB308"
    },
    {
      name: "Healthcare",
      spent: 140,
      budget: 250,
      icon: <Heart className="h-4 w-4" />,
      color: "#EC4899"
    },
    {
      name: "Entertainment",
      spent: 310,
      budget: 350,
      icon: <Film className="h-4 w-4" />,
      color: "#A855F7"
    },
    {
      name: "Shopping",
      spent: 480,
      budget: 400,
      icon: <ShoppingBag className="h-4 w-4" />,
      color: "#F43F5E"
    }
  ];

  return (
    <Card className="card-gradient h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <BudgetCategory
              key={category.name}
              name={category.name}
              spent={category.spent}
              budget={category.budget}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
