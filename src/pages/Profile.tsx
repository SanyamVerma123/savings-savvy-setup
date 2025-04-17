
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save, Trash, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Profile() {
  const { userData, setUserData, deviceId } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUserData({
      ...formData,
      deviceId
    });
    
    toast.success("Profile updated successfully!", {
      description: "Your profile information has been saved."
    });
  };
  
  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      // Clear localStorage
      localStorage.removeItem(`userData_${deviceId}`);
      localStorage.removeItem(`transactions_${deviceId}`);
      localStorage.removeItem(`savingsGoals_${deviceId}`);
      localStorage.removeItem(`budgetCategories_${deviceId}`);
      
      // Reset user data in context
      setUserData(null);
      
      // Show confirmation toast
      toast.success("All data cleared successfully", {
        description: "Your account has been reset."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: ""
      });
    }
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        
        <div className="space-y-6">
          <Card className="card-gradient">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your account details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="finance-input input-focus-effect"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="finance-input input-focus-effect"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="deviceId" className="text-sm font-medium">
                      Device ID
                    </label>
                    <Input
                      id="deviceId"
                      value={deviceId}
                      readOnly
                      disabled
                      className="finance-input"
                    />
                    <p className="text-xs text-muted-foreground">
                      This unique ID ties your data to this device.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 pt-4">
                    <Button
                      type="submit"
                      className="bg-finance-primary hover:bg-finance-primary/90 btn-hover-effect"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="card-gradient border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Actions here cannot be undone. Please be certain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                onClick={handleClearData}
                className="hover:bg-red-800 transition-colors"
              >
                <Trash className="mr-2 h-4 w-4" />
                Clear All Data
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                This will permanently delete all your transactions, savings goals, and budget data.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
}
