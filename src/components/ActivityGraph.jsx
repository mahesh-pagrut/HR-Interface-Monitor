import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
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

const ActivityGraph = ({ chartData, title = "Interface Activity Overview" }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <Tabs defaultValue="area" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="area">Area Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="area" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="label" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="success"
                stackId="1"
                stroke="hsl(var(--success))"
                fillOpacity={1}
                fill="url(#colorSuccess)"
              />
              <Area
                type="monotone"
                dataKey="warning"
                stackId="1"
                stroke="hsl(var(--warning))"
                fillOpacity={1}
                fill="url(#colorWarning)"
              />
              <Area
                type="monotone"
                dataKey="error"
                stackId="1"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorError)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="line" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="label" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="success"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="error"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="warning"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="bar" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="label" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="success" stackId="a" fill="hsl(var(--success))" />
              <Bar dataKey="warning" stackId="a" fill="hsl(var(--warning))" />
              <Bar dataKey="error" stackId="a" fill="hsl(var(--destructive))" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ActivityGraph;