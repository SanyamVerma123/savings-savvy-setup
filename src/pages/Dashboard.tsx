
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Info, Edit } from "lucide-react";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ConsolidatedAIButton } from "@/components/ai/ConsolidatedAIButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditableTransaction } from "@/components/transactions/EditableTransaction";
import { NotificationButton } from "@/components/dashboard/NotificationButton";

export default function Dashboard() {
  const { transactions, userData, requireLogin } = useAppContext();
  const [currentMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long', year: 'numeric' });
  });
  
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  
  useEffect(() => {
    // Require login for the dashboard
    requireLogin();
    
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
    
    if (!transactions.length && !hasSeenWelcome) {
      setTimeout(() => {
        toast.info("Welcome to Savings Savvy!", {
          description: "Get started by adding your first transaction.",
          duration: 8000,
        });
      }, 1500);
    }
  }, [transactions, requireLogin]);
  
  const handleDismissWelcome = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  const handleDoubleClick = (id: string) => {
    setEditingItem(id);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="flex flex-col gap-6 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              {userData?.name ? `Hello, ${userData.name}` : 'Dashboard'}
            </h1>
            <div className="flex items-center gap-2">
              <NotificationButton />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden sm:flex hover:scale-105 transition-transform">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add a new transaction</DialogTitle>
                  </DialogHeader>
                  <TransactionForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <p className="text-muted-foreground">
            An overview of your finances for <span className="font-medium">{currentMonth}</span>
          </p>
        </motion.div>

        {showWelcome && (
          <motion.div 
            variants={item} 
            className="animate-slideIn w-full"
          >
            <Card className="bg-gradient-to-r from-blue-500 to-teal-400 text-white dark:from-blue-600 dark:to-teal-500 w-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Welcome to Savings Savvy!</h3>
                    <p className="text-white/90">
                      This app helps you track expenses, manage budgets, and achieve your savings goals.
                      Get started by adding your first transaction.
                    </p>
                    <Button 
                      onClick={handleDismissWelcome} 
                      className="mt-4 bg-white text-blue-500 hover:bg-white/90 hover:scale-105 transition-transform"
                    >
                      Got it!
                    </Button>
                  </div>
                  <Info className="h-10 w-10 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div variants={item} className="w-full">
          <OverviewCards />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 gap-6 w-full">
          <div className="w-full">
            <IncomeExpenseChart />
          </div>
          <div className="w-full">
            <ExpenseBreakdown />
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 gap-6 w-full">
          <div className="w-full">
            <BudgetProgress />
          </div>
          <div className="w-full">
            <RecentTransactions />
          </div>
          <div className="w-full">
            <SavingsGoals />
          </div>
        </motion.div>

        <motion.div variants={item} className="sm:hidden w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full hover:scale-105 transition-transform">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add a new transaction</DialogTitle>
              </DialogHeader>
              <TransactionForm />
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
      
      <ConsolidatedAIButton />
      
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Transaction
              </DialogTitle>
            </DialogHeader>
            <EditableTransaction 
              id={editingItem}
              onSave={() => setEditingItem(null)}
              onCancel={() => setEditingItem(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}
