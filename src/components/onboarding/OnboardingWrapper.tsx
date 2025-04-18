
import { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { OnboardingForm } from "./OnboardingForm";
import { useNavigate } from "react-router-dom";

export function OnboardingWrapper() {
  const { hasCompletedOnboarding } = useAppContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If onboarding is already completed, navigate to dashboard
    if (hasCompletedOnboarding) {
      navigate('/');
    }
  }, [hasCompletedOnboarding, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <OnboardingForm />
    </div>
  );
}
