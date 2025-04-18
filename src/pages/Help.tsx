
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchIcon,
  HelpCircle,
  FileText,
  MessageSquare,
  MailIcon,
  BookOpen,
  Video,
  Receipt,
  PiggyBank,
  DollarSign,
  BarChart,
  CreditCard,
  Settings,
  Wallet,
  Users,
  Zap
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Common animation properties
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
  
  // FAQ items
  const faqItems = [
    {
      question: "How do I add a new transaction?",
      answer: "You can add a new transaction from the Dashboard or Transactions page by clicking the 'Add Transaction' button. Fill in the transaction details including name, amount, category, date, and type (income or expense)."
    },
    {
      question: "How do I create a budget category?",
      answer: "Navigate to the Budget page and click on 'Add Category'. Enter a name for your category, the allocated amount, and select a color. Your new budget category will appear in the budget breakdown."
    },
    {
      question: "Can I edit my income or expense totals?",
      answer: "Yes! On the Dashboard, press and hold (for about 4-5 seconds) on any of the overview cards (Income, Expenses, Savings). This will open an edit dialog where you can adjust the values."
    },
    {
      question: "How do I create a savings goal?",
      answer: "Visit the Savings page and click 'New Goal'. Enter your goal details including name, target amount, current savings, contribution frequency, and target date. Your new goal will appear in your savings dashboard."
    },
    {
      question: "How can I track my spending by category?",
      answer: "Your spending by category is automatically visualized in the Expense Breakdown chart on the Dashboard. As you add transactions, the chart will update to reflect your spending patterns."
    },
    {
      question: "Can I edit or delete a transaction?",
      answer: "Yes, on the Transactions page, find the transaction you want to modify. Click the three dots menu on the right side, then select 'Edit' or 'Delete' as needed."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to the Profile page from the sidebar menu. There you can update your personal details including name, email, and monthly income/expense goals."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, your financial data is stored locally on your device and is not shared with any third parties. We use secure storage mechanisms to protect your information."
    },
    {
      question: "Can I export my financial data?",
      answer: "This feature is coming soon! We're working on implementing data export functionality so you can download your transaction history and financial reports."
    },
    {
      question: "How do I get help if I have more questions?",
      answer: "You can use the AI Assistant by clicking the AI button at the bottom right of any page. Our AI can answer questions, provide guidance, and help you use the app effectively."
    }
  ];
  
  // Filter FAQ items based on search
  const filteredFaqItems = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  // Help categories
  const helpCategories = [
    { 
      title: "Getting Started", 
      icon: <BookOpen className="h-5 w-5" />,
      topics: ["App Overview", "First Steps", "Setting Up Your Profile"]
    },
    { 
      title: "Transactions", 
      icon: <Receipt className="h-5 w-5" />,
      topics: ["Adding Transactions", "Editing Transactions", "Categorizing Expenses"]
    },
    { 
      title: "Budgeting", 
      icon: <Wallet className="h-5 w-5" />,
      topics: ["Creating a Budget", "Budget Categories", "Budget Tracking"]
    },
    { 
      title: "Savings", 
      icon: <PiggyBank className="h-5 w-5" />,
      topics: ["Setting Goals", "Goal Progress", "Automatic Saving"]
    },
    { 
      title: "Reports", 
      icon: <BarChart className="h-5 w-5" />,
      topics: ["Understanding Charts", "Income vs Expenses", "Spending Analysis"]
    },
    { 
      title: "AI Features", 
      icon: <Zap className="h-5 w-5" />,
      topics: ["AI Assistant", "Financial Insights", "Custom Guidance"]
    }
  ];

  return (
    <MainLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={item} className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to use all features
          </p>
        </motion.div>
        
        <motion.div variants={item} className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
        
        <Tabs defaultValue="faq" className="w-full">
          <motion.div variants={item}>
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="faq" className="px-6">FAQ</TabsTrigger>
              <TabsTrigger value="topics" className="px-6">Help Topics</TabsTrigger>
              <TabsTrigger value="tutorials" className="px-6">Tutorials</TabsTrigger>
              <TabsTrigger value="contact" className="px-6">Contact Us</TabsTrigger>
            </TabsList>
          </motion.div>
          
          <TabsContent value="faq" className="mt-0">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Quick answers to the most common questions about Savings Savvy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFaqItems.length === 0 ? (
                    <div className="text-center py-10">
                      <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or browse the categories below
                      </p>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            <motion.div variants={item}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {helpCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                          {category.icon}
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                              {topic}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" size="sm" className="mt-4 w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        View all topics
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="mt-0">
            <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Getting Started with Savings Savvy</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Learn how to set up your account, add your first transaction, and create budgets
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-4">5:32 mins</span>
                      <span>Beginner</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Creating and Managing Savings Goals</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      How to set up savings goals, track progress, and adjust contributions
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-4">4:18 mins</span>
                      <span>Intermediate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Effective Budgeting Strategies</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Learn different budgeting methods and how to implement them with our app
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-4">7:45 mins</span>
                      <span>Advanced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Using the AI Assistant</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      How to leverage AI for financial insights, automation, and personalized advice
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-4">6:12 mins</span>
                      <span>Intermediate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="contact" className="mt-0">
            <motion.div variants={item} className="grid gap-6 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Chat Support</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Chat with our AI assistant for immediate help with your questions
                  </p>
                  <Button className="w-full mt-auto">
                    Open AI Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <MailIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Send us an email and we'll get back to you within 24 hours
                  </p>
                  <Button variant="outline" className="w-full mt-auto">
                    support@savingssavvy.com
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Community</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Join our community forum to get advice from other users
                  </p>
                  <Button variant="outline" className="w-full mt-auto">
                    Visit Forum
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div variants={item} className="mt-12">
          <div className="bg-muted rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-medium mb-2">Still need help?</h3>
              <p className="text-muted-foreground max-w-md">
                Our AI assistant is available 24/7 to answer your questions and provide personalized guidance.
              </p>
            </div>
            <Button size="lg" className="px-8">
              <Zap className="mr-2 h-5 w-5" />
              Ask AI Assistant
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
