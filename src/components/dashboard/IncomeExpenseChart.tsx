
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppContext } from "@/contexts/AppContext";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Sample data - would come from your backend in a real app
const sampleMonthlyData = [
  {
    name: "Jan",
    income: 4500,
    expenses: 3200,
    savings: 1300
  },
  {
    name: "Feb",
    income: 4700,
    expenses: 3300,
    savings: 1400
  },
  {
    name: "Mar",
    income: 4800,
    expenses: 3450,
    savings: 1350
  },
  {
    name: "Apr",
    income: 5100,
    expenses: 3600,
    savings: 1500
  },
  {
    name: "May",
    income: 5300,
    expenses: 3700,
    savings: 1600
  },
  {
    name: "Jun",
    income: 5230,
    expenses: 3450,
    savings: 1780
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="font-medium">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-xs flex items-center">
            <span className="w-3 h-3 inline-block mr-2 bg-finance-income rounded-sm"></span>
            Income: <span className="ml-2 font-semibold">${payload[0].value}</span>
          </p>
          <p className="text-xs flex items-center">
            <span className="w-3 h-3 inline-block mr-2 bg-finance-expense rounded-sm"></span>
            Expenses: <span className="ml-2 font-semibold">${payload[1].value}</span>
          </p>
          <p className="text-xs flex items-center">
            <span className="w-3 h-3 inline-block mr-2 bg-finance-savings rounded-sm"></span>
            Savings: <span className="ml-2 font-semibold">${payload[2].value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function IncomeExpenseChart() {
  const isMobile = useIsMobile();
  const { transactions } = useAppContext();
  
  // Check if we have transaction data
  const hasData = transactions.length > 0;
  
  return (
    <Card className="card-gradient h-full w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[300px] text-center"
          >
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No transaction data</h3>
            <p className="text-muted-foreground max-w-sm">
              Add some transactions to see your income and expense trends.
            </p>
          </motion.div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sampleMonthlyData}
                margin={{
                  top: 20,
                  right: isMobile ? 10 : 30,
                  left: isMobile ? 0 : 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" name="Savings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
