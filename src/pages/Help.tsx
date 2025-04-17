
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, PiggyBank, Wallet, BarChart3, Settings, LifeBuoy } from "lucide-react";

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
        className="max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Help & Documentation</h1>
            <p className="text-muted-foreground">
              Everything you need to know about how to use Savings Savvy
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
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-white/90">
                    Quick Start Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <LifeBuoy className="h-24 w-24 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mb-10">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and answers about Savings Savvy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I add a new transaction?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You can add a new transaction by clicking the "Add Transaction" button on the Dashboard.
                      Fill in the transaction details including name, amount, type (income or expense),
                      category, and date. Click "Add Transaction" to save it.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I set up a savings goal?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Navigate to the Savings page from the main navigation menu. Click "Add New Goal"
                      and provide a name, target amount, and deadline. You can update your progress
                      towards the goal by adding contributions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Where is my data stored?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Savings Savvy is an offline application that stores all your data locally on your device.
                      Your financial information never leaves your device and is stored in your browser's local storage.
                      This ensures privacy but means your data won't sync across multiple devices.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I switch between light and dark mode?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You can easily switch between light and dark mode by clicking the theme toggle button
                      in the bottom-right corner of the screen. The theme setting is saved automatically.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I clear my data?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If you need to clear all your data, go to the Profile page and scroll down to the "Danger Zone" section.
                      Click the "Clear All Data" button. This action cannot be undone, so please be careful.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4">
            <div className="bg-finance-primary/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-finance-primary" />
            </div>
            <div>
              <h3 className="font-medium">Transactions</h3>
              <p className="text-sm text-muted-foreground">Track income and expenses</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4">
            <div className="bg-finance-expense/10 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-finance-expense" />
            </div>
            <div>
              <h3 className="font-medium">Budget</h3>
              <p className="text-sm text-muted-foreground">Set and manage spending limits</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4">
            <div className="bg-finance-savings/10 p-3 rounded-full">
              <PiggyBank className="h-6 w-6 text-finance-savings" />
            </div>
            <div>
              <h3 className="font-medium">Savings</h3>
              <p className="text-sm text-muted-foreground">Track progress toward goals</p>
            </div>
          </div>
          
          <div className="card-gradient p-6 rounded-xl flex items-center space-x-4">
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
          <h2 className="text-lg font-medium mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our comprehensive user guide for detailed instructions on using Savings Savvy.
          </p>
          <Button className="btn-hover-effect">
            <Settings className="mr-2 h-4 w-4" />
            View User Guide
          </Button>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
