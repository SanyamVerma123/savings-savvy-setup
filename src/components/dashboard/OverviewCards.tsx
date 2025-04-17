
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  PiggyBank,
  Wallet
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: React.ReactNode;
  className?: string;
}

function OverviewCard({
  title,
  value,
  change,
  changeType = "increase",
  icon,
  className
}: OverviewCardProps) {
  return (
    <Card className={`${className} card-gradient overflow-hidden`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-primary bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          {change && (
            <div className="flex items-center mt-1">
              {changeType === "increase" ? (
                <>
                  <ArrowUpRight className="h-4 w-4 text-finance-income mr-1" />
                  <span className="text-xs font-medium text-finance-income">
                    {change}
                  </span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-4 w-4 text-finance-expense mr-1" />
                  <span className="text-xs font-medium text-finance-expense">
                    {change}
                  </span>
                </>
              )}
              <span className="text-xs text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewCards() {
  return (
    <div className="stats-grid">
      <OverviewCard
        title="Total Income"
        value="$5,230.00"
        change="↑ 12.5%"
        changeType="increase"
        icon={<DollarSign className="h-5 w-5" />}
        className="income-card"
      />
      <OverviewCard
        title="Total Expenses"
        value="$3,450.00"
        change="↑ 5.2%"
        changeType="decrease"
        icon={<Wallet className="h-5 w-5" />}
        className="expense-card"
      />
      <OverviewCard
        title="Total Savings"
        value="$1,780.00"
        change="↑ 32.4%"
        changeType="increase"
        icon={<PiggyBank className="h-5 w-5" />}
        className="savings-card"
      />
    </div>
  );
}
