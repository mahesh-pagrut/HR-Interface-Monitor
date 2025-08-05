import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Pause, Square } from 'lucide-react';
import ActivityGraph from '../components/ActivityGraph';
import UsageRadar from '../components/UsageRadar';

const Monitoring = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [isLive, setIsLive] = useState(true);

  // Mock real-time interface status
  const mockInterfaces = [
    {
      id: 'sf_emp_001',
      name: 'SAP SuccessFactors - Employee Data Sync',
      status: 'running',
      lastRun: new Date(Date.now() - 1000 * 60 * 5),
      nextRun: new Date(Date.now() + 1000 * 60 * 55),
      frequency: 'Hourly',
      recordsProcessed: 2543,
      avgDuration: 45,
      successRate: 99.2
    },
    {
      id: 'ecp_pay_002',
      name: 'SAP ECP - Payroll Integration',
      status: 'success',
      lastRun: new Date(Date.now() - 1000 * 60 * 15),
      nextRun: new Date(Date.now() + 1000 * 60 * 45),
      frequency: 'Daily',
      recordsProcessed: 1876,
      avgDuration: 62,
      successRate: 98.7
    },
    {
      id: 'ad_prov_003',
      name: 'Active Directory - User Provisioning',
      status: 'error',
      lastRun: new Date(Date.now() - 1000 * 60 * 8),
      nextRun: new Date(Date.now() + 1000 * 60 * 22),
      frequency: 'Every 30 min',
      recordsProcessed: 45,
      avgDuration: 15,
      successRate: 95.1
    },
    {
      id: 'wd_time_004',
      name: 'Workday - Time & Attendance',
      status: 'pending',
      lastRun: new Date(Date.now() - 1000 * 60 * 30),
      nextRun: new Date(Date.now() + 1000 * 60 * 30),
      frequency: 'Hourly',
      recordsProcessed: 0,
      avgDuration: 38,
      successRate: 97.8
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-primary text-primary-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Play className="h-3 w-3" />;
      case 'pending':
        return <Pause className="h-3 w-3" />;
      case 'error':
        return <Square className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }
    return `${minutes}m ago`;
  };

  const formatTimeUntil = (date) => {
    const diff = date.getTime() - Date.now();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `in ${hours}h ${minutes % 60}m`;
    }
    return `in ${minutes}m`;
  };

  useEffect(() => {
    setInterfaces(mockInterfaces);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive) {
        setRealTimeData(prev => [
          ...prev.slice(-20), // Keep last 20 entries
          {
            time: new Date().toLocaleTimeString(),
            success: Math.floor(Math.random() * 10) + 5,
            error: Math.floor(Math.random() * 3),
            warning: Math.floor(Math.random() * 2),
            total: Math.floor(Math.random() * 15) + 8
          }
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Real-time Monitoring</h1>
          <p className="text-muted-foreground">
            Live monitoring of interface executions and system performance.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLive ? 'animate-spin' : ''}`} />
            <span>{isLive ? 'Live' : 'Paused'}</span>
          </Button>
        </div>
      </div>

      {/* Real-time Activity Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Live Activity Monitor</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          {isLive ? (
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p>Monitoring live interface activity...</p>
            </div>
          ) : (
            <p>Live monitoring paused</p>
          )}
        </div>
      </Card>

      {/* Interface Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {interfaces.map((interface_) => (
          <Card key={interface_.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{interface_.name}</h3>
                <p className="text-sm text-muted-foreground">Frequency: {interface_.frequency}</p>
              </div>
              <Badge className={`${getStatusColor(interface_.status)} flex items-center space-x-1`}>
                {getStatusIcon(interface_.status)}
                <span className="capitalize">{interface_.status}</span>
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Last Run</div>
                <div className="text-sm font-medium">{formatTimeAgo(interface_.lastRun)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Run</div>
                <div className="text-sm font-medium">{formatTimeUntil(interface_.nextRun)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Records Processed</div>
                <div className="text-sm font-medium">{interface_.recordsProcessed.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-sm font-medium">{interface_.successRate}%</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Play className="h-3 w-3 mr-1" />
                Run Now
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <UsageRadar 
        summaryData={{
          totalExecutions: 8456,
          successfulExecutions: 8234,
          failedExecutions: 89,
          warningExecutions: 133,
          runningExecutions: 4,
          pendingExecutions: 12,
          successRate: 97.4,
          averageDuration: 48,
          totalDataProcessed: 2450000
        }}
        chartData={realTimeData}
      />
    </div>
  );
};

export default Monitoring;