
import { MainLayout } from "@/components/layout/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare,
  FileQuestion,
  DollarSign,
  BarChart3,
  PiggyBank,
  Wallet,
  Settings,
  Users,
  Mail,
  Github,
  Twitter,
  Youtube,
  ExternalLink
} from "lucide-react";

export default function Help() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Get assistance with using the app and managing your finances
          </p>
        </div>

        <Tabs defaultValue="faq">
          <TabsList className="mb-6">
            <TabsTrigger value="faq">
              <FileQuestion className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides">
              <BookOpen className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Common questions and answers about using the app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I add a transaction?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">To add a new transaction:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Navigate to the Transactions page using the sidebar.</li>
                        <li>Click the "Add Transaction" button at the top of the page.</li>
                        <li>Fill in the transaction details in the form (date, amount, category, etc.).</li>
                        <li>Select whether it's an income or expense.</li>
                        <li>Click "Save Transaction" to add it to your records.</li>
                      </ol>
                      <p className="mt-3">You can also add transactions directly from the Dashboard by clicking the "Quick Add" button.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I create a savings goal?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Creating a savings goal is simple:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to the Savings page from the sidebar navigation.</li>
                        <li>Click the "New Goal" button at the top of the page.</li>
                        <li>Enter your goal details in the form, including:</li>
                        <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
                          <li>Goal name (e.g., "Vacation to Japan")</li>
                          <li>Target amount (how much you need to save)</li>
                          <li>Current amount (if you already have some saved)</li>
                          <li>Category (to help organize your goals)</li>
                          <li>Target date (when you need the money by)</li>
                        </ul>
                        <li>Click "Create Goal" to add it to your savings dashboard.</li>
                      </ol>
                      <p className="mt-3">To edit a goal, click on the Edit icon on the goal card. To add money to a goal, click directly on the goal card itself.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I track my budget?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">The Budget page provides comprehensive tools for tracking your spending:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Visit the Budget page from the main sidebar.</li>
                        <li>Create budget categories by clicking "Add Category" and setting limits for each spending area.</li>
                        <li>As you add transactions, they'll automatically count against your category budgets.</li>
                        <li>The progress bars show how much of each budget you've used.</li>
                        <li>Use the "Month" selector to view budgets for different time periods.</li>
                      </ol>
                      <p className="mt-3">The system will notify you when you're approaching or have exceeded your budget limits.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I change my currency?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">To change your display currency:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to the Settings page using the sidebar or clicking the gear icon.</li>
                        <li>Find the "Currency Settings" section.</li>
                        <li>Use the dropdown menu to select from available currencies.</li>
                        <li>Click "Save Changes" to apply your new currency setting.</li>
                      </ol>
                      <p className="mt-3">The app will automatically update all financial displays to use your selected currency. Note that this is a display change only and doesn't convert actual values.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Yes, your financial data is secure and private:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>All your data is stored locally on your device using your browser's storage.</li>
                        <li>No financial information is transmitted to our servers.</li>
                        <li>Your data remains accessible only to you on your device.</li>
                        <li>We recommend using the app on a secure device with up-to-date software.</li>
                        <li>For additional security, consider enabling password protection in the Settings.</li>
                      </ul>
                      <p className="mt-3">If you want to back up your data, use the export feature in Settings to save your information.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  User Guides
                </CardTitle>
                <CardDescription>
                  Learn how to use all features of the app effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Managing Your Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">Learn how to track your income and expenses effectively.</p>
                      <div className="space-y-2 mb-4">
                        <Badge variant="outline" className="mr-2">Transaction Types</Badge>
                        <Badge variant="outline" className="mr-2">Categories</Badge>
                        <Badge variant="outline">Reporting</Badge>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <p className="text-sm font-medium">Key Topics:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                          <li>Adding and editing transactions</li>
                          <li>Categorizing for better insights</li>
                          <li>Filtering and searching</li>
                          <li>Recurring transactions</li>
                        </ul>
                      </div>
                      
                      <div className="collapse-content mt-4 border-t pt-4">
                        <Button variant="outline" className="w-full" onClick={() => {
                          const content = document.getElementById('transactions-guide');
                          if (content) content.classList.toggle('hidden');
                        }}>
                          View Details
                        </Button>
                        
                        <div id="transactions-guide" className="hidden mt-4 text-sm">
                          <h4 className="font-medium mb-2">Detailed Guide to Transaction Management</h4>
                          
                          <h5 className="font-medium mt-3 mb-1">1. Adding Transactions</h5>
                          <p>The Transactions page is your central hub for recording all financial activity. To add a new transaction:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Click "Add Transaction" button</li>
                            <li>Select the transaction date (defaults to today)</li>
                            <li>Enter the transaction amount</li>
                            <li>Choose a category from the dropdown or create a new one</li>
                            <li>Add a description for future reference</li>
                            <li>Select whether it's an income or expense</li>
                            <li>Save the transaction</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">2. Categorizing Effectively</h5>
                          <p>Proper categorization helps you gain insights into your spending patterns:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Use consistent categories across transactions</li>
                            <li>Create subcategories for detailed tracking (e.g., Dining > Fast Food)</li>
                            <li>Regularly review uncategorized transactions</li>
                            <li>Consider creating categories that align with your budget</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">3. Transaction Analysis</h5>
                          <p>The app provides several ways to analyze your transaction data:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Use filters to view transactions by date range, category, or type</li>
                            <li>Check the Dashboard for visual breakdowns of your spending</li>
                            <li>Export data for detailed analysis in spreadsheet software</li>
                            <li>Review monthly summaries to track changes over time</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">4. Advanced Features</h5>
                          <p>Take advantage of these additional capabilities:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Bulk edit transactions with similar attributes</li>
                            <li>Set up transaction rules for automatic categorization</li>
                            <li>Schedule recurring transactions for regular bills</li>
                            <li>Use tags for cross-category organization</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PiggyBank className="h-5 w-5" />
                        Savings Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">Set up and track progress towards your financial goals.</p>
                      <div className="space-y-2 mb-4">
                        <Badge variant="outline" className="mr-2">Goal Setting</Badge>
                        <Badge variant="outline" className="mr-2">Progress Tracking</Badge>
                        <Badge variant="outline">Contributions</Badge>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <p className="text-sm font-medium">Key Topics:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                          <li>Creating specific, measurable goals</li>
                          <li>Setting target dates</li>
                          <li>Adding regular contributions</li>
                          <li>Visualizing your progress</li>
                        </ul>
                      </div>
                      
                      <div className="collapse-content mt-4 border-t pt-4">
                        <Button variant="outline" className="w-full" onClick={() => {
                          const content = document.getElementById('savings-guide');
                          if (content) content.classList.toggle('hidden');
                        }}>
                          View Details
                        </Button>
                        
                        <div id="savings-guide" className="hidden mt-4 text-sm">
                          <h4 className="font-medium mb-2">Comprehensive Savings Goal Guide</h4>
                          
                          <h5 className="font-medium mt-3 mb-1">1. Creating Effective Goals</h5>
                          <p>The key to successful saving is setting clear, achievable goals:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Be specific about what you're saving for (vacation, car, education)</li>
                            <li>Set a realistic target amount based on research</li>
                            <li>Choose appropriate deadlines that motivate without causing stress</li>
                            <li>Break large goals into smaller milestones</li>
                            <li>Use the right category to enable proper visualization</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">2. Making Regular Contributions</h5>
                          <p>Consistent contributions are essential for reaching your goals:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Click on a goal card to add a contribution</li>
                            <li>Set up automatic contribution reminders</li>
                            <li>Adjust contribution amounts as your financial situation changes</li>
                            <li>Track your contribution history within each goal</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">3. Monitoring Progress</h5>
                          <p>The app provides visual tools to track your savings journey:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Progress bars show percentage completion</li>
                            <li>Time-based projections help forecast completion dates</li>
                            <li>Use the Savings dashboard to compare progress across goals</li>
                            <li>Celebrate milestones to maintain motivation</li>
                          </ul>
                          
                          <h5 className="font-medium mt-3 mb-1">4. Managing Your Goals</h5>
                          <p>Keep your goals current and relevant:</p>
                          <ul className="list-disc pl-5 my-2 space-y-1">
                            <li>Click the edit button on any goal card to modify details</li>
                            <li>Reprioritize goals as circumstances change</li>
                            <li>Archive completed goals for future reference</li>
                            <li>Regularly review and adjust targets as needed</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Budget Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">Create and manage budgets to control your spending.</p>
                      <div className="space-y-2 mb-4">
                        <Badge variant="outline" className="mr-2">Budget Creation</Badge>
                        <Badge variant="outline" className="mr-2">Spending Limits</Badge>
                        <Badge variant="outline">Analysis</Badge>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <p className="text-sm font-medium">Key Topics:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                          <li>Setting category budgets</li>
                          <li>Tracking monthly spending</li>
                          <li>Analyzing budget performance</li>
                          <li>Adjusting budgets over time</li>
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        App Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">Customize the app to suit your preferences and needs.</p>
                      <div className="space-y-2 mb-4">
                        <Badge variant="outline" className="mr-2">Preferences</Badge>
                        <Badge variant="outline" className="mr-2">Currency</Badge>
                        <Badge variant="outline">Data Management</Badge>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <p className="text-sm font-medium">Key Topics:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                          <li>Setting display preferences</li>
                          <li>Changing currency options</li>
                          <li>Managing notification settings</li>
                          <li>Data backup and restore</li>
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Get in touch with our team for personalized assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Our support team is available to help with any questions or issues.</p>
                      <p className="text-sm text-muted-foreground mb-4">Average response time: 24 hours</p>
                      <Button className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Community Forum
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Connect with other users to share tips and solutions.</p>
                      <p className="text-sm text-muted-foreground mb-4">Join thousands of users helping each other.</p>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Forum
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Follow Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Stay updated with the latest news, updates, and tips.</p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="lg" className="flex-1">
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1">
                          <Youtube className="mr-2 h-4 w-4" />
                          YouTube
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
