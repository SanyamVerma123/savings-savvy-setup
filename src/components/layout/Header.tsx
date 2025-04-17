
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-finance-primary text-white p-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
                <path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                <path d="M6 14v0a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2" />
                <rect width="3" height="3" x="6" y="18" rx="1" />
                <rect width="3" height="3" x="15" y="18" rx="1" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">Savings Savvy</span>
          </Link>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</Link>
            <Link to="/budget" className="text-sm font-medium transition-colors hover:text-primary">Budget</Link>
            <Link to="/transactions" className="text-sm font-medium transition-colors hover:text-primary">Transactions</Link>
            <Link to="/savings" className="text-sm font-medium transition-colors hover:text-primary">Savings Goals</Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-finance-primary rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobile && isNavOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsNavOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/budget" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsNavOpen(false)}
            >
              Budget
            </Link>
            <Link 
              to="/transactions" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsNavOpen(false)}
            >
              Transactions
            </Link>
            <Link 
              to="/savings" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsNavOpen(false)}
            >
              Savings Goals
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
