
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  const [currentMonth] = useState("June 2023");

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button className="hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
          <p className="text-muted-foreground">
            An overview of your finances for <span className="font-medium">{currentMonth}</span>
          </p>
        </div>

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpenseChart />
          <ExpenseBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetProgress />
          <div className="grid grid-cols-1 gap-6">
            <RecentTransactions />
            <SavingsGoals />
          </div>
        </div>

        <div className="sm:hidden">
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
