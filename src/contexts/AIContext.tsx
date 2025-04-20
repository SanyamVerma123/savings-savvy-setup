
import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';
import { toast } from 'sonner';

interface AIContextType {
  isLoading: boolean;
  askAI: (question: string, customSystemPrompt?: string) => Promise<string>;
  setApiKey: (key: string) => void;
  setEndpointUrl: (url: string) => void;
  setModelName: (model: string) => void;
  hasApiKey: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: {code: string, name: string}[];
  endpointUrl: string;
  modelName: string;
  availableModels: {id: string, name: string}[];
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
  const { transactions, budgetCategories, savingsGoals, deviceId, currency } = useAppContext();
  // Use the provided API key as the default, but still allow user to change it if needed
  const [apiKey, setApiKey] = useState<string>(() => {
    const storedKey = localStorage.getItem(`ai_api_key_${deviceId}`);
    return storedKey || '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';
  });
  const [endpointUrl, setEndpointUrl] = useState<string>(() => {
    return localStorage.getItem(`ai_endpoint_${deviceId}`) || 'https://api.groq.com/openai/v1/chat/completions';
  });
  const [modelName, setModelName] = useState<string>(() => {
    return localStorage.getItem(`ai_model_${deviceId}`) || 'llama3-70b-8192';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem(`ai_language_${deviceId}`) || 'en';
  });

  const availableLanguages = [
    {code: 'en', name: 'English'},
    {code: 'es', name: 'Spanish'},
    {code: 'fr', name: 'French'},
    {code: 'de', name: 'German'},
    {code: 'it', name: 'Italian'},
    {code: 'pt', name: 'Portuguese'},
    {code: 'ru', name: 'Russian'},
    {code: 'zh', name: 'Chinese'},
    {code: 'ja', name: 'Japanese'},
    {code: 'ko', name: 'Korean'},
    {code: 'ar', name: 'Arabic'},
    {code: 'hi', name: 'Hindi'}
  ];

  const availableModels = [
    {id: 'llama3-70b-8192', name: 'Llama 3 70B (Groq)'},
    {id: 'llama3-8b-8192', name: 'Llama 3 8B (Groq)'},
    {id: 'gemma-7b-it', name: 'Gemma 7B (Groq)'},
    {id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B (Groq)'},
    {id: 'gpt-4o', name: 'GPT-4o (OpenAI)'},
    {id: 'gpt-4-turbo', name: 'GPT-4 Turbo (OpenAI)'},
    {id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (OpenAI)'},
    {id: 'claude-3-opus', name: 'Claude 3 Opus (Anthropic)'},
    {id: 'claude-3-sonnet', name: 'Claude 3 Sonnet (Anthropic)'},
    {id: 'claude-3-haiku', name: 'Claude 3 Haiku (Anthropic)'}
  ];

  const hasApiKey = Boolean(apiKey);

  // Save API key to localStorage whenever it changes
  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(`ai_api_key_${deviceId}`, key);
  };

  // Save endpoint URL to localStorage
  const saveEndpointUrl = (url: string) => {
    setEndpointUrl(url);
    localStorage.setItem(`ai_endpoint_${deviceId}`, url);
  };

  // Save model name to localStorage
  const saveModelName = (model: string) => {
    setModelName(model);
    localStorage.setItem(`ai_model_${deviceId}`, model);
  };

  // Save language to localStorage whenever it changes
  const saveLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem(`ai_language_${deviceId}`, lang);
  };

  const askAI = async (question: string, customSystemPrompt?: string): Promise<string> => {
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
        currentCurrency: currency,
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

      // Build the system prompt - use custom if provided, otherwise use default
      const systemPrompt = customSystemPrompt || 
        `You are a conversational financial assistant that provides personalized advice based on transaction history, budgets, and savings goals. 
        
        Be extremely concise and casual, as if you're texting a friend. Keep answers under 2-3 short sentences when possible. Only provide detailed analysis when specifically asked.
        
        You have access to the user's financial data, including transactions, budget categories, and savings goals. Use this information to provide targeted, practical advice.
        
        When appropriate, suggest specific actions like "Set up an alert for your dining budget" rather than long explanations.
        
        If you spot issues (like overspending), be direct: "You're over budget on dining by 15%. Try cooking at home this week."
        
        Use a friendly, conversational tone that feels like chatting with a helpful friend, not a formal advisor.
        
        Respond in the following language: ${language}. If you don't know this language, respond in English but mention you don't support that language yet.`;

      // Use the standard OpenAI-compatible API format regardless of the endpoint
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `Here is my financial data: ${JSON.stringify(financialData)}. ${question}`
            }
          ],
          temperature: 0.7,
          max_tokens: 300,
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
    <AIContext.Provider value={{ 
      isLoading, 
      askAI, 
      setApiKey: saveApiKey, 
      setEndpointUrl: saveEndpointUrl,
      setModelName: saveModelName,
      hasApiKey,
      language,
      setLanguage: saveLanguage,
      availableLanguages,
      endpointUrl,
      modelName,
      availableModels
    }}>
      {children}
    </AIContext.Provider>
  );
};
