import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COLORS = {
  success: 'hsl(var(--success))',
  error: 'hsl(var(--destructive))',
  warning: 'hsl(var(--warning))',
  running: 'hsl(var(--primary))',
  pending: 'hsl(var(--muted-foreground))'
};

const UsageRadar = ({ summaryData, chartData }) => {
  // Prepare pie chart data
  const pieData = [
    { name: 'Success', value: summaryData.successfulExecutions || 0, color: COLORS.success },
    { name: 'Failed', value: summaryData.failedExecutions || 0, color: COLORS.error },
    { name: 'Warning', value: summaryData.warningExecutions || 0, color: COLORS.warning },
    { name: 'Running', value: summaryData.runningExecutions || 0, color: COLORS.running },
    { name: 'Pending', value: summaryData.pendingExecutions || 0, color: COLORS.pending }
  ].filter(item => item.value > 0);

  // Prepare interface performance data
  const interfaceData = [
    { name: 'SF Employee Sync', success: 45, error: 2, warning: 1 },
    { name: 'ECP Payroll', success: 38, error: 0, warning: 2 },
    { name: 'AD Provisioning', success: 52, error: 3, warning: 0 },
    { name: 'Workday T&A', success: 41, error: 1, warning: 1 },
    { name: 'BambooHR Perf', success: 35, error: 0, warning: 0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm" style={{ color: data.payload.color }}>
            Count: {data.value}
          </p>
          <p className="text-sm text-muted-foreground">
            {((data.value / summaryData.totalExecutions) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Interface Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Interface Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interfaceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="success" stackId="a" fill={COLORS.success} />
              <Bar dataKey="warning" stackId="a" fill={COLORS.warning} />
              <Bar dataKey="error" stackId="a" fill={COLORS.error} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* System Health Metrics */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">System Health Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">
              {summaryData.successRate || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">
              {summaryData.averageDuration || 0}s
            </div>
            <div className="text-sm text-muted-foreground">Avg Duration</div>
          </div>
          
          <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">
              {((summaryData.totalDataProcessed || 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">Records Processed</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg border border-border">
            <div className="text-2xl font-bold">
              99.2%
            </div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UsageRadar;