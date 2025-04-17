
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  PiggyBank,
  Wallet
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OverviewCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: React.ReactNode;
  className?: string;
}

function OverviewCard({
  title,
  value,
  change,
  changeType = "increase",
  icon,
  className
}: OverviewCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={`${className} card-gradient overflow-hidden`}>
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

  return (
    <div className="stats-grid">
      <OverviewCard
        title="Total Income"
        value={`$${totalIncome.toFixed(2)}`}
        icon={<DollarSign className="h-5 w-5" />}
        className="income-card"
      />
      <OverviewCard
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
        icon={<Wallet className="h-5 w-5" />}
        className="expense-card"
      />
      <OverviewCard
        title="Net Savings"
        value={`$${netSavings.toFixed(2)}`}
        icon={<PiggyBank className="h-5 w-5" />}
        className="savings-card"
      />
    </div>
  );
}
