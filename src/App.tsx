import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="logs" element={<Logs />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<div className="p-6"><h1 className="text-2xl font-bold">Alerts - Coming Soon</h1></div>} />
            <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports - Coming Soon</h1></div>} />
            <Route path="users" element={<div className="p-6"><h1 className="text-2xl font-bold">Users - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
