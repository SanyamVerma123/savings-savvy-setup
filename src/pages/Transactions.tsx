
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  MoreVertical,
  Edit,
  Trash2,
  DollarSign,
  Home,
  Utensils,
  Car,
  Film,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Lightbulb,
  Heart,
  HelpCircle
} from "lucide-react";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Income": return <DollarSign className="h-4 w-4" />;
    case "Housing": return <Home className="h-4 w-4" />;
    case "Food": return <Utensils className="h-4 w-4" />;
    case "Transportation": return <Car className="h-4 w-4" />;
    case "Utilities": return <Lightbulb className="h-4 w-4" />;
    case "Entertainment": return <Film className="h-4 w-4" />;
    case "Shopping": return <ShoppingBag className="h-4 w-4" />;
    case "Education": return <BookOpen className="h-4 w-4" />;
    case "Healthcare": return <Heart className="h-4 w-4" />;
    case "Work": return <Briefcase className="h-4 w-4" />;
    default: return <HelpCircle className="h-4 w-4" />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });
};

export default function Transactions() {
  const { transactions, removeTransaction } = useAppContext();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  
  useEffect(() => {
    let result = [...transactions];
    
    // Apply search filter
    if (search) {
      result = result.filter(tx => 
        tx.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter(tx => tx.type === typeFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(tx => tx.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    
    // Apply sorting
    switch (sortBy) {
      case "date-desc":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "date-asc":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "amount-desc":
        result.sort((a, b) => b.amount - a.amount);
        break;
      case "amount-asc":
        result.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }
    
    setFilteredTransactions(result);
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      removeTransaction(id);
      toast.success("Transaction deleted successfully");
    }
  };

  // Get unique categories from transactions
  const uniqueCategories = Array.from(
    new Set(transactions.map(tx => tx.category))
  );

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover:scale-105 transition-transform">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add a new transaction</DialogTitle>
                </DialogHeader>
                <TransactionForm />
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground">
            View and manage your transaction history
          </p>
        </motion.div>

        <motion.div variants={item}>
          <Card className="card-gradient">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search transactions..." 
                    className="pl-8 w-full finance-input input-focus-effect"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger className="w-full md:w-36 finance-input">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-full md:w-36 finance-input">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {uniqueCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSortBy("date-desc")}>
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Date (newest first)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("date-asc")}>
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Date (oldest first)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("amount-desc")}>
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Amount (highest first)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("amount-asc")}>
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Amount (lowest first)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No transactions found</h3>
                  <p className="text-muted-foreground mb-6">
                    {transactions.length === 0 
                      ? "You haven't added any transactions yet." 
                      : "No transactions match your current filters."}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-hover-effect bg-finance-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Transaction
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a new transaction</DialogTitle>
                      </DialogHeader>
                      <TransactionForm />
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-secondary/20">
                          <th className="h-12 px-4 text-left align-middle font-medium">Transaction</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Amount</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Date</th>
                          <th className="h-12 px-4 text-right align-middle font-medium w-[70px]"></th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredTransactions.map((transaction) => (
                          <motion.tr
                            key={transaction.id}
                            className="border-b transition-colors hover:bg-secondary/50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    transaction.type === "income"
                                      ? "bg-finance-income/10 text-finance-income"
                                      : "bg-finance-expense/10 text-finance-expense"
                                  }`}
                                >
                                  {getCategoryIcon(transaction.category)}
                                </div>
                                <span className="font-medium">{transaction.name}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <span className="category-pill category-other">
                                {transaction.category}
                              </span>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <span
                                className={`font-medium ${
                                  transaction.type === "income"
                                    ? "text-finance-income"
                                    : "text-finance-expense"
                                }`}
                              >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toFixed(2)}
                              </span>
                            </td>
                            <td className="p-4 align-middle text-right text-muted-foreground">
                              {formatDate(transaction.date)}
                            </td>
                            <td className="p-4 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-finance-expense"
                                    onClick={() => handleDelete(transaction.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
