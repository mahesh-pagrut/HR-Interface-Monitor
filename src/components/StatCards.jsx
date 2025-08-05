import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const StatCard = ({ title, value, change, icon: Icon, trend, status = 'default' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-success/20 bg-gradient-to-br from-success/5 to-success/10';
      case 'error':
        return 'border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10';
      case 'warning':
        return 'border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10';
      case 'primary':
        return 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10';
      default:
        return 'border-border bg-card';
    }
  };

  const getIconStyles = () => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      case 'primary':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={`p-6 ${getStatusStyles()} hover:shadow-lg transition-all duration-300 mb-4`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {change}%
              </span>
              <span className="text-sm text-muted-foreground">from last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-background/50 ${getIconStyles()}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

const StatCards = ({ summaryData, timeRange }) => {
  const successRate = summaryData.successRate || 0;
  const errorRate = summaryData.errorRate || 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Executions"
        value={summaryData.totalExecutions?.toLocaleString() || '0'}
        change={12.5}
        trend="up"
        icon={Activity}
        status="primary"
      />
      
      <StatCard
        title="Success Rate"
        value={`${successRate}%`}
        change={successRate > 95 ? 2.1 : -1.8}
        trend={successRate > 95 ? 'up' : 'down'}
        icon={CheckCircle}
        status="success"
      />
      
      <StatCard
        title="Failed Executions"
        value={summaryData.failedExecutions?.toLocaleString() || '0'}
        change={errorRate > 5 ? 5.2 : -3.1}
        trend={errorRate > 5 ? 'up' : 'down'}
        icon={XCircle}
        status="error"
      />
      
      <StatCard
        title="Avg. Duration"
        value={`${summaryData.averageDuration || 0}s`}
        change={-8.3}
        trend="down"
        icon={Clock}
        status="default"
      />
    </div>
  );
};

export default StatCards;