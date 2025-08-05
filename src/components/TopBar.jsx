import React from 'react';
import { Bell, Settings, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TopBar = ({ 
  timeRange, 
  setTimeRange, 
  searchTerm, 
  setSearchTerm, 
  onAdvancedFilters 
}) => {
  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last Week' },
    { value: '30d', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border gap-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          HR Interface Monitor
        </h1>
        <div className="flex items-center space-x-2">
          {/* <Search className="h-4 w-4 text-muted-foreground" /> */}
          <Input
            placeholder="Search interfaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-secondary border-border"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onAdvancedFilters}
          className="border-border hover:bg-accent"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>

        <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className={`text-xs ${
                timeRange === range.value 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range.label}
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;