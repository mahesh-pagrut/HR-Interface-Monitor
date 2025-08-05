import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import ActivityGraph from '../components/ActivityGraph';
import UsageRadar from '../components/UsageRadar';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedInterface, setSelectedInterface] = useState('all');

  // Mock analytics data
  const trendData = [
    { label: 'Week 1', success: 1250, error: 45, warning: 23, total: 1318 },
    { label: 'Week 2', success: 1340, error: 32, warning: 18, total: 1390 },
    { label: 'Week 3', success: 1280, error: 67, warning: 34, total: 1381 },
    { label: 'Week 4', success: 1450, error: 28, warning: 15, total: 1493 }
  ];

  const performanceMetrics = {
    totalExecutions: 45234,
    successfulExecutions: 43567,
    failedExecutions: 892,
    warningExecutions: 775,
    successRate: 96.3,
    averageDuration: 52,
    totalDataProcessed: 12500000
  };

  const topInterfaces = [
    { name: 'SAP SuccessFactors - Employee Data', executions: 12450, successRate: 98.2, avgDuration: 45 },
    { name: 'SAP ECP - Payroll Integration', executions: 8760, successRate: 97.8, avgDuration: 62 },
    { name: 'Active Directory - User Provisioning', executions: 15670, successRate: 95.1, avgDuration: 23 },
    { name: 'Workday - Time & Attendance', executions: 6890, successRate: 99.1, avgDuration: 38 },
    { name: 'BambooHR - Performance Data', executions: 2340, successRate: 94.7, avgDuration: 71 }
  ];

  const errorAnalysis = [
    { type: 'Connection Timeout', count: 245, percentage: 35.2 },
    { type: 'Authentication Failed', count: 156, percentage: 22.4 },
    { type: 'Data Validation Error', count: 134, percentage: 19.3 },
    { type: 'Rate Limit Exceeded', count: 89, percentage: 12.8 },
    { type: 'Other', count: 72, percentage: 10.3 }
  ];

  const getSuccessRateColor = (rate) => {
    if (rate >= 98) return 'text-success';
    if (rate >= 95) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of interface performance and trends.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold text-foreground">{performanceMetrics.totalExecutions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Executions</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-success">{performanceMetrics.successRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-foreground">{performanceMetrics.averageDuration}s</div>
              <div className="text-sm text-muted-foreground">Avg Duration</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">{(performanceMetrics.totalDataProcessed / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Records Processed</div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityGraph chartData={trendData} title="Execution Trends" />
            <UsageRadar summaryData={performanceMetrics} />
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Interface Performance Ranking</h3>
            <div className="space-y-4">
              {topInterfaces.map((interface_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{interface_.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {interface_.executions.toLocaleString()} executions
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className={`font-medium ${getSuccessRateColor(interface_.successRate)}`}>
                        {interface_.successRate}%
                      </div>
                      <div className="text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{interface_.avgDuration}s</div>
                      <div className="text-muted-foreground">Avg Duration</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Error Distribution</h3>
              <div className="space-y-3">
                {errorAnalysis.map((error, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{error.type}</div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-destructive h-2 rounded-full" 
                          style={{ width: `${error.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-medium text-foreground">{error.count}</div>
                      <div className="text-xs text-muted-foreground">{error.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Error Trends</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <p>Error trend chart would be displayed here</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <ActivityGraph chartData={trendData} title="Historical Trends Analysis" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Volume Trends</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="text-success font-medium">+12.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="text-success font-medium">+8.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Quarter</span>
                  <span className="text-success font-medium">+15.2%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="text-success font-medium">+2.1%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Duration</span>
                  <span className="text-success font-medium">-5.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Error Rate</span>
                  <span className="text-destructive font-medium">+0.8%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-warning font-medium">78%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="text-success font-medium">64%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network I/O</span>
                  <span className="text-primary font-medium">82%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;