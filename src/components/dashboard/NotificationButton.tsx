
import { useState } from "react";
import { Bell, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export function NotificationButton() {
  const [open, setOpen] = useState(false);
  const { transactions } = useAppContext();
  
  // Generate some sample notifications based on real transactions data
  const generateNotifications = () => {
    const notifications = [];
    
    // Add weekly report notification
    notifications.push({
      id: "weekly-report",
      title: "Weekly Report Available",
      message: "Your financial summary for this week is ready to view.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      type: "report"
    });
    
    // Add notifications based on transactions
    if (transactions.length > 0) {
      // Find the most recent transaction
      const lastTransaction = [...transactions].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      
      notifications.push({
        id: "latest-transaction",
        title: `${lastTransaction.type === 'income' ? 'Income' : 'Expense'} Recorded`,
        message: `${lastTransaction.name} - $${lastTransaction.amount}`,
        time: new Date(lastTransaction.date),
        type: "transaction"
      });
    }
    
    // Add budget alert if applicable
    const expenses = transactions.filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    if (expenses > 3000) {
      notifications.push({
        id: "budget-alert",
        title: "Budget Alert",
        message: "You're approaching your monthly expense limit.",
        time: new Date(),
        type: "alert"
      });
    }
    
    return notifications;
  };
  
  const notifications = generateNotifications();
  
  const handleViewWeeklyReport = () => {
    // For now just close the dropdown and log
    console.log("Viewing weekly report");
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="max-h-[300px] overflow-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 cursor-pointer">
                <div className="flex w-full items-start gap-2">
                  {notification.type === 'report' ? (
                    <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
                  ) : (
                    <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.time, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            
            {notifications.some(n => n.type === 'report') && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex justify-center font-medium text-primary"
                  onClick={handleViewWeeklyReport}
                >
                  View Weekly Report
                </DropdownMenuItem>
              </>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
