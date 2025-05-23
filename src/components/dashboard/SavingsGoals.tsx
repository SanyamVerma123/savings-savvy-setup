import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plane, Car, Home, GraduationCap, Plus, 
  AlertCircle, Edit, Droplets
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SavingsGoalProps {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: React.ReactNode;
  deadline: string;
  color: string;
  onEdit: (id: string) => void;
  onAddContribution: (id: string) => void;
}

function SavingsGoalCard({
  id,
  name,
  currentAmount,
  targetAmount,
  icon,
  deadline,
  color,
  onEdit,
  onAddContribution
}: SavingsGoalProps) {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const formattedPercentage = percentage.toFixed(0);
  
  // Use button clicks instead of long press detection
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onEdit(id);
  };
  
  const handleCardClick = () => {
    onAddContribution(id);
  };

  return (
    <Card 
      className="overflow-hidden card-gradient border-t-4 cursor-pointer hover:shadow-md transition-shadow"
      style={{ borderTopColor: color }}
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color: color }}>
              {icon}
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={handleEditClick}
              title="Edit Goal"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">Due {deadline}</span>
          </div>
        </div>

        <div className="progress-bar mb-2">
          <div
            className="progress-value"
            style={{
              width: `${formattedPercentage}%`,
              backgroundColor: color
            }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">${currentAmount.toLocaleString()}</span>
            <span className="text-muted-foreground"> / ${targetAmount.toLocaleString()}</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">
            {formattedPercentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function SavingsGoals() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, removeSavingsGoal } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isContributionDialogOpen, setIsContributionDialogOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");
  
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    category: "Travel"
  });
  
  const [editGoal, setEditGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    category: "Travel"
  });

  const categories = [
    { name: "Travel", icon: <Plane className="h-5 w-5" /> },
    { name: "Car", icon: <Car className="h-5 w-5" /> },
    { name: "House", icon: <Home className="h-5 w-5" /> },
    { name: "Education", icon: <GraduationCap className="h-5 w-5" /> }
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
      category: "Travel"
    });
    setIsDialogOpen(false);
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
  
  const handleEditClick = (id: string) => {
    const goal = savingsGoals.find(g => g.id === id);
    if (!goal) return;
    
    setSelectedGoalId(id);
    setEditGoal({
      name: goal.name,
      target: goal.target.toString(),
      current: goal.current.toString(),
      deadline: goal.deadline,
      category: getCategoryFromName(goal.name)
    });
    
    setIsEditDialogOpen(true);
  };
  
  const handleContributionClick = (id: string) => {
    setSelectedGoalId(id);
    setContributionAmount("");
    setIsContributionDialogOpen(true);
  };

  const getGoalIcon = (goalName: string) => {
    const category = categories.find(cat => 
      goalName.toLowerCase().includes(cat.name.toLowerCase())
    );
    return category?.icon || <Home className="h-5 w-5" />;
  };
  
  const getCategoryFromName = (goalName: string) => {
    const category = categories.find(cat => 
      goalName.toLowerCase().includes(cat.name.toLowerCase())
    );
    return category?.name || "Travel";
  };

  return (
    <Card className="h-full card-gradient w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/savings">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {savingsGoals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg mb-2">No savings goals yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first savings goal to start tracking your progress
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover-effect">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
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
        ) : (
          <div className="grid gap-4">
            {savingsGoals.map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                id={goal.id}
                name={goal.name}
                currentAmount={goal.current}
                targetAmount={goal.target}
                icon={getGoalIcon(goal.name)}
                deadline={goal.deadline}
                color="#3B82F6"
                onEdit={handleEditClick}
                onAddContribution={handleContributionClick}
              />
            ))}

            <Button className="w-full" variant="outline" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Goal
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
        )}
      </CardContent>
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Savings Goal</DialogTitle>
            <DialogDescription>
              Update your savings goal details
            </DialogDescription>
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
    </Card>
  );
}
