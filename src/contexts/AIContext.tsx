
import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';
import { toast } from 'sonner';

interface AIContextType {
  isLoading: boolean;
  askAI: (question: string) => Promise<string>;
  setApiKey: (key: string) => void;
  hasApiKey: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { transactions, budgetCategories, savingsGoals, deviceId } = useAppContext();
  // Use the provided API key as the default, but still allow user to change it if needed
  const [apiKey, setApiKey] = useState<string>(() => {
    const storedKey = localStorage.getItem(`ai_api_key_${deviceId}`);
    return storedKey || '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';
  });
  const [isLoading, setIsLoading] = useState(false);

  const hasApiKey = Boolean(apiKey);

  // Save API key to localStorage whenever it changes
  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(`ai_api_key_${deviceId}`, key);
  };

  const askAI = async (question: string): Promise<string> => {
    if (!apiKey) {
      return "Please provide your API key to use the AI assistant.";
    }

    setIsLoading(true);

    try {
      // Prepare context data about the user's finances
      const financialData = {
        transactions: transactions.slice(-20), // Send only recent transactions
        budgetCategories,
        savingsGoals,
        totalIncome: transactions
          .filter(tx => tx.type === 'income')
          .reduce((sum, tx) => sum + tx.amount, 0),
        totalExpenses: transactions
          .filter(tx => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0),
        // Add more contextual information for better AI assistance
        budgetStatus: budgetCategories.map(cat => ({
          category: cat.name,
          status: (cat.spent / cat.allocated) * 100 > 90 ? 'critical' : 
                 (cat.spent / cat.allocated) * 100 > 75 ? 'warning' : 'good',
          percentSpent: (cat.spent / cat.allocated) * 100
        })),
        savingsProgress: savingsGoals.map(goal => ({
          goal: goal.name,
          progressPercent: (goal.current / goal.target) * 100,
          remaining: goal.target - goal.current,
          onTrack: new Date(goal.deadline) > new Date() && 
                  (goal.current / goal.target) * 100 > 
                  (new Date().getTime() - new Date(goal.deadline).getTime()) / 
                  (new Date().getTime() - new Date(goal.deadline).getTime() + 7776000000) * 100
        }))
      };

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: `You are a proactive financial assistant that provides personalized advice based on transaction history, budgets, and savings goals. 
              
              Be specific and practical, focusing on helping users manage their finances better. Look for patterns, potential issues, and opportunities to save money or improve financial health.
              
              You have access to the user's financial data, including transactions, budget categories, and savings goals. Use this information to provide targeted advice.
              
              When appropriate, suggest notifications the user might want to set up (like budget alerts, payment reminders, or savings milestones).
              
              If you identify concerning patterns (like overspending in certain categories, missed savings opportunities, or potential cashflow issues), highlight them clearly and suggest actionable solutions.`
            },
            {
              role: "user",
              content: `Here is my financial data: ${JSON.stringify(financialData)}. ${question}`
            }
          ],
          temperature: 0.5,
          max_tokens: 800,
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error("AI API error:", data.error);
        return `Error: ${data.error.message || "Something went wrong with the AI service."}`;
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI Request failed:", error);
      return "Sorry, I couldn't process your request. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{ isLoading, askAI, setApiKey: saveApiKey, hasApiKey }}>
      {children}
    </AIContext.Provider>
  );
};
