import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
  deviceId: string;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  savingsGoal?: number;
  referralSource?: string;
}

interface TransactionType {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  description?: string;
}

interface SavingsGoalType {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

interface BudgetCategoryType {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  transactions: TransactionType[];
  addTransaction: (transaction: Omit<TransactionType, "id">) => void;
  updateTransaction: (id: string, updatedData: Partial<TransactionType>) => void;
  removeTransaction: (id: string) => void;
  savingsGoals: SavingsGoalType[];
  addSavingsGoal: (goal: Omit<SavingsGoalType, "id">) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  removeSavingsGoal: (id: string) => void;
  budgetCategories: BudgetCategoryType[];
  addBudgetCategory: (category: Omit<BudgetCategoryType, "id">) => void;
  updateBudgetCategory: (id: string, spent: number) => void;
  removeBudgetCategory: (id: string) => void;
  updateTotalValues: (type: string, value: number) => void;
  deviceId: string;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const defaultContext: AppContextType = {
  theme: 'light',
  setTheme: () => {},
  userData: null,
  setUserData: () => {},
  transactions: [],
  addTransaction: () => {},
  updateTransaction: () => {},
  removeTransaction: () => {},
  savingsGoals: [],
  addSavingsGoal: () => {},
  updateSavingsGoal: () => {},
  removeSavingsGoal: () => {},
  budgetCategories: [],
  addBudgetCategory: () => {},
  updateBudgetCategory: () => {},
  removeBudgetCategory: () => {},
  updateTotalValues: () => {},
  deviceId: '',
  hasCompletedOnboarding: false,
  setHasCompletedOnboarding: () => {},
  currency: localStorage.getItem('currency') || 'USD',
  setCurrency: () => {}
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoalType[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategoryType[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>(localStorage.getItem('currency') || 'USD');

  const handleSetCurrency = (newCurrency: string) => {
    try {
      localStorage.setItem('currency', newCurrency);
      setCurrency(newCurrency);
      console.log(`Currency updated to: ${newCurrency}`);
    } catch (error) {
      console.error("Error updating currency:", error);
      toast.error("Failed to update currency. Please try again.");
    }
  };

  useEffect(() => {
    const storedDeviceId = localStorage.getItem('deviceId');
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
    } else {
      const newDeviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('deviceId', newDeviceId);
      setDeviceId(newDeviceId);
    }
    
    const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
    setHasCompletedOnboarding(onboardingCompleted);
  }, []);

  useEffect(() => {
    const loadLocalData = () => {
      try {
        const storedUserData = localStorage.getItem(`userData_${deviceId}`);
        if (storedUserData) {
          setUserDataState(JSON.parse(storedUserData));
        }
        
        const storedTransactions = localStorage.getItem(`transactions_${deviceId}`);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
        
        const storedSavingsGoals = localStorage.getItem(`savingsGoals_${deviceId}`);
        if (storedSavingsGoals) {
          setSavingsGoals(JSON.parse(storedSavingsGoals));
        }
        
        const storedBudgetCategories = localStorage.getItem(`budgetCategories_${deviceId}`);
        if (storedBudgetCategories) {
          setBudgetCategories(JSON.parse(storedBudgetCategories));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };
    
    if (deviceId) {
      loadLocalData();
    }
  }, [deviceId]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setUserData = (data: UserData | null) => {
    setUserDataState(data);
    if (data) {
      localStorage.setItem(`userData_${deviceId}`, JSON.stringify(data));
    } else {
      localStorage.removeItem(`userData_${deviceId}`);
    }
  };

  const addTransaction = (transaction: Omit<TransactionType, "id">) => {
    const newTransaction = { 
      ...transaction, 
      id: `tx_${Date.now()}` 
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(updatedTransactions));
    
    if (transaction.type === 'expense') {
      const category = budgetCategories.find(
        cat => cat.name.toLowerCase() === transaction.category.toLowerCase()
      );
      
      if (category) {
        updateBudgetCategory(category.id, category.spent + transaction.amount);
      }
    }
  };

  const updateTransaction = (id: string, updatedData: Partial<TransactionType>) => {
    const oldTransaction = transactions.find(tx => tx.id === id);
    const updatedTransactions = transactions.map(tx => 
      tx.id === id ? { ...tx, ...updatedData } : tx
    );
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(updatedTransactions));
    
    if (oldTransaction && oldTransaction.type === 'expense') {
      if (updatedData.amount && updatedData.amount !== oldTransaction.amount) {
        const category = budgetCategories.find(
          cat => cat.name.toLowerCase() === oldTransaction.category.toLowerCase()
        );
        
        if (category) {
          const amountDifference = updatedData.amount - oldTransaction.amount;
          updateBudgetCategory(category.id, category.spent + amountDifference);
        }
      }
      
      if (updatedData.category && updatedData.category !== oldTransaction.category) {
        const oldCategory = budgetCategories.find(
          cat => cat.name.toLowerCase() === oldTransaction.category.toLowerCase()
        );
        
        const newCategory = budgetCategories.find(
          cat => cat.name.toLowerCase() === updatedData.category?.toLowerCase()
        );
        
        if (oldCategory) {
          updateBudgetCategory(oldCategory.id, oldCategory.spent - oldTransaction.amount);
        }
        
        if (newCategory) {
          const amount = updatedData.amount || oldTransaction.amount;
          updateBudgetCategory(newCategory.id, newCategory.spent + amount);
        }
      }
    }
  };

  const removeTransaction = (id: string) => {
    const transaction = transactions.find(tx => tx.id === id);
    const updatedTransactions = transactions.filter(tx => tx.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(updatedTransactions));
    
    if (transaction && transaction.type === 'expense') {
      const category = budgetCategories.find(
        cat => cat.name.toLowerCase() === transaction.category.toLowerCase()
      );
      
      if (category) {
        updateBudgetCategory(category.id, category.spent - transaction.amount);
      }
    }
  };

  const addSavingsGoal = (goal: Omit<SavingsGoalType, "id">) => {
    const newGoal = { 
      ...goal, 
      id: `goal_${Date.now()}` 
    };
    const updatedGoals = [...savingsGoals, newGoal];
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
    toast.success("Savings goal added successfully");
  };

  const updateSavingsGoal = (id: string, amount: number) => {
    const updatedGoals = savingsGoals.map(goal => 
      goal.id === id ? { ...goal, current: amount } : goal
    );
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
    toast.success("Savings goal updated successfully");
  };

  const removeSavingsGoal = (id: string) => {
    const updatedGoals = savingsGoals.filter(goal => goal.id !== id);
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
    toast.success("Savings goal removed successfully");
  };

  const addBudgetCategory = (category: Omit<BudgetCategoryType, "id">) => {
    const newCategory = { 
      ...category, 
      id: `cat_${Date.now()}` 
    };
    const updatedCategories = [...budgetCategories, newCategory];
    setBudgetCategories(updatedCategories);
    localStorage.setItem(`budgetCategories_${deviceId}`, JSON.stringify(updatedCategories));
    toast.success("Budget category added successfully");
  };

  const updateBudgetCategory = (id: string, spent: number) => {
    const updatedCategories = budgetCategories.map(cat => 
      cat.id === id ? { ...cat, spent } : cat
    );
    setBudgetCategories(updatedCategories);
    localStorage.setItem(`budgetCategories_${deviceId}`, JSON.stringify(updatedCategories));
  };

  const removeBudgetCategory = (id: string) => {
    const updatedCategories = budgetCategories.filter(cat => cat.id !== id);
    setBudgetCategories(updatedCategories);
    localStorage.setItem(`budgetCategories_${deviceId}`, JSON.stringify(updatedCategories));
    toast.success("Budget category removed successfully");
  };
  
  const updateTotalValues = (type: string, value: number) => {
    if (type === 'income') {
      const date = new Date().toISOString().split('T')[0];
      
      const filteredTransactions = transactions.filter(
        tx => !(tx.name === "Balance Adjustment" && tx.type === "income")
      );
      
      const currentIncome = filteredTransactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      if (value !== currentIncome) {
        const adjustmentAmount = value - currentIncome;
        
        if (adjustmentAmount !== 0) {
          const adjustmentTx = {
            name: "Balance Adjustment",
            category: "Income",
            amount: Math.abs(adjustmentAmount),
            date,
            type: "income" as const,
            id: `tx_adjustment_${Date.now()}`
          };
          
          const newTransactions = [...filteredTransactions, adjustmentTx];
          setTransactions(newTransactions);
          localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(newTransactions));
        } else {
          setTransactions(filteredTransactions);
          localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(filteredTransactions));
        }
      }
      
      if (userData) {
        setUserData({
          ...userData,
          monthlyIncome: value
        });
      }
    } else if (type === 'expenses') {
      const date = new Date().toISOString().split('T')[0];
      
      const filteredTransactions = transactions.filter(
        tx => !(tx.name === "Balance Adjustment" && tx.type === "expense")
      );
      
      const currentExpenses = filteredTransactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      if (value !== currentExpenses) {
        const adjustmentAmount = value - currentExpenses;
        
        if (adjustmentAmount !== 0) {
          const adjustmentTx = {
            name: "Balance Adjustment",
            category: "Miscellaneous",
            amount: Math.abs(adjustmentAmount),
            date,
            type: "expense" as const,
            id: `tx_adjustment_${Date.now()}`
          };
          
          const newTransactions = [...filteredTransactions, adjustmentTx];
          setTransactions(newTransactions);
          localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(newTransactions));
        } else {
          setTransactions(filteredTransactions);
          localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(filteredTransactions));
        }
      }
      
      if (userData) {
        setUserData({
          ...userData,
          monthlyExpenses: value
        });
      }
    } else if (type === 'savings') {
      if (userData) {
        setUserData({
          ...userData,
          savingsGoal: value
        });
      }
    }
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      userData,
      setUserData,
      transactions,
      addTransaction,
      updateTransaction,
      removeTransaction,
      savingsGoals,
      addSavingsGoal,
      updateSavingsGoal,
      removeSavingsGoal,
      budgetCategories,
      addBudgetCategory,
      updateBudgetCategory,
      removeBudgetCategory,
      updateTotalValues,
      deviceId,
      hasCompletedOnboarding,
      setHasCompletedOnboarding,
      currency,
      setCurrency: handleSetCurrency
    }}>
      {children}
    </AppContext.Provider>
  );
}
