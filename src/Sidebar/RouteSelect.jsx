import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RouteSelect = () => {
  const systemStatus = {
    overall: 'healthy',
    components: [
      { name: 'API Gateway', status: 'healthy', uptime: '99.9%' },
      { name: 'Database', status: 'healthy', uptime: '99.8%' },
      { name: 'Queue Service', status: 'warning', uptime: '98.5%' },
      { name: 'Auth Service', status: 'healthy', uptime: '99.9%' }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-3 w-3 text-success" />;
      case 'warning':
        return <AlertCircle className="h-3 w-3 text-warning" />;
      case 'error':
        return <XCircle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="p-3 bg-sidebar-accent border-sidebar-border">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-sidebar-foreground">System Status</span>
          <div className="flex items-center space-x-1">
            {getStatusIcon(systemStatus.overall)}
            <span className={`text-xs font-medium ${getStatusColor(systemStatus.overall)}`}>
              Operational
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {systemStatus.components.map((component, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                {getStatusIcon(component.status)}
                <span className="text-sidebar-foreground">{component.name}</span>
              </div>
              <span className="text-muted-foreground">{component.uptime}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground">
            Last checked: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RouteSelect;