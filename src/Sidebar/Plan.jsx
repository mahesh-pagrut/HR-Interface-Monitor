import React from 'react';
import { Crown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Plan = () => {
  const planData = {
    name: 'Professional',
    usage: {
      current: 750000,
      limit: 1000000,
      percentage: 75
    },
    features: {
      interfaces: '25 Active',
      retention: '90 Days',
      users: '10 Users'
    }
  };

  return (
    <Card className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Crown className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{planData.name} Plan</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Records Processed</span>
            <span className="text-foreground font-medium">
              {(planData.usage.current / 1000000).toFixed(1)}M / {(planData.usage.limit / 1000000)}M
            </span>
          </div>
          <Progress 
            value={planData.usage.percentage} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium text-foreground">{planData.features.interfaces}</div>
            <div className="text-muted-foreground">Interfaces</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">{planData.features.retention}</div>
            <div className="text-muted-foreground">Retention</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">{planData.features.users}</div>
            <div className="text-muted-foreground">Users</div>
          </div>
        </div>

        <Button 
          size="sm" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <TrendingUp className="h-3 w-3 mr-1" />
          Upgrade Plan
        </Button>
      </div>
    </Card>
  );
};

export default Plan;