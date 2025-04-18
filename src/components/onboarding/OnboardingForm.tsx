
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, User, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: "welcome",
    title: "Welcome to Savings Savvy",
    description: "Let's get to know you better to help you manage your finances effectively."
  },
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us your name so we can personalize your experience."
  },
  {
    id: "financial",
    title: "Financial Overview",
    description: "Enter your monthly income and expenses to get started."
  },
  {
    id: "referral",
    title: "How did you find us?",
    description: "We're curious to know how you discovered Savings Savvy."
  },
  {
    id: "complete",
    title: "All Set!",
    description: "Your financial journey begins now."
  }
];

interface FormDataType {
  name: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  savingsGoal: string;
  referralSource: string;
}

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    savingsGoal: "",
    referralSource: ""
  });
  
  const { userData, setUserData, setHasCompletedOnboarding } = useAppContext();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    // Save the user's data
    const email = userData?.email || "guest@example.com";
    const deviceId = userData?.deviceId || "";
    
    setUserData({
      ...(userData || { email, deviceId }),
      name: formData.name,
      monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
      monthlyExpenses: parseFloat(formData.monthlyExpenses) || 0,
      savingsGoal: parseFloat(formData.savingsGoal) || 0,
      referralSource: formData.referralSource
    });
    
    // Mark onboarding as completed
    localStorage.setItem('onboardingCompleted', 'true');
    setHasCompletedOnboarding(true);
    
    // Navigate to dashboard
    navigate('/');
  };

  // Validate if the current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 0: // Welcome
        return true;
      case 1: // Personal
        return formData.name.trim().length > 0;
      case 2: // Financial
        return (
          parseFloat(formData.monthlyIncome) > 0 &&
          parseFloat(formData.monthlyExpenses) >= 0 &&
          parseFloat(formData.savingsGoal) >= 0
        );
      case 3: // Referral
        return formData.referralSource.trim().length > 0;
      case 4: // Complete
        return true;
      default:
        return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6">
                Savings Savvy helps you track expenses, manage budgets, and achieve your financial goals.
                Let's get you set up with a personalized experience.
              </p>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g., John Smith"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Monthly Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthly-income"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    className="pl-10"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthly-expenses"
                    type="number"
                    placeholder="e.g., 3500"
                    value={formData.monthlyExpenses}
                    onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                    className="pl-10"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="savings-goal">Monthly Savings Goal</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="savings-goal"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.savingsGoal}
                    onChange={(e) => handleInputChange("savingsGoal", e.target.value)}
                    className="pl-10"
                    min="0"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-12 w-12 text-primary" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referral-source">How did you hear about us?</Label>
                <Select 
                  value={formData.referralSource}
                  onValueChange={(value) => handleInputChange("referralSource", value)}
                >
                  <SelectTrigger id="referral-source">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="friend">Friend or Family</SelectItem>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                >
                  <Users className="h-12 w-12 text-green-600 dark:text-green-400" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">You're all set, {formData.name}!</h3>
              <p className="text-muted-foreground mb-6">
                Thanks for sharing your information. Your financial journey with Savings Savvy begins now.
              </p>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {currentStep === 0 && <div></div>}
            <Button 
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`${!isStepComplete() ? "opacity-50" : "animate-pulse"}`}
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    currentStep >= index ? "bg-primary" : "bg-primary/30"
                  }`}
                  animate={{
                    scale: currentStep === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: currentStep === index ? Infinity : 0, repeatDelay: 1 }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
