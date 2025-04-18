
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  DollarSign,
  Wallet,
  PiggyBank,
  Settings,
  User,
  BrainCircuit,
  LifeBuoy,
  Star,
  Mail,
  Phone,
  Github
} from "lucide-react";

export default function Help() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Learn how to use Savings Savvy and get help when you need it
          </p>
        </div>

        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="guide">User Guide</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-3 w-full card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    User Manual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                      <p className="mb-3">
                        Welcome to Savings Savvy! This user manual will help you make the most of your
                        personal finance management app. Here's how to navigate the different sections:
                      </p>
                      <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                        <li>
                          <strong>Dashboard</strong>: Your financial overview with income, expenses, 
                          budget progress, and savings goals.
                        </li>
                        <li>
                          <strong>Transactions</strong>: Add and manage your income and expenses.
                        </li>
                        <li>
                          <strong>Budget</strong>: Set and monitor spending limits for different categories.
                        </li>
                        <li>
                          <strong>Savings</strong>: Create and track goals for your future purchases.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Dashboard Features</h3>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="dashboard-overview">
                          <AccordionTrigger>Overview Cards</AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-2">
                              The overview cards provide a quick glance at your financial health, including:
                            </p>
                            <ul className="space-y-1 list-disc pl-6 text-muted-foreground">
                              <li>Total income for the current period</li>
                              <li>Total expenses and percentage of income</li>
                              <li>Your savings amount and percentage of income</li>
                              <li>The current balance across all accounts</li>
                            </ul>
                            <p className="mt-2">
                              <strong>Tip:</strong> Double-tap or long-press on these cards to edit your financial data directly.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="transactions">
                          <AccordionTrigger>Recent Transactions</AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-2">
                              View your most recent financial activities, with color-coding for income and expenses.
                            </p>
                            <p>
                              <strong>Tip:</strong> Double-tap on any transaction to edit details like amount, category, or date.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="budget-progress">
                          <AccordionTrigger>Budget Progress</AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-2">
                              See how your spending compares to your budget across different categories.
                            </p>
                            <p>
                              <strong>Tip:</strong> Long-press on budget items to quickly adjust your budget allocations.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="savings-goals">
                          <AccordionTrigger>Savings Goals</AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-2">
                              Track progress toward your financial goals like vacations, new car, or home down payment.
                            </p>
                            <p>
                              <strong>Tip:</strong> If you don't have any goals yet, you'll see a button to easily add your first one.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">AI Financial Assistant</h3>
                      <p className="mb-3">
                        Savings Savvy includes an AI assistant to help manage your finances:
                      </p>
                      <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                        <li>
                          <strong>Getting advice</strong>: Ask questions about your spending, budgets, or saving strategies.
                        </li>
                        <li>
                          <strong>Changing language</strong>: Use the language selector to get responses in your preferred language.
                        </li>
                        <li>
                          <strong>Customizing the AI</strong>: In Settings, you can provide your own API endpoint, model, and key.
                        </li>
                      </ul>
                      <p className="mt-2">
                        <strong>Note:</strong> The AI can only access data that's already in your Savings Savvy account.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Mobile Tips</h3>
                      <p className="mb-2">
                        Savings Savvy is fully optimized for mobile use:
                      </p>
                      <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                        <li>Double-tap on items to edit them directly</li>
                        <li>Long-press (tap and hold for 2 seconds) to see additional options</li>
                        <li>Use the mobile-friendly filters on the Transactions page</li>
                        <li>The AI assistant adapts to your screen size automatically</li>
                      </ul>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card className="w-full card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes. Savings Savvy stores all your data locally on your device. We don't send or store your financial information on any servers. All data is kept in your browser's localStorage, so it's only accessible from your device.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Can I export my data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can export your transaction history, budget plans, and savings goals. Go to the relevant page (Transactions, Budget, or Savings) and look for the "Export" button. This will download your data as a CSV or JSON file.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>How do I edit a transaction?</AccordionTrigger>
                    <AccordionContent>
                      Double-tap on any transaction in the transactions list or recent transactions widget to open the edit dialog. From there, you can modify any details of the transaction.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-4">
                    <AccordionTrigger>Can I change the AI assistant's language?</AccordionTrigger>
                    <AccordionContent>
                      Yes, click the language icon (globe) in the AI assistant panel to select from a variety of languages. The AI will respond in your chosen language for all future conversations.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-5">
                    <AccordionTrigger>Is an internet connection required?</AccordionTrigger>
                    <AccordionContent>
                      Savings Savvy works offline for most features, as your data is stored locally. However, the AI assistant requires an internet connection to process your questions and provide answers.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-6">
                    <AccordionTrigger>How do I set up my own AI model?</AccordionTrigger>
                    <AccordionContent>
                      In Settings, you can configure your own AI endpoint, model name, and API key. This allows you to use various AI services like OpenAI, Groq, Anthropic, or any other compatible API.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card className="w-full card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p>
                    If you're experiencing issues or have questions that aren't covered in our user guide
                    or FAQs, please reach out to our support team:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Mail className="h-5 w-5 text-finance-primary" />
                          <h3 className="font-medium">Email Support</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          For general inquiries and support requests:
                        </p>
                        <p className="font-medium">support@savingssavvy.example</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Github className="h-5 w-5 text-finance-primary" />
                          <h3 className="font-medium">GitHub</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          For bugs and feature requests:
                        </p>
                        <p className="font-medium">github.com/savingssavvy/app</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    Our support team is available Monday through Friday, 9 AM to 5 PM Eastern Time.
                    We typically respond to all inquiries within 24-48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
