import React from 'react';
import { 
  BarChart3, 
  Database, 
  Settings, 
  AlertTriangle, 
  Activity, 
  Users, 
  FileText,
  Search,
  TrendingUp,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

const CommandMenu = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const navigationCommands = [
    {
      icon: BarChart3,
      title: 'Dashboard',
      subtitle: 'View overview and analytics',
      action: () => navigate('/')
    },
    {
      icon: Database,
      title: 'Interface Logs',
      subtitle: 'Browse execution logs',
      action: () => navigate('/logs')
    },
    {
      icon: Activity,
      title: 'Monitoring',
      subtitle: 'Real-time system monitoring',
      action: () => navigate('/monitoring')
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      subtitle: 'Advanced analytics and reports',
      action: () => navigate('/analytics')
    },
    {
      icon: AlertTriangle,
      title: 'Alerts',
      subtitle: 'System alerts and notifications',
      action: () => navigate('/alerts')
    },
    {
      icon: FileText,
      title: 'Reports',
      subtitle: 'Generate and download reports',
      action: () => navigate('/reports')
    },
    {
      icon: Users,
      title: 'Users',
      subtitle: 'Manage users and permissions',
      action: () => navigate('/users')
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'System configuration',
      action: () => navigate('/settings')
    }
  ];

  const actionCommands = [
    {
      icon: RefreshCw,
      title: 'Refresh Dashboard',
      subtitle: 'Reload all dashboard data',
      action: () => window.location.reload()
    },
    {
      icon: Play,
      title: 'Start All Interfaces',
      subtitle: 'Resume all paused interfaces',
      action: () => console.log('Starting all interfaces...')
    },
    {
      icon: Pause,
      title: 'Pause All Interfaces',
      subtitle: 'Temporarily pause all interfaces',
      action: () => console.log('Pausing all interfaces...')
    }
  ];

  const handleSelect = (action) => {
    action();
    onOpenChange(false);
  };

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationCommands.map((command, index) => (
            <CommandItem
              key={index}
              onSelect={() => handleSelect(command.action)}
              className="flex items-center space-x-3 px-3 py-2"
            >
              <command.icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{command.title}</div>
                <div className="text-xs text-muted-foreground">{command.subtitle}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actionCommands.map((command, index) => (
            <CommandItem
              key={index}
              onSelect={() => handleSelect(command.action)}
              className="flex items-center space-x-3 px-3 py-2"
            >
              <command.icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{command.title}</div>
                <div className="text-xs text-muted-foreground">{command.subtitle}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => handleSelect(() => navigate('/logs?status=error'))}>
            <AlertTriangle className="h-4 w-4 mr-3 text-destructive" />
            <span>View Error Logs</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/logs?status=running'))}>
            <Activity className="h-4 w-4 mr-3 text-primary" />
            <span>View Running Interfaces</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/monitoring'))}>
            <TrendingUp className="h-4 w-4 mr-3 text-success" />
            <span>System Performance</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;