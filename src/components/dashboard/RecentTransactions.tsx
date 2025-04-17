
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Home, 
  Utensils, 
  Car, 
  Lightbulb,
  Film,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  icon: React.ReactNode;
}

const transactions: Transaction[] = [
  {
    id: "tx1",
    name: "Salary",
    category: "Income",
    amount: 5230,
    date: "Jun 01, 2023",
    type: "income",
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    id: "tx2",
    name: "Apartment Rent",
    category: "Housing",
    amount: 1200,
    date: "Jun 03, 2023",
    type: "expense",
    icon: <Home className="h-4 w-4" />
  },
  {
    id: "tx3",
    name: "Grocery Store",
    category: "Food",
    amount: 156.32,
    date: "Jun 05, 2023",
    type: "expense",
    icon: <Utensils className="h-4 w-4" />
  },
  {
    id: "tx4",
    name: "Uber Rides",
    category: "Transportation",
    amount: 57.89,
    date: "Jun 07, 2023",
    type: "expense",
    icon: <Car className="h-4 w-4" />
  },
  {
    id: "tx5",
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: 13.99,
    date: "Jun 09, 2023",
    type: "expense",
    icon: <Film className="h-4 w-4" />
  }
];

import { DollarSign } from "lucide-react";

export function RecentTransactions() {
  return (
    <Card className="card-gradient h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/transactions">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    transaction.type === "income"
                      ? "bg-finance-income/10 text-finance-income"
                      : "bg-finance-expense/10 text-finance-expense"
                  }`}
                >
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{transaction.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  transaction.type === "income"
                    ? "text-finance-income"
                    : "text-finance-expense"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
