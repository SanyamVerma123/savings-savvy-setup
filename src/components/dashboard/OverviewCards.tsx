
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  dataId: string;
  currentValue: number;
  onLongPress: (id: string, value: number) => void;
}

function OverviewCard({
  title,
  value,
  change,
  changeType = "increase",
  icon,
  className,
  dataId,
  currentValue,
  onLongPress
}: OverviewCardProps) {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressProgress, setPressProgress] = useState(0);
  const [animation, setAnimation] = useState<NodeJS.Timeout | null>(null);
  
  // Long press timeout - 4.5 seconds (4500ms)
  const LONG_PRESS_DURATION = 4500;
  const ANIMATION_INTERVAL = 100;
  
  const startLongPressTimer = useCallback(() => {
    // Clear any existing timers
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
    if (animation) {
      clearInterval(animation);
    }
    
    // Reset progress
    setPressProgress(0);
    
    // Set progress animation
    const animationInterval = setInterval(() => {
      setPressProgress(prev => {
        const newProgress = prev + (ANIMATION_INTERVAL / LONG_PRESS_DURATION) * 100;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, ANIMATION_INTERVAL);
    
    // Set the actual timer
    const timer = setTimeout(() => {
      onLongPress(dataId, currentValue);
      clearInterval(animationInterval);
      setAnimation(null);
    }, LONG_PRESS_DURATION);
    
    setPressTimer(timer);
    setAnimation(animationInterval);
  }, [onLongPress, dataId, currentValue, pressTimer, animation]);
  
  const cancelLongPressTimer = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    if (animation) {
      clearInterval(animation);
      setAnimation(null);
    }
    setPressProgress(0);
  }, [pressTimer, animation]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="w-full relative"
      onTouchStart={startLongPressTimer}
      onTouchEnd={cancelLongPressTimer}
      onTouchCancel={cancelLongPressTimer}
      onMouseDown={startLongPressTimer}
      onMouseUp={cancelLongPressTimer}
      onMouseLeave={cancelLongPressTimer}
    >
      {pressProgress > 0 && (
        <div className="absolute top-0 left-0 h-1 bg-primary z-10 rounded-t-md transition-all"
          style={{ width: `${pressProgress}%` }}
        />
      )}
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
  const { transactions, updateTotalValues } = useAppContext();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netSavings, setNetSavings] = useState(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
    if (!editingCard) return;
    
    const newValue = parseFloat(editValue);
    if (isNaN(newValue) || newValue < 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (updateTotalValues) {
      updateTotalValues(editingCard, newValue);
      
      // Update local state for immediate UI feedback
      if (editingCard === 'income') {
        setTotalIncome(newValue);
        setNetSavings(newValue - totalExpenses);
      } else if (editingCard === 'expenses') {
        setTotalExpenses(newValue);
        setNetSavings(totalIncome - newValue);
      } else if (editingCard === 'savings') {
        setNetSavings(newValue);
      }
      
      toast.success(`${editingCard.charAt(0).toUpperCase() + editingCard.slice(1)} updated successfully`);
    } else {
      toast.error("Update function not available");
    }
    
    setEditingCard(null);
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <OverviewCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
          className="income-card"
          dataId="income"
          currentValue={totalIncome}
          onLongPress={handleEdit}
        />
        <OverviewCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          icon={<Wallet className="h-5 w-5" />}
          className="expense-card"
          dataId="expenses"
          currentValue={totalExpenses}
          onLongPress={handleEdit}
        />
        <OverviewCard
          title="Net Savings"
          value={`$${netSavings.toFixed(2)}`}
          icon={<PiggyBank className="h-5 w-5" />}
          className="savings-card"
          dataId="savings"
          currentValue={netSavings}
          onLongPress={handleEdit}
        />
      </div>

      <Dialog open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit {editingCard?.charAt(0).toUpperCase() + editingCard?.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Update your financial information. Changes will be saved automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter new value"
              min="0"
              step="0.01"
              className="focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-finance-primary hover:bg-finance-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
