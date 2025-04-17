
import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';

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
  const [apiKey, setApiKey] = useState<string>(() => {
    const storedKey = localStorage.getItem(`ai_api_key_${deviceId}`);
    return storedKey || '';
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
              content: "You are a helpful financial assistant that provides advice based on transaction history, budgets, and savings goals. Be concise, practical, and focus on helping users manage their finances better."
            },
            {
              role: "user",
              content: `Here is my financial data: ${JSON.stringify(financialData)}. ${question}`
            }
          ],
          temperature: 0.5,
          max_tokens: 500,
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
