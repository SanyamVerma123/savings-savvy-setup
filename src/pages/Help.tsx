
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Wallet, 
  PieChart, 
  BarChart, 
  Target, 
  BrainCircuit,
  Settings,
  Edit,
  Languages,
  Key
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Help() {
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
            <h1 className="text-3xl font-bold tracking-tight">Help & User Manual</h1>
          </div>
          <p className="text-muted-foreground">
            Learn how to use Savings Savvy to manage your finances effectively
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full">
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Getting Started
              </CardTitle>
              <CardDescription>
                Basic information about the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Welcome to Savings Savvy</h3>
                <p>
                  Savings Savvy is a comprehensive financial management application designed to help
                  you track your income, expenses, and savings goals. This user manual will guide you
                  through the features and functionalities of the app.
                </p>
                
                <h4 className="text-lg font-medium mt-6">Key Features</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track income and expenses</li>
                  <li>Create and manage budgets</li>
                  <li>Set and monitor savings goals</li>
                  <li>Get AI-powered financial insights</li>
                  <li>View detailed financial analytics</li>
                  <li>Edit transactions directly from the dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Accordion type="single" collapsible className="w-full mb-6">
            <AccordionItem value="dashboard">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The Dashboard is your financial command center, providing an overview of your financial
                    health at a glance.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Overview Cards:</strong> Quick summary of income, expenses, and savings</li>
                    <li><strong>Income vs. Expense Chart:</strong> Monthly comparison of money in vs. out</li>
                    <li><strong>Expense Breakdown:</strong> Visual representation of spending by category</li>
                    <li><strong>Budget Progress:</strong> Track spending against your budget</li>
                    <li><strong>Recent Transactions:</strong> Latest financial activity</li>
                    <li><strong>Savings Goals:</strong> Progress toward your financial targets</li>
                  </ul>
                  
                  <h4 className="font-medium">Double-Tap to Edit:</h4>
                  <p>
                    Double-tap or double-click on any transaction to edit its details directly from the dashboard.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="transactions">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span>Transactions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The Transactions page allows you to view, add, edit, and manage all your financial transactions.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Add Transactions:</strong> Record new income or expenses</li>
                    <li><strong>Filter & Sort:</strong> Organize transactions by date, amount, or type</li>
                    <li><strong>Search:</strong> Quickly find specific transactions</li>
                    <li><strong>Edit & Delete:</strong> Modify or remove existing entries</li>
                    <li><strong>Categories:</strong> Assign transactions to specific expense categories</li>
                  </ul>
                  
                  <h4 className="font-medium">Double-Tap to Edit:</h4>
                  <p>
                    Double-tap or double-click on any transaction to edit its details directly from the list.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="budget">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  <span>Budget</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The Budget page helps you set spending limits for different categories and track your progress.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Category Budgets:</strong> Set monthly spending limits by category</li>
                    <li><strong>Progress Tracking:</strong> Visual indicators of budget usage</li>
                    <li><strong>Alerts:</strong> Warnings when nearing or exceeding budget limits</li>
                    <li><strong>Budget Adjustment:</strong> Modify budget allocations as needed</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="savings">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <span>Savings Goals</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The Savings Goals page allows you to set financial targets and track your progress toward achieving them.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Goal Setting:</strong> Create new savings objectives with target amounts</li>
                    <li><strong>Progress Tracking:</strong> Visual representation of your savings journey</li>
                    <li><strong>Timelines:</strong> Set and monitor deadlines for your financial goals</li>
                    <li><strong>Contribution History:</strong> See all contributions to each goal</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ai-assistant">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5" />
                  <span>AI Financial Assistant</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The AI Financial Assistant provides personalized financial advice and insights based on your data.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Financial Analysis:</strong> Get insights on spending patterns and saving opportunities</li>
                    <li><strong>Budget Recommendations:</strong> Receive suggestions for budget adjustments</li>
                    <li><strong>Savings Advice:</strong> Tips on how to reach your savings goals faster</li>
                    <li><strong>Multilingual Support:</strong> Get advice in multiple languages</li>
                    <li><strong>Proactive Alerts:</strong> Notifications about potential financial issues</li>
                  </ul>
                  
                  <h4 className="font-medium">Changing Language:</h4>
                  <p>
                    Click the language icon in the AI Assistant to change the language. The assistant will respond
                    in your selected language.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="settings">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <p>
                    The Settings page allows you to customize the app according to your preferences.
                  </p>
                  
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Theme Toggle:</strong> Switch between light and dark mode</li>
                    <li><strong>Language Settings:</strong> Change the AI assistant language</li>
                    <li><strong>Notification Preferences:</strong> Control app notifications</li>
                    <li><strong>API Keys:</strong> Manage connections to AI services</li>
                    <li><strong>Account Management:</strong> Update profile and sign out</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="special-features">
              <AccordionTrigger className="px-4 py-2 bg-card rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  <span>Special Features</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
                <div className="space-y-4">
                  <h4 className="font-medium">Double-Tap to Edit:</h4>
                  <p>
                    Double-tap or double-click on any transaction to edit its details directly from any page
                    where transactions are displayed.
                  </p>
                  
                  <h4 className="font-medium">Multilingual AI Assistant:</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="h-5 w-5" />
                    <p>
                      Change the language of the AI assistant to get financial advice in your preferred language.
                    </p>
                  </div>
                  
                  <h4 className="font-medium">Multiple AI Services:</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-5 w-5" />
                    <p>
                      Configure different AI providers through the API Keys section in Settings.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Card className="card-gradient mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                FAQs & Support
              </CardTitle>
              <CardDescription>
                Frequently asked questions and how to get help
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>How do I add a transaction?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Add Transaction" button on the dashboard or transactions page. 
                    Fill in the transaction details (amount, date, category, type) and click Save.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-2">
                  <AccordionTrigger>How do I edit a transaction?</AccordionTrigger>
                  <AccordionContent>
                    Double-tap or double-click on any transaction in the list or dashboard to open the
                    edit dialog. Make your changes and click Save.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger>How do I change the AI assistant's language?</AccordionTrigger>
                  <AccordionContent>
                    Click the language icon in the AI assistant dialog or go to Settings and select your
                    preferred language from the dropdown menu.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, your data is stored locally on your device. API keys for AI services are also
                    stored locally and never sent to our servers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-5">
                  <AccordionTrigger>How do I set up an API key for the AI assistant?</AccordionTrigger>
                  <AccordionContent>
                    Go to Settings, select the API Keys tab, and enter your API key (Groq, OpenAI, etc.)
                    in the appropriate field. Click Save to store the key locally.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
