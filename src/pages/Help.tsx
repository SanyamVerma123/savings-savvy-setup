
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  DollarSign, 
  PiggyBank, 
  Wallet, 
  BarChart3, 
  Settings, 
  LifeBuoy, 
  ChevronRight,
  Lightbulb,
  Info,
  HelpCircle,
  ThumbsUp,
  User,
  Moon,
  Sun
} from "lucide-react";

export default function Help() {
  const [activeTab, setActiveTab] = useState("faq");

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
        className="max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 text-gradient-primary">Help & Documentation</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about how to use Savings Savvy, the personal finance
              app that helps you track expenses and reach your savings goals.
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-10">
          <Card className="bg-gradient-to-r from-blue-500 to-teal-400 text-white dark:from-blue-600 dark:to-teal-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
                  <p className="mb-4">
                    New to Savings Savvy? Start by adding your first transaction and setting up your profile.
                    Your data is stored locally on your device for maximum privacy.
                  </p>
                  <Button 
                    className="bg-white text-blue-600 hover:bg-white/90 btn-hover-effect"
                    onClick={() => setActiveTab("guide")}
                  >
                    Quick Start Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <LifeBuoy className="h-24 w-24 text-white/80 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full max-w-md mx-auto">
              <TabsTrigger value="faq" className="text-sm">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="guide" className="text-sm">User Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-0">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-finance-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Common questions and answers about Savings Savvy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I add a new transaction?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          You can add a new transaction by clicking the "Add Transaction" button on the Dashboard
                          or Transactions page. Follow these steps:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Click the "Add Transaction" button</li>
                          <li>Enter a name for your transaction</li>
                          <li>Enter the amount (numbers only)</li>
                          <li>Select whether it's an income or expense</li>
                          <li>Choose or enter a category</li>
                          <li>Select the date of the transaction</li>
                          <li>Click "Add Transaction" to save</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I set up a savings goal?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          Navigate to the Savings page from the main navigation menu and follow these steps:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Click "Add New Goal" button</li>
                          <li>Enter a name for your goal (e.g., "New Car")</li>
                          <li>Enter the target amount you want to save</li>
                          <li>Set a deadline for achieving your goal</li>
                          <li>Start with your current progress (if any)</li>
                          <li>Click "Create Goal" to save</li>
                        </ol>
                        <p className="mt-2">
                          You can update your progress at any time by clicking on the goal and entering your new contribution.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Where is my data stored?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            Savings Savvy is an offline application that stores all your data locally on your device
                            using your browser's local storage. Your financial information never leaves your device,
                            ensuring complete privacy.
                          </p>
                          <p>
                            Each device has a unique identifier, so if you use Savings Savvy on multiple devices,
                            your data will be separate for each device. This is a privacy feature that prevents
                            unauthorized access to your financial data.
                          </p>
                          <p>
                            To clear your data, go to the Profile page and use the "Clear All Data" button in the
                            Danger Zone section.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I switch between light and dark mode?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            You can easily switch between light and dark mode by clicking the theme toggle button
                            in the bottom-right corner of the screen.
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <Sun className="h-5 w-5 text-amber-500" />
                              <span>Light Mode</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                            <div className="flex items-center gap-2">
                              <Moon className="h-5 w-5 text-blue-400" />
                              <span>Dark Mode</span>
                            </div>
                          </div>
                          <p className="mt-2">
                            Your theme preference is saved automatically and will be remembered
                            the next time you use the app.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How do I create a budget?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            To create a budget, navigate to the Budget page from the main navigation menu:
                          </p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Click the "Add Category" button</li>
                            <li>Enter a name for your budget category (e.g., "Groceries")</li>
                            <li>Enter the allocated amount for this category</li>
                            <li>Click "Add Category" to save</li>
                          </ol>
                          <p>
                            As you add transactions in the specified categories, your budget progress
                            will automatically update to show how much you've spent and how much remains.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Can I export my data?</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Currently, Savings Savvy does not have a built-in export feature. However,
                          since your data is stored locally, it remains private and secure on your device.
                          We're working on adding export capabilities in future updates.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-7">
                      <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            You can update your profile information by following these steps:
                          </p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Navigate to the Profile page from the main navigation menu</li>
                            <li>Update your name and email in the form</li>
                            <li>Click "Save Changes" to update your profile</li>
                          </ol>
                          <p>
                            Your profile information is stored locally on your device and is used
                            to personalize your experience within the app.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guide" className="mt-0 space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-finance-primary" />
                    Dashboard & Transactions
                  </CardTitle>
                  <CardDescription>Learn how to track your income and expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">1</span>
                      Adding Transactions
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Click the "Add Transaction" button on the Dashboard or Transactions page.
                      Fill in all required fields including name, amount, type, category, and date.
                      Your transaction will be added and reflected in your account overview.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">2</span>
                      Filtering Transactions
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      On the Transactions page, use the search bar to find specific transactions.
                      You can also filter by transaction type (income/expense) and category using the dropdown menus.
                      Sort transactions by date or amount in ascending or descending order.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">3</span>
                      Understanding the Dashboard
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      The Dashboard displays your financial overview with cards showing total income, expenses, and savings.
                      Charts visualize your spending patterns and income vs. expenses.
                      Recent transactions and budget progress are also displayed for quick reference.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-finance-expense" />
                    Budgeting & Savings
                  </CardTitle>
                  <CardDescription>Learn how to manage your budget and savings goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">1</span>
                      Creating Budget Categories
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Go to the Budget page and click "Add Category". Enter a name and the allocated monthly amount.
                      Your budget categories will automatically track spending as you add transactions.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">2</span>
                      Setting Savings Goals
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Visit the Savings page and click "Add New Goal". Set a name, target amount, and deadline.
                      Track your progress towards each goal and add contributions as you save more.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">3</span>
                      Monitoring Progress
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Check the Budget page to see how your spending compares to your allocated amounts.
                      The progress bars show how much of each budget category has been used.
                      Savings goals display your progress towards your target amount and time remaining.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-finance-savings" />
                    Account & Settings
                  </CardTitle>
                  <CardDescription>Learn how to manage your profile and app settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">1</span>
                      Updating Your Profile
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Go to the Profile page to update your name and email address.
                      Your profile information is used to personalize your experience in the app.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">2</span>
                      Changing Themes
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Toggle between light and dark mode using the button in the bottom-right corner of the screen.
                      Your preference is saved automatically for future sessions.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">3</span>
                      Managing Your Data
                    </h3>
                    <p className="text-muted-foreground ml-8">
                      Your data is stored locally on your device. Each device has a unique identifier (Device ID).
                      To clear all data, go to the Profile page and use the "Clear All Data" button in the Danger Zone section.
                      This action cannot be undone, so use it carefully.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4 hover-lift">
            <div className="bg-finance-primary/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-finance-primary" />
            </div>
            <div>
              <h3 className="font-medium">Transactions</h3>
              <p className="text-sm text-muted-foreground">Track income and expenses</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4 hover-lift">
            <div className="bg-finance-expense/10 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-finance-expense" />
            </div>
            <div>
              <h3 className="font-medium">Budget</h3>
              <p className="text-sm text-muted-foreground">Set and manage spending limits</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4 hover-lift">
            <div className="bg-finance-savings/10 p-3 rounded-full">
              <PiggyBank className="h-6 w-6 text-finance-savings" />
            </div>
            <div>
              <h3 className="font-medium">Savings</h3>
              <p className="text-sm text-muted-foreground">Track progress toward goals</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4 hover-lift">
            <div className="bg-finance-neutral/10 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-finance-neutral" />
            </div>
            <div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground">Visualize your financial data</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="text-center">
          <h2 className="text-lg font-medium mb-4 flex items-center justify-center gap-2">
            <ThumbsUp className="h-5 w-5 text-finance-primary" />
            Have more questions?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We're always improving Savings Savvy. Check back regularly for new features and updates
            to help you manage your finances more effectively.
          </p>
          <Button className="btn-hover-effect">
            <Info className="mr-2 h-4 w-4" />
            View More Tips & Tricks
          </Button>
        </motion.div>
        
        <motion.div variants={item} className="mt-12 bg-blue-50 dark:bg-gray-800/30 p-6 rounded-lg border border-blue-100 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Lightbulb className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Categorize your transactions consistently to get the most accurate insights from 
                the charts and reports. You can create custom categories that match your specific
                spending habits.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
