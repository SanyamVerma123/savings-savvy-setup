
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium w-[100px]">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell className="text-right">
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-center">{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
