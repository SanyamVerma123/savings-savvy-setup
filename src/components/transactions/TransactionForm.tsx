
import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { z } from "zod";

const transactionSchema = z.object({
  name: z.string().min(1, "Transaction name is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense"])
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function TransactionForm() {
  const { addTransaction } = useAppContext();

  const [formData, setFormData] = useState<TransactionFormData>({
    name: "",
    amount: 0,
    category: "Other",
    date: new Date().toISOString().split('T')[0],
    type: "expense"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value ? parseFloat(value) : 0) : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    try {
      transactionSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Add the transaction
    addTransaction(formData);
    
    // Reset form
    setFormData({
      name: "",
      amount: 0,
      category: "Other",
      date: new Date().toISOString().split('T')[0],
      type: "expense"
    });
    
    // Show success toast
    toast.success("Transaction added successfully!", {
      description: `${formData.type === "income" ? "Income" : "Expense"} of $${formData.amount} added.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Transaction Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Groceries, Salary, etc."
                value={formData.name}
                onChange={handleChange}
                className={`finance-input transition-all ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">Amount</label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount || ""}
                onChange={handleChange}
                className={`finance-input transition-all ${errors.amount ? "border-red-500" : ""}`}
              />
              {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Transaction Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className={`finance-input transition-all ${errors.type ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className={`finance-input transition-all ${errors.category ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`finance-input transition-all ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  name: "",
                  amount: 0,
                  category: "Other",
                  date: new Date().toISOString().split('T')[0],
                  type: "expense"
                })}
                className="hover:scale-105 transition-transform"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-finance-primary hover:bg-finance-primary/90 hover:scale-105 transition-transform"
              >
                <Check className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
