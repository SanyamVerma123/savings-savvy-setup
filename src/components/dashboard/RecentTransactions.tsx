
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { formatDistanceToNow } from "date-fns";
import { DollarSign, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface RecentTransactionsProps {
  onDoubleClick?: (id: string) => void;
}

export function RecentTransactions({ onDoubleClick }: RecentTransactionsProps) {
  const { transactions } = useAppContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Sort transactions by date (newest first) and take the most recent 5
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
    
  return (
    <Card className="card-gradient h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/transactions")}
          className="h-8 px-2 lg:px-3"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No transactions yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first transaction to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-secondary/50 px-2 rounded-md transition-colors"
                onDoubleClick={() => onDoubleClick?.(transaction.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-finance-income/10 text-finance-income"
                        : "bg-finance-expense/10 text-finance-expense"
                    }`}
                  >
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium leading-none mb-1">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-finance-income"
                        : "text-finance-expense"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
