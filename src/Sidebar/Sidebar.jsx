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
      title: 'Monitoring',
      href: '/monitoring',
      icon: Activity,
      description: 'Real-time monitoring'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: TrendingUp,
      description: 'Advanced analytics'
    },
    {
      title: 'Alerts',
      href: '/alerts',
      icon: AlertTriangle,
      description: 'System alerts'
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
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'System settings'
    }
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-sidebar-foreground">HR Monitor</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <Activity className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <Search />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm",
                collapsed && "justify-center"
              )
            }
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.title}</div>
                <div className="text-xs text-sidebar-foreground/60 truncate">
                  {item.description}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Route Select (System Status) */}
      {!collapsed && (
        <div className="p-4">
          <RouteSelect />
        </div>
      )}

      {/* Plan/Upgrade */}
      {!collapsed && (
        <div className="p-4">
          <Plan />
        </div>
      )}

      {/* Account Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <AccountToggle collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;