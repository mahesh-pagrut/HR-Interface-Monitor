import React from 'react';
import { 
  BarChart3, 
  Database, 
  Settings, 
  AlertTriangle, 
  Activity, 
  Users, 
  FileText,
  TrendingUp,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AccountToggle from './AccountToggle';
import Search from './Search';
import { Button } from '@/components/ui/button';

const Sidebar = ({ collapsed = false, onToggle, onClose }) => {
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
    <div className="h-full bg-white border-r border-gray-200 flex flex-col w-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">HR Monitor</h2>
                <p className="text-xs text-gray-500">Interface Dashboard</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
          )}
          
          {/* Mobile Close Button */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Account Toggle */}
      {!collapsed && (
        <div className="p-4">
          <AccountToggle collapsed={collapsed} />
        </div>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <Search />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onClose} // Close mobile menu on navigation
            className={({ isActive }) =>
              cn(
                "sidebar-item",
                isActive && "sidebar-item-active bg-purple-50 text-purple-700 border-l-4 border-purple-500",
                collapsed && "justify-center px-2"
              )
            }
            title={collapsed ? item.title : undefined}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", collapsed ? "" : "mr-3")} />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{item.title}</div>
                <div className="text-xs text-gray-500 truncate">
                  {item.description}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Status */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;