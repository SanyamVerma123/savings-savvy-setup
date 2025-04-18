
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData, deviceId, hasCompletedOnboarding } = useAppContext();

  // Check if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUserData({...userData, deviceId});
        
        // Navigate to onboarding if not completed, otherwise to dashboard
        if (!hasCompletedOnboarding) {
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to parse saved user data", error);
        localStorage.removeItem('user');
      }
    }
  }, [navigate, setUserData, deviceId, hasCompletedOnboarding]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // Basic validation
      if (!email.trim() || !password.trim()) {
        toast.error("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      // For demo purposes, allow any login
      const userData = {
        id: "user-" + Date.now(),
        name: email.split('@')[0], // Use name from email
        email: email,
        deviceId: deviceId
      };

      // Save to state
      setUserData(userData);

      // Save to local storage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }

      toast.success("Login successful");
      setIsLoading(false);
      
      // Navigate to onboarding if not completed, otherwise to dashboard
      if (!hasCompletedOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-t-lg">
            <motion.div 
              className="flex justify-center mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Lock className="h-12 w-12" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="text-sm text-white/80">Sign in to your Savings Savvy account</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button type="button" variant="link" className="px-0 font-normal text-xs text-blue-500 h-auto">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Note: This is a demo app. Any email and password will work.
              </p>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full hover:scale-105 transition-transform"
              onClick={() => navigate('/onboarding')}
            >
              Continue as Guest
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
