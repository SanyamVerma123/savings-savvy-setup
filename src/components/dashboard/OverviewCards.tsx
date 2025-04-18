
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  PiggyBank,
  Wallet,
  Edit
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OverviewCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: React.ReactNode;
  className?: string;
  onLongPress?: () => void;
}

function OverviewCard({
  title,
  value,
  change,
  changeType = "increase",
  icon,
  className,
  onLongPress
}: OverviewCardProps) {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  
  const handlePressStart = useCallback(() => {
    const timer = setTimeout(() => {
      onLongPress?.();
    }, 500);
    setPressTimer(timer);
  }, [onLongPress]);
  
  const handlePressEnd = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }, [pressTimer]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="w-full"
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
    >
      <Card className={`${className} card-gradient overflow-hidden w-full`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <motion.div 
              className="text-primary bg-primary/10 p-2 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            {change && (
              <div className="flex items-center mt-1">
                {changeType === "increase" ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-finance-income mr-1" />
                    <span className="text-xs font-medium text-finance-income">
                      {change}
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-finance-expense mr-1" />
                    <span className="text-xs font-medium text-finance-expense">
                      {change}
                    </span>
                  </>
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function OverviewCards() {
  const { transactions } = useAppContext();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netSavings, setNetSavings] = useState(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    // Calculate totals from transactions
    const income = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const expenses = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setNetSavings(income - expenses);
  }, [transactions]);

  const handleEdit = (type: string, currentValue: number) => {
    setEditingCard(type);
    setEditValue(currentValue.toString());
  };

  const handleSave = () => {
    // Here you would implement the actual saving logic
    toast.success("Value updated successfully");
    setEditingCard(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <OverviewCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
          className="income-card"
          onLongPress={() => handleEdit("income", totalIncome)}
        />
        <OverviewCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          icon={<Wallet className="h-5 w-5" />}
          className="expense-card"
          onLongPress={() => handleEdit("expenses", totalExpenses)}
        />
        <OverviewCard
          title="Net Savings"
          value={`$${netSavings.toFixed(2)}`}
          icon={<PiggyBank className="h-5 w-5" />}
          className="savings-card"
          onLongPress={() => handleEdit("savings", netSavings)}
        />
      </div>

      <Dialog open={!!editingCard} onOpenChange={() => setEditingCard(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit {editingCard?.charAt(0).toUpperCase() + editingCard?.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter new value"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
