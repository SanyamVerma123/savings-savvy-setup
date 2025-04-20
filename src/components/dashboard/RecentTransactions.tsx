
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

export function RecentTransactions() {
  const { transactions, currency } = useAppContext();
  const [localCurrency, setLocalCurrency] = useState(currency);
  
  // Update local currency when context currency changes
  useEffect(() => {
    setLocalCurrency(currency);
  }, [currency]);
  
  const formatAmount = (amount: number) => {
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: localCurrency,
      });
      return formatter.format(amount);
    } catch (error) {
      // Fallback if there's an error with the formatter
      console.error("Currency formatting error:", error);
      return `${localCurrency} ${amount.toFixed(2)}`;
    }
  };

  return (
    <Card className="h-full card-gradient">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Your latest transactions on this platform
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 pb-4">
        <ScrollArea className="h-[400px] w-full">
          <div className="grid grid-cols-1 gap-3 pr-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Add your first transaction!
              </div>
            ) : (
              transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="border rounded-lg p-3 bg-card hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{transaction.name}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                    <div className={`text-right ${transaction.type === 'income' ? 'text-finance-income' : 'text-finance-expense'}`}>
                      <p className="font-bold">{formatAmount(transaction.amount)}</p>
                      <p className="text-xs">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
