
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface TransactionType {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

interface EditableTransactionProps {
  transaction: TransactionType;
  onSave: (id: string, updatedTransaction: Partial<TransactionType>) => void;
  onCancel: () => void;
  categories: string[];
}

export function EditableTransaction({ 
  transaction, 
  onSave, 
  onCancel,
  categories 
}: EditableTransactionProps) {
  const [name, setName] = useState(transaction.name);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [type, setType] = useState<"income" | "expense">(transaction.type);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSave = () => {
    // Validate inputs
    if (!name.trim()) {
      toast.error("Transaction name cannot be empty");
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Save changes
    onSave(transaction.id, {
      name,
      amount: amountValue,
      category,
      date,
      type
    });
  };
  
  return (
    <div className="p-2 bg-secondary/30 rounded-md border border-primary/20 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted-foreground">Name</label>
          <Input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-8"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted-foreground">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Type</label>
          <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="text-xs text-muted-foreground">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-8"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-1">
        <Button size="sm" variant="outline" onClick={onCancel}><X className="h-4 w-4 mr-1" /> Cancel</Button>
        <Button size="sm" onClick={handleSave}><Check className="h-4 w-4 mr-1" /> Save</Button>
      </div>
    </div>
  );
}
