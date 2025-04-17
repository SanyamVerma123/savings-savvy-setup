
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { Plus, ArrowUpDown, Download, Upload } from "lucide-react";

export default function Budget() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage your monthly budget categories and limits
          </p>
        </div>

        <Tabs defaultValue="current">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="current">Current Month</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>

          <TabsContent value="current" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 card-gradient">
                <CardHeader>
                  <CardTitle>June 2023 Budget</CardTitle>
                  <CardDescription>
                    Track your spending against your budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetProgress />
                </CardContent>
              </Card>

              <Card className="card-gradient h-fit">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="total-card bg-finance-income/10 border-finance-income/20">
                      <span className="text-sm text-muted-foreground">Total Budget</span>
                      <span className="text-2xl font-bold">$3,600.00</span>
                    </div>
                    
                    <div className="total-card bg-finance-expense/10 border-finance-expense/20">
                      <span className="text-sm text-muted-foreground">Total Spent</span>
                      <span className="text-2xl font-bold">$3,380.00</span>
                    </div>
                    
                    <div className="total-card bg-finance-savings/10 border-finance-savings/20">
                      <span className="text-sm text-muted-foreground">Remaining</span>
                      <span className="text-2xl font-bold">$220.00</span>
                    </div>

                    <Button className="w-full">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Adjust Budget
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="mt-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Budget Planning</CardTitle>
                <CardDescription>
                  Plan your budget for future months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Budget planning tools will be available here in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Budget History</CardTitle>
                <CardDescription>
                  View and analyze your past budgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Historical budget data will be available here in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
