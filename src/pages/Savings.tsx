
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  Car, 
  Home, 
  GraduationCap, 
  Gift, 
  Smartphone,
  Plus, 
  Calendar,
  Droplets,
  Edit,
  Trash2,
  AlertCircle,
  MoreVertical 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

function SavingsGoalCard({ goal, onEdit, onAddContribution, onDelete }: { 
  goal: any; 
  onEdit: (goalId: string) => void;
  onAddContribution: (goalId: string) => void;
  onDelete: (goalId: string) => void;
}) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isNearTarget = percentage >= 90 && percentage < 100;
  const isComplete = percentage >= 100;

  return (
    <Card className="card-gradient overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-full" 
              style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
            >
              {goal.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{goal.name}</h3>
              <span className="text-sm text-muted-foreground">{goal.category}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(goal.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Goal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddContribution(goal.id)}>
                <Droplets className="mr-2 h-4 w-4" />
                Add Contribution
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(goal.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Goal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">${goal.currentAmount.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">
                / ${goal.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${remaining.toLocaleString()} remaining
            </div>
          </div>
          <div>
            {isComplete ? (
              <span className="inline-flex items-center rounded-full bg-finance-success/20 px-2.5 py-1 text-xs font-medium text-finance-success">
                Completed
              </span>
            ) : isNearTarget ? (
              <span className="inline-flex items-center rounded-full bg-finance-warning/20 px-2.5 py-1 text-xs font-medium text-finance-warning">
                Almost there!
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                {percentage.toFixed(0)}% funded
              </span>
            )}
          </div>
        </div>

        <Progress 
          value={percentage} 
          className="h-2 mb-3"
          indicatorClassName={`bg-[${goal.color}]`}
        />

        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Droplets className="h-3.5 w-3.5 mr-1" />
            Contributing ${goal.contribution}/{goal.frequency}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Due {goal.deadline}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Savings() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, removeSavingsGoal } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isContributionDialogOpen, setIsContributionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");
  
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    category: "Travel",
    contribution: "100",
    frequency: "Monthly"
  });
  
  const [editGoal, setEditGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    category: "Travel",
    contribution: "100",
    frequency: "Monthly"
  });

  const frequencies = ["Weekly", "Bi-weekly", "Monthly", "Quarterly"];
  
  const categories = [
    { name: "Travel", icon: <Plane className="h-5 w-5" />, color: "#3B82F6" },
    { name: "Transportation", icon: <Car className="h-5 w-5" />, color: "#10B981" },
    { name: "Housing", icon: <Home className="h-5 w-5" />, color: "#8B5CF6" },
    { name: "Education", icon: <GraduationCap className="h-5 w-5" />, color: "#EC4899" },
    { name: "Personal", icon: <Gift className="h-5 w-5" />, color: "#F43F5E" },
    { name: "Electronics", icon: <Smartphone className="h-5 w-5" />, color: "#64748B" }
  ];

  const handleAddGoal = () => {
    if (!newGoal.name.trim()) {
      toast.error("Please enter a goal name");
      return;
    }
    
    if (!newGoal.target || isNaN(Number(newGoal.target)) || Number(newGoal.target) <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }
    
    if (!newGoal.deadline) {
      toast.error("Please select a deadline");
      return;
    }
    
    const goalToAdd = {
      name: newGoal.name.trim(),
      target: Number(newGoal.target),
      current: Number(newGoal.current) || 0,
      deadline: newGoal.deadline
    };
    
    addSavingsGoal(goalToAdd);
    
    setNewGoal({
      name: "",
      target: "",
      current: "",
      deadline: "",
      category: "Travel",
      contribution: "100",
      frequency: "Monthly"
    });
    setIsDialogOpen(false);
    
    toast.success("New savings goal created successfully!");
  };
  
  const handleEditGoal = () => {
    if (!selectedGoalId) return;
    
    const selectedGoal = savingsGoals.find(goal => goal.id === selectedGoalId);
    if (!selectedGoal) return;
    
    if (!editGoal.name.trim()) {
      toast.error("Please enter a goal name");
      return;
    }
    
    if (!editGoal.target || isNaN(Number(editGoal.target)) || Number(editGoal.target) <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }
    
    if (!editGoal.deadline) {
      toast.error("Please select a deadline");
      return;
    }
    
    // Create updated goal object
    const updatedGoal = {
      ...selectedGoal,
      name: editGoal.name.trim(),
      target: Number(editGoal.target),
      current: Number(editGoal.current) || 0,
      deadline: editGoal.deadline
    };
    
    // First remove the old goal
    removeSavingsGoal(selectedGoalId);
    
    // Then add the updated one
    addSavingsGoal(updatedGoal);
    
    setIsEditDialogOpen(false);
    setSelectedGoalId(null);
    toast.success("Goal updated successfully");
  };
  
  const handleAddContribution = () => {
    if (!selectedGoalId) return;
    
    const amount = Number(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid contribution amount");
      return;
    }
    
    const selectedGoal = savingsGoals.find(goal => goal.id === selectedGoalId);
    if (!selectedGoal) return;
    
    // Update the goal with the new contribution
    const newAmount = selectedGoal.current + amount;
    updateSavingsGoal(selectedGoalId, newAmount);
    
    setContributionAmount("");
    setIsContributionDialogOpen(false);
    setSelectedGoalId(null);
    
    toast.success(`Added $${amount} to ${selectedGoal.name}`);
  };
  
  const handleDeleteGoal = () => {
    if (!selectedGoalId) return;
    
    removeSavingsGoal(selectedGoalId);
    setIsDeleteDialogOpen(false);
    setSelectedGoalId(null);
    toast.success("Goal deleted successfully");
  };
  
  const handleEditClick = (goalId: string) => {
    const goal = savingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    setSelectedGoalId(goalId);
    setEditGoal({
      name: goal.name,
      target: goal.target.toString(),
      current: goal.current.toString(),
      deadline: goal.deadline,
      category: getCategoryFromName(goal.name),
      contribution: "100",
      frequency: "Monthly"
    });
    
    setIsEditDialogOpen(true);
  };
  
  const handleContributionClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setContributionAmount("");
    setIsContributionDialogOpen(true);
  };
  
  const handleDeleteClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setIsDeleteDialogOpen(true);
  };
  
  const getCategoryFromName = (goalName: string) => {
    const category = categories.find(cat => 
      goalName.toLowerCase().includes(cat.name.toLowerCase())
    );
    return category?.name || "Travel";
  };

  const processedGoals = savingsGoals.map(goal => {
    const category = categories.find(cat => 
      goal.name.toLowerCase().includes(cat.name.toLowerCase())
    ) || categories[0];
    
    return {
      id: goal.id,
      name: goal.name,
      currentAmount: goal.current,
      targetAmount: goal.target,
      deadline: goal.deadline,
      icon: category.icon,
      color: category.color,
      category: category.name,
      contribution: 100,
      frequency: "Monthly"
    };
  });

  const sampleGoals = [
    {
      id: "goal1",
      name: "Vacation to Japan",
      currentAmount: 2500,
      targetAmount: 5000,
      deadline: "December 15, 2023",
      icon: <Plane className="h-5 w-5" />,
      color: "#3B82F6",
      category: "Travel",
      contribution: 500,
      frequency: "Monthly"
    },
    {
      id: "goal2",
      name: "New Car",
      currentAmount: 7500,
      targetAmount: 30000,
      deadline: "June 30, 2024",
      icon: <Car className="h-5 w-5" />,
      color: "#10B981",
      category: "Transportation",
      contribution: 1000,
      frequency: "Monthly"
    }
  ];

  const displayGoals = processedGoals.length > 0 ? processedGoals : sampleGoals;
  
  const totalTargetAmount = displayGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = displayGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalMonthlyContribution = displayGoals.reduce((sum, goal) => {
    if (goal.frequency === "Monthly") {
      return sum + goal.contribution;
    }
    if (goal.frequency === "Weekly") {
      return sum + (goal.contribution * 4.33);
    }
    if (goal.frequency === "Bi-weekly") {
      return sum + (goal.contribution * 2.17);
    }
    if (goal.frequency === "Quarterly") {
      return sum + (goal.contribution / 3);
    }
    return sum;
  }, 0);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Savings Goal</DialogTitle>
                  <DialogDescription>
                    Create a new goal to help you save for something special
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input 
                      id="goal-name" 
                      placeholder="e.g., Japan Vacation" 
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal-target">Target Amount ($)</Label>
                      <Input 
                        id="goal-target" 
                        type="number" 
                        min="1"
                        placeholder="e.g., 5000" 
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-current">Current Amount ($)</Label>
                      <Input 
                        id="goal-current" 
                        type="number"
                        min="0" 
                        placeholder="e.g., 1000" 
                        value={newGoal.current}
                        onChange={(e) => setNewGoal({...newGoal, current: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select 
                      value={newGoal.category} 
                      onValueChange={(value) => setNewGoal({...newGoal, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.name} value={cat.name}>
                            <div className="flex items-center">
                              {cat.icon}
                              <span className="ml-2">{cat.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal-contribution">Contribution Amount ($)</Label>
                      <Input 
                        id="goal-contribution" 
                        type="number"
                        min="0" 
                        placeholder="e.g., 100" 
                        value={newGoal.contribution}
                        onChange={(e) => setNewGoal({...newGoal, contribution: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-frequency">Frequency</Label>
                      <Select 
                        value={newGoal.frequency} 
                        onValueChange={(value) => setNewGoal({...newGoal, frequency: value})}
                      >
                        <SelectTrigger id="goal-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencies.map((freq) => (
                            <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="goal-deadline">Target Date</Label>
                    <Input 
                      id="goal-deadline" 
                      type="date" 
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddGoal}>Create Goal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground">
            Track and manage your savings goals
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-gradient col-span-full md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Savings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="total-card bg-finance-primary/10 border-finance-primary/20">
                  <span className="text-sm text-muted-foreground">Total Savings Goals</span>
                  <span className="text-2xl font-bold">${totalTargetAmount.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground mt-1">Across {displayGoals.length} goals</span>
                </div>
                
                <div className="total-card bg-finance-success/10 border-finance-success/20">
                  <span className="text-sm text-muted-foreground">Current Progress</span>
                  <span className="text-2xl font-bold">${totalCurrentAmount.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {totalTargetAmount > 0 
                      ? `${((totalCurrentAmount / totalTargetAmount) * 100).toFixed(1)}% of total` 
                      : '0% of total'}
                  </span>
                </div>
                
                <div className="total-card bg-finance-warning/10 border-finance-warning/20">
                  <span className="text-sm text-muted-foreground">Monthly Contribution</span>
                  <span className="text-2xl font-bold">${Math.round(totalMonthlyContribution).toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground mt-1">Across all goals</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="col-span-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Goals</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Due</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Use the menu to edit or add contributions</span>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {displayGoals.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-xl mb-2">No savings goals yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Create your first savings goal to start tracking your progress toward financial milestones
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Goal
                  </Button>
                </motion.div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {displayGoals.map((goal) => (
                    <SavingsGoalCard 
                      key={goal.id} 
                      goal={goal} 
                      onEdit={handleEditClick}
                      onAddContribution={handleContributionClick}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              {displayGoals.filter((goal) => {
                const dueDate = new Date(goal.deadline);
                const now = new Date();
                const diffTime = dueDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 90 && goal.currentAmount < goal.targetAmount;
              }).length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">No upcoming goals</h3>
                  <p className="text-muted-foreground">
                    You don't have any goals due in the next 90 days
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {displayGoals
                    .filter((goal) => {
                      const dueDate = new Date(goal.deadline);
                      const now = new Date();
                      const diffTime = dueDate.getTime() - now.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 90 && goal.currentAmount < goal.targetAmount;
                    })
                    .map((goal) => (
                      <SavingsGoalCard 
                        key={goal.id} 
                        goal={goal} 
                        onEdit={handleEditClick}
                        onAddContribution={handleContributionClick}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {displayGoals.filter((goal) => goal.currentAmount >= goal.targetAmount).length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">No completed goals</h3>
                  <p className="text-muted-foreground">
                    You haven't completed any savings goals yet
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {displayGoals
                    .filter((goal) => goal.currentAmount >= goal.targetAmount)
                    .map((goal) => (
                      <SavingsGoalCard 
                        key={goal.id} 
                        goal={goal} 
                        onEdit={handleEditClick}
                        onAddContribution={handleContributionClick}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Savings Goal
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-name">Goal Name</Label>
              <Input 
                id="edit-goal-name" 
                value={editGoal.name}
                onChange={(e) => setEditGoal({...editGoal, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-goal-target">Target Amount ($)</Label>
                <Input 
                  id="edit-goal-target" 
                  type="number" 
                  min="1"
                  value={editGoal.target}
                  onChange={(e) => setEditGoal({...editGoal, target: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-goal-current">Current Amount ($)</Label>
                <Input 
                  id="edit-goal-current" 
                  type="number"
                  min="0"
                  value={editGoal.current}
                  onChange={(e) => setEditGoal({...editGoal, current: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-category">Category</Label>
              <Select 
                value={editGoal.category} 
                onValueChange={(value) => setEditGoal({...editGoal, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      <div className="flex items-center">
                        {cat.icon}
                        <span className="ml-2">{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-deadline">Target Date</Label>
              <Input 
                id="edit-goal-deadline" 
                type="date"
                value={editGoal.deadline}
                onChange={(e) => setEditGoal({...editGoal, deadline: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Contribution Dialog */}
      <Dialog open={isContributionDialogOpen} onOpenChange={setIsContributionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Add Contribution
            </DialogTitle>
            <DialogDescription>
              Add funds to your savings goal
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contribution-amount">Contribution Amount ($)</Label>
              <Input 
                id="contribution-amount" 
                type="number" 
                min="1"
                placeholder="e.g., 100" 
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContributionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddContribution}>Add Contribution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Savings Goal
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this savings goal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteGoal}>Delete Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
