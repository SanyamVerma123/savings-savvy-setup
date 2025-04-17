import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  deviceId: string;
}

interface TransactionType {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
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
  deviceId: string;
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
  deviceId: ''
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoalType[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategoryType[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const storedDeviceId = localStorage.getItem('deviceId');
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
    } else {
      const newDeviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('deviceId', newDeviceId);
      setDeviceId(newDeviceId);
    }
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
  };

  const updateTransaction = (id: string, updatedData: Partial<TransactionType>) => {
    const updatedTransactions = transactions.map(tx => 
      tx.id === id ? { ...tx, ...updatedData } : tx
    );
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(updatedTransactions));
  };

  const removeTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(tx => tx.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${deviceId}`, JSON.stringify(updatedTransactions));
  };

  const addSavingsGoal = (goal: Omit<SavingsGoalType, "id">) => {
    const newGoal = { 
      ...goal, 
      id: `goal_${Date.now()}` 
    };
    const updatedGoals = [...savingsGoals, newGoal];
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
  };

  const updateSavingsGoal = (id: string, amount: number) => {
    const updatedGoals = savingsGoals.map(goal => 
      goal.id === id ? { ...goal, current: amount } : goal
    );
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
  };

  const removeSavingsGoal = (id: string) => {
    const updatedGoals = savingsGoals.filter(goal => goal.id !== id);
    setSavingsGoals(updatedGoals);
    localStorage.setItem(`savingsGoals_${deviceId}`, JSON.stringify(updatedGoals));
  };

  const addBudgetCategory = (category: Omit<BudgetCategoryType, "id">) => {
    const newCategory = { 
      ...category, 
      id: `cat_${Date.now()}` 
    };
    const updatedCategories = [...budgetCategories, newCategory];
    setBudgetCategories(updatedCategories);
    localStorage.setItem(`budgetCategories_${deviceId}`, JSON.stringify(updatedCategories));
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
      deviceId
    }}>
      {children}
    </AppContext.Provider>
  );
};
