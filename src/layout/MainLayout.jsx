import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-1 lg:grid-cols-[220px,_1fr] min-h-screen bg-stone-50">
      <Sidebar />
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;