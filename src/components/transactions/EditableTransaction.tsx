
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface EditableTransactionProps {
  id: string;
  onSave: () => void;
  onCancel: () => void;
}

export function EditableTransaction({ id, onSave, onCancel }: EditableTransactionProps) {
  const { transactions, updateTransaction } = useAppContext();
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<"income" | "expense">("expense");

  useEffect(() => {
    const transaction = transactions.find(tx => tx.id === id);
    if (transaction) {
      setAmount(transaction.amount);
      setName(transaction.name);
      setDate(new Date(transaction.date));
      setCategory(transaction.category);
      setType(transaction.type);
    }
  }, [id, transactions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateTransaction(id, {
      amount,
      name,
      date: date.toISOString(),
      category,
      type
    });
    
    toast.success("Transaction updated successfully");
    onSave();
  };

  // Common transaction categories
  const categories = [
    "Housing", "Food", "Transportation", "Utilities", 
    "Healthcare", "Entertainment", "Shopping", "Education",
    "Work", "Income"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-name">Transaction Name</Label>
        <Input
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="edit-amount">Amount</Label>
        <Input
          id="edit-amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="edit-type">Type</Label>
        <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
          <SelectTrigger id="edit-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="edit-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="edit-category">
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
      
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
