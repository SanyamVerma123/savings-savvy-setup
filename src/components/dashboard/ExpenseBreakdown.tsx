
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data - in a real app, this would come from your backend or state management
const expenseData = [
  { name: "Housing", value: 1200, color: "#8B5CF6" },
  { name: "Food", value: 650, color: "#F97316" },
  { name: "Transport", value: 450, color: "#06B6D4" },
  { name: "Utilities", value: 300, color: "#EAB308" },
  { name: "Healthcare", value: 250, color: "#EC4899" },
  { name: "Entertainment", value: 350, color: "#A855F7" },
  { name: "Other", value: 250, color: "#64748B" }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-finance-primary font-semibold">${payload[0].value}</p>
        <p className="text-xs text-muted-foreground">
          {((payload[0].value / 3450) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseBreakdown() {
  const isMobile = useIsMobile();
  
  return (
    <Card className="card-gradient h-full w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={isMobile ? 40 : 60}
                outerRadius={isMobile ? 70 : 80}
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
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align={isMobile ? "center" : "right"}
                formatter={(value, entry, index) => (
                  <span className="text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
