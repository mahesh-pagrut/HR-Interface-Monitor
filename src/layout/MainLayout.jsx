import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sidebar width based on collapsed state
  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-64';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${sidebarWidth} transition-all duration-300`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="fixed left-0 top-0 h-full w-64 bg-background overflow-y-auto">
          <Sidebar collapsed={false} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg">HR Interface Monitor</h1>
          <div className="w-10" /> {/* Spacer to balance layout */}
        </div>

        {/* Desktop Header with Sidebar Toggle */}
        <div className="hidden lg:flex items-center gap-2 p-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="bg-card border border-border"
          >
            {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
          <h1 className="font-semibold text-lg">HR Interface Monitor</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
