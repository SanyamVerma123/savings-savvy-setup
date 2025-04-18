
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppContext } from "@/contexts/AppContext";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, totalValue }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-finance-primary font-semibold">${payload[0].value}</p>
        <p className="text-xs text-muted-foreground">
          {((payload[0].value / (totalValue || 1)) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseBreakdown() {
  const isMobile = useIsMobile();
  const { budgetCategories, transactions } = useAppContext();
  
  // Process expenses from real data
  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const hasExpenseData = totalExpenses > 0 || budgetCategories.length > 0;
  
  // Create chart data from budget categories if available, or transactions
  const expenseData = budgetCategories.length > 0 
    ? budgetCategories.map((category, index) => ({
        name: category.name,
        value: category.spent,
        color: getColorForIndex(index)
      }))
    : transactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc: any[], tx) => {
          const existing = acc.find(item => item.name === tx.category);
          if (existing) {
            existing.value += tx.amount;
          } else {
            acc.push({
              name: tx.category,
              value: tx.amount,
              color: getColorForIndex(acc.length)
            });
          }
          return acc;
        }, []);
        
  function getColorForIndex(index: number) {
    const colors = [
      "#8B5CF6", // Purple
      "#F97316", // Orange
      "#06B6D4", // Cyan
      "#EAB308", // Yellow
      "#EC4899", // Pink
      "#A855F7", // Purple-pink
      "#F43F5E"  // Red-pink
    ];
    return colors[index % colors.length];
  }
  
  return (
    <Card className="card-gradient h-full w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasExpenseData || expenseData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[300px] text-center"
          >
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No expense data</h3>
            <p className="text-muted-foreground max-w-sm">
              Add some transactions or budget categories to see your expense breakdown.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[300px] md:h-[350px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={isMobile ? 30 : 60}
                  outerRadius={isMobile ? 60 : 80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={entry.color}
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip totalValue={totalExpenses} />} />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align={isMobile ? "center" : "right"}
                  formatter={(value, entry, index) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
