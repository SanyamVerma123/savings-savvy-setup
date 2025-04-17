
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  MoreVertical,
  Edit,
  Trash2,
  DollarSign,
  Home,
  Utensils,
  Car,
  Film
} from "lucide-react";

// Sample transaction data (would come from state/backend in a real app)
const transactions = [
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
    name: "Gas Station",
    category: "Transportation",
    amount: 42.50,
    date: "Jun 06, 2023",
    type: "expense",
    icon: <Car className="h-4 w-4" />
  },
  {
    id: "tx5",
    name: "Uber Rides",
    category: "Transportation",
    amount: 57.89,
    date: "Jun 07, 2023",
    type: "expense",
    icon: <Car className="h-4 w-4" />
  },
  {
    id: "tx6",
    name: "Electric Bill",
    category: "Utilities",
    amount: 87.45,
    date: "Jun 08, 2023",
    type: "expense",
    icon: <Lightbulb className="h-4 w-4" />
  },
  {
    id: "tx7",
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: 13.99,
    date: "Jun 09, 2023",
    type: "expense",
    icon: <Film className="h-4 w-4" />
  },
  {
    id: "tx8",
    name: "Freelance Work",
    category: "Income",
    amount: 350,
    date: "Jun 12, 2023",
    type: "income",
    icon: <DollarSign className="h-4 w-4" />
  }
];

import { Lightbulb } from "lucide-react";

export default function Transactions() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
          <p className="text-muted-foreground">
            View and manage your transaction history
          </p>
        </div>

        <Card className="card-gradient">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search transactions..." 
                  className="pl-8 w-full finance-input" 
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-36 finance-input">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-36 finance-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Date (newest first)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUp className="mr-2 h-4 w-4" />
                      Date (oldest first)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Amount (highest first)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUp className="mr-2 h-4 w-4" />
                      Amount (lowest first)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-secondary/20">
                      <th className="h-12 px-4 text-left align-middle font-medium">Transaction</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-right align-middle font-medium w-[70px]"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-secondary/50"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "income"
                                  ? "bg-finance-income/10 text-finance-income"
                                  : "bg-finance-expense/10 text-finance-expense"
                              }`}
                            >
                              {transaction.icon}
                            </div>
                            <span className="font-medium">{transaction.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <span
                            className={`font-medium ${
                              transaction.type === "income"
                                ? "text-finance-income"
                                : "text-finance-expense"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : "-"}$
                            {transaction.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right text-muted-foreground">
                          {transaction.date}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-finance-expense">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
