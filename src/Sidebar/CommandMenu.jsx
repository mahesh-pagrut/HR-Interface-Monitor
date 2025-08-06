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
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
      className="animate-fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="flex items-center border-b border-gray-100 px-4">
          <Search className="mr-3 h-4 w-4 shrink-0 text-gray-400" />
          <CommandInput 
            placeholder="Type a command or search..." 
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 border-0"
          />
        </div>
        
        <CommandList className="max-h-80 overflow-y-auto p-2">
          <CommandEmpty className="py-8 text-center text-sm text-gray-500">
            No results found.
          </CommandEmpty>
          
          <CommandGroup heading="Navigation">
            {navigationCommands.map((command, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleSelect(command.action)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <command.icon className="h-4 w-4 text-gray-600" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{command.title}</div>
                  <div className="text-xs text-gray-500">{command.subtitle}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="Actions">
            {actionCommands.map((command, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleSelect(command.action)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <command.icon className="h-4 w-4 text-gray-600" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{command.title}</div>
                  <div className="text-xs text-gray-500">{command.subtitle}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="Quick Access">
            <CommandItem 
              onSelect={() => handleSelect(() => navigate('/logs?status=error'))}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-gray-900">View Error Logs</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSelect(() => navigate('/logs?status=running'))}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 cursor-pointer"
            >
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-gray-900">View Running Interfaces</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => handleSelect(() => navigate('/monitoring'))}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-green-50 cursor-pointer"
            >
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-gray-900">System Performance</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  );
};

export default CommandMenu;