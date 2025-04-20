
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Home, 
  Utensils, 
  Car, 
  Lightbulb, 
  Heart, 
  Film 
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BudgetCategoryProps {
  id: string;
  name: string;
  spent: number;
  budget: number;
  icon: React.ReactNode;
  color: string;
  currency: string;
  onLongPressStart?: (id: string) => void;
  onLongPressEnd?: () => void;
}

interface BudgetProgressProps {
  onLongPressStart?: (id: string) => void;
  onLongPressEnd?: () => void;
}

const BudgetCategory = ({ 
  id,
  name, 
  spent, 
  budget, 
  icon, 
  color, 
  currency,
  onLongPressStart,
  onLongPressEnd
}: BudgetCategoryProps) => {
  const percentage = Math.min((spent / budget) * 100, 100);
  const formattedPercentage = percentage.toFixed(0);
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);
  
  // Format amounts with the correct currency
  const formatAmount = (amount: number) => {
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      });
      return formatter.format(amount);
    } catch (error) {
      // Fallback if there's an error with the formatter
      console.error("Currency formatting error:", error);
      return `${currency} ${amount.toFixed(2)}`;
    }
  };
  
  // Optimize touch events to prevent UI hanging using timeouts
  const handleTouchStart = () => {
    if (onLongPressStart) {
      // Use setTimeout to avoid blocking the UI thread
      const timer = window.setTimeout(() => {
        onLongPressStart(id);
      }, 10);
      setLongPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    if (onLongPressEnd) {
      // Use setTimeout to avoid blocking the UI thread
      setTimeout(() => {
        onLongPressEnd();
      }, 10);
    }
  };

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer !== null) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  return (
    <motion.div 
      className="mb-4"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div 
            className="p-1.5 rounded-md mr-3" 
            style={{ backgroundColor: `${color}25`, color: color }}
          >
            {icon}
          </div>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">{formatAmount(spent)}</span>
          <span className="text-muted-foreground"> / {formatAmount(budget)}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-value" 
          style={{ 
            width: `${formattedPercentage}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">
          {formattedPercentage}% spent
        </span>
        <span className="text-xs text-muted-foreground">
          {formatAmount(budget - spent)} left
        </span>
      </div>
    </motion.div>
  );
};

export function BudgetProgress({ onLongPressStart, onLongPressEnd }: BudgetProgressProps) {
  const { budgetCategories, currency } = useAppContext();
  const [localCurrency, setLocalCurrency] = useState(currency);

  // Update currency when it changes in the context
  useEffect(() => {
    setLocalCurrency(currency);
    
    const handleCurrencyUpdate = (e: CustomEvent) => {
      setLocalCurrency(e.detail);
    };
    
    window.addEventListener('currency-updated', handleCurrencyUpdate as EventListener);
    
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate as EventListener);
    };
  }, [currency]);

  // Icon mapping for categories
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('home') || lowerName.includes('rent') || lowerName.includes('mortgage')) 
      return <Home className="h-4 w-4" />;
    if (lowerName.includes('food') || lowerName.includes('grocery') || lowerName.includes('restaurant')) 
      return <Utensils className="h-4 w-4" />;
    if (lowerName.includes('car') || lowerName.includes('transport') || lowerName.includes('gas')) 
      return <Car className="h-4 w-4" />;
    if (lowerName.includes('util') || lowerName.includes('electric') || lowerName.includes('water')) 
      return <Lightbulb className="h-4 w-4" />;
    if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('fitness')) 
      return <Heart className="h-4 w-4" />;
    if (lowerName.includes('entertainment') || lowerName.includes('movie') || lowerName.includes('fun')) 
      return <Film className="h-4 w-4" />;
    
    // Default
    return <ShoppingBag className="h-4 w-4" />;
  };

  // Color mapping for categories
  const getCategoryColor = (name: string, index: number) => {
    const colors = [
      "#8B5CF6", // Purple
      "#F97316", // Orange
      "#06B6D4", // Cyan
      "#EAB308", // Yellow
      "#EC4899", // Pink
      "#A855F7", // Purple-pink
      "#F43F5E"  // Red-pink
    ];
    
    const lowerName = name.toLowerCase();
    if (lowerName.includes('home') || lowerName.includes('rent')) return "#8B5CF6";
    if (lowerName.includes('food') || lowerName.includes('grocery')) return "#F97316";
    if (lowerName.includes('transport')) return "#06B6D4";
    if (lowerName.includes('util')) return "#EAB308";
    if (lowerName.includes('health')) return "#EC4899";
    if (lowerName.includes('entertainment')) return "#A855F7";
    
    // Default - cycle through colors
    return colors[index % colors.length];
  };

  if (budgetCategories.length === 0) {
    return (
      <div className="text-center py-6 animate-fade-in">
        <p className="text-muted-foreground">No budget categories yet</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {budgetCategories.map((category, index) => (
        <BudgetCategory
          key={category.id}
          id={category.id}
          name={category.name}
          spent={category.spent}
          budget={category.allocated}
          icon={getCategoryIcon(category.name)}
          color={getCategoryColor(category.name, index)}
          currency={localCurrency}
          onLongPressStart={onLongPressStart}
          onLongPressEnd={onLongPressEnd}
        />
      ))}
    </motion.div>
  );
}
