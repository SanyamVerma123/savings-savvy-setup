import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { Plus, ArrowUpDown, Download, Upload, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Budget() {
  const { budgetCategories, addBudgetCategory, removeBudgetCategory, updateBudgetCategory } = useAppContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryAmount, setNewCategoryAmount] = useState<number>(0);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryAmount, setEditCategoryAmount] = useState<number>(0);
  
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleAddCategory = () => {
    if (!newCategoryName || newCategoryAmount <= 0) {
      toast.error("Please enter a valid category name and amount");
      return;
    }
    
    addBudgetCategory({
      name: newCategoryName,
      allocated: newCategoryAmount,
      spent: 0
    });
    
    toast.success("Budget category added successfully");
    setNewCategoryName("");
    setNewCategoryAmount(0);
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = () => {
    if (!selectedCategoryId) return;
    if (!editCategoryName || editCategoryAmount <= 0) {
      toast.error("Please enter a valid category name and amount");
      return;
    }
    
    const category = budgetCategories.find(cat => cat.id === selectedCategoryId);
    if (category) {
      const spentAmount = category.spent;
      
      removeBudgetCategory(selectedCategoryId);
      addBudgetCategory({
        name: editCategoryName,
        allocated: editCategoryAmount,
        spent: spentAmount
      });
      
      toast.success("Budget category updated successfully");
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteCategory = () => {
    if (!selectedCategoryId) return;
    
    removeBudgetCategory(selectedCategoryId);
    toast.success("Budget category deleted successfully");
    setIsDeleteDialogOpen(false);
  };

  const handleLongPressStart = (id: string) => {
    const timer = setTimeout(() => {
      const category = budgetCategories.find(cat => cat.id === id);
      if (category) {
        setSelectedCategoryId(id);
        setEditCategoryName(category.name);
        setEditCategoryAmount(category.allocated);
        setIsEditDialogOpen(true);
      }
    }, 800);
    
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Budget Category</DialogTitle>
                  <DialogDescription>
                    Add a new category to track your monthly spending
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input 
                      id="category-name" 
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g., Groceries, Rent, Entertainment"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allocated-amount">Monthly Budget</Label>
                    <Input 
                      id="allocated-amount" 
                      type="number"
                      value={newCategoryAmount || ''}
                      onChange={(e) => setNewCategoryAmount(parseFloat(e.target.value) || 0)}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>
                    Add Budget Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground">
            Manage your monthly budget categories and limits
          </p>
        </div>

        <Tabs defaultValue="current">
          <div className="flex justify-between items-center">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="current">Current Month</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>

          <TabsContent value="current" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 card-gradient w-full">
                <CardHeader>
                  <CardTitle>Current Budget</CardTitle>
                  <CardDescription>
                    Long-press on any category to edit or delete
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {budgetCategories.length === 0 ? (
                    <div className="text-center py-10">
                      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No budget categories</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't set up any budget categories yet
                      </p>
                      <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Budget
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full">
                      <BudgetProgress 
                        onLongPressStart={handleLongPressStart} 
                        onLongPressEnd={handleLongPressEnd}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="card-gradient h-fit w-full">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="total-card bg-finance-income/10 border-finance-income/20">
                      <span className="text-sm text-muted-foreground">Total Budget</span>
                      <span className="text-2xl font-bold">${totalBudget.toFixed(2)}</span>
                    </div>
                    
                    <div className="total-card bg-finance-expense/10 border-finance-expense/20">
                      <span className="text-sm text-muted-foreground">Total Spent</span>
                      <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
                    </div>
                    
                    <div className="total-card bg-finance-savings/10 border-finance-savings/20">
                      <span className="text-sm text-muted-foreground">Remaining</span>
                      <span className="text-2xl font-bold">${remaining.toFixed(2)}</span>
                    </div>

                    <Button className="w-full" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Budget Category
                    </Button>
                    
                    {budgetCategories.length > 0 && (
                      <Select 
                        onValueChange={(value) => {
                          const category = budgetCategories.find(cat => cat.id === value);
                          if (category) {
                            setSelectedCategoryId(value);
                            setEditCategoryName(category.name);
                            setEditCategoryAmount(category.allocated);
                            setIsEditDialogOpen(true);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <div className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            <span>Edit Budget</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {budgetCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name} (${category.allocated})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="mt-4">
            <Card className="card-gradient w-full">
              <CardHeader>
                <CardTitle>Budget Planning</CardTitle>
                <CardDescription>
                  Plan your budget for future months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Budget planning tools will be available here in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="card-gradient w-full">
              <CardHeader>
                <CardTitle>Budget History</CardTitle>
                <CardDescription>
                  View and analyze your past budgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Historical budget data will be available here in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name">Category Name</Label>
              <Input 
                id="edit-category-name" 
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-allocated-amount">Monthly Budget</Label>
              <Input 
                id="edit-allocated-amount" 
                type="number"
                value={editCategoryAmount || ''}
                onChange={(e) => setEditCategoryAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCategory}>
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Budget Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this budget category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
