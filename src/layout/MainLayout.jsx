import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - Fixed width, no overlap */}
      <div className={`hidden lg:flex ${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out shrink-0`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 bg-sidebar animate-slide-in">
            <Sidebar collapsed={false} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area - Flex grows to fill remaining space */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-border shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
            className="hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg text-gray-900">HR Interface Monitor</h1>
          <div className="w-10" />
        </header>

        {/* Desktop Header with Sidebar Toggle */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b border-border shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-gray-100 p-2"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
            <h1 className="font-semibold text-xl text-gray-900">HR Interface Monitor</h1>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              Real-time monitoring • Connected
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
