import React from 'react';
import {
  BarChart3,
  Database,
  Settings,
  AlertTriangle,
  Activity,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import RouteSelect from './RouteSelect';
import AccountToggle from './AccountToggle';
import Search from './Search';
import Plan from './Plan';

const Sidebar = ({ collapsed = false, onToggle }) => {
  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: BarChart3,
      description: 'Overview & analytics'
    },
    {
      title: 'Interface Logs',
      href: '/logs',
      icon: Database,
      description: 'Live execution logs'
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: FileText,
      description: 'Generate reports'
    },
    {
      title: 'Users',
      href: '/users',
      icon: Users,
      description: 'User management'
    },
  ];

  return (
    <div

      className={cn(
        'h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="ml-2 font-semibold text-sm">HR Monitor</span>
          )}
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-none">

          {/* Account Toggle */}
          <div className="p-4 border-t border-sidebar-border">
            <AccountToggle collapsed={collapsed} />
          </div>
          {/* Search */}
          {!collapsed && (
            <div className="p-4">
              <Search />
            </div>
          )}

          {/* Navigation */}
          <nav className="p-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center px-3 py-2 rounded-md transition-all duration-200',
                    collapsed ? 'justify-center' : 'space-x-3',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive &&
                    'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                  )
                }
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{item.title}</span>
                    <span className="text-xs text-sidebar-foreground/60 truncate">
                      {item.description}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Route Select */}
          {!collapsed && (
            <div className="p-4">
              <RouteSelect />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
