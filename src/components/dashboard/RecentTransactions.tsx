
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Home, 
  Utensils, 
  Car, 
  Lightbulb,
  Film,
  CreditCard,
  Briefcase,
  BookOpen,
  HeartPulse,
  PiggyBank
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { EditableTransaction } from "@/components/transactions/EditableTransaction";
import { toast } from "sonner";

// Helper function to get icon for transaction category
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('salary') || categoryLower.includes('income')) {
    return <Briefcase className="h-4 w-4" />;
  } else if (categoryLower.includes('rent') || categoryLower.includes('house') || categoryLower.includes('home')) {
    return <Home className="h-4 w-4" />;
  } else if (categoryLower.includes('food') || categoryLower.includes('grocery') || categoryLower.includes('restaurant')) {
    return <Utensils className="h-4 w-4" />;
  } else if (categoryLower.includes('car') || categoryLower.includes('transport') || categoryLower.includes('gas')) {
    return <Car className="h-4 w-4" />;
  } else if (categoryLower.includes('stream') || categoryLower.includes('netflix') || categoryLower.includes('entertainment')) {
    return <Film className="h-4 w-4" />;
  } else if (categoryLower.includes('bill') || categoryLower.includes('utility')) {
    return <Lightbulb className="h-4 w-4" />;
  } else if (categoryLower.includes('health') || categoryLower.includes('medical')) {
    return <HeartPulse className="h-4 w-4" />;
  } else if (categoryLower.includes('shop') || categoryLower.includes('store')) {
    return <ShoppingBag className="h-4 w-4" />;
  } else if (categoryLower.includes('education') || categoryLower.includes('school')) {
    return <BookOpen className="h-4 w-4" />;
  } else if (categoryLower.includes('savings') || categoryLower.includes('invest')) {
    return <PiggyBank className="h-4 w-4" />;
  }
  
  // Default icon
  return <CreditCard className="h-4 w-4" />;
};

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function RecentTransactions() {
  const { transactions, updateTransaction } = useAppContext();
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  
  // Get the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get unique categories from all transactions for dropdown
  const uniqueCategories = Array.from(
    new Set(transactions.map(tx => tx.category))
  );

  const handleDoubleClick = (id: string) => {
    setEditingTransactionId(id);
  };

  const handleSaveEdit = (id: string, updatedData: Partial<typeof transactions[0]>) => {
    updateTransaction(id, updatedData);
    setEditingTransactionId(null);
    toast.success("Transaction updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="card-gradient h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild className="hover:scale-105 transition-transform">
          <Link to="/transactions">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {recentTransactions.map((transaction) => (
              <div key={transaction.id}>
                {editingTransactionId === transaction.id ? (
                  <EditableTransaction 
                    transaction={transaction}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    categories={uniqueCategories}
                  />
                ) : (
                  <motion.div 
                    className="flex items-center justify-between cursor-pointer hover:bg-secondary/30 p-2 rounded-md transition-colors"
                    variants={item}
                    onDoubleClick={() => handleDoubleClick(transaction.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          transaction.type === "income"
                            ? "bg-finance-income/10 text-finance-income"
                            : "bg-finance-expense/10 text-finance-expense"
                        }`}
                      >
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{transaction.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.category} • {formatDate(transaction.date)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        transaction.type === "income"
                          ? "text-finance-income"
                          : "text-finance-expense"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <DollarSign className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-xs text-muted-foreground mt-1">Add your first transaction to see it here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
