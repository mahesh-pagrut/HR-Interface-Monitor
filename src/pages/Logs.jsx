import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import RecentTransactions from '../components/RecentTransactions';
import { useToast } from '@/hooks/use-toast';

const Logs = () => {
  const [logsData, setLogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock API call for logs
  const loadLogsData = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockLogs = Array.from({ length: 100 }, (_, i) => ({
        id: `log_${i}`,
        interfaceName: [
          'SAP SuccessFactors - Employee Data Sync',
          'SAP ECP - Payroll Integration',
          'Active Directory - User Provisioning',
          'Workday - Time & Attendance',
          'BambooHR - Performance Data'
        ][i % 5],
        integrationKey: ['SF_EMP_001', 'ECP_PAY_002', 'AD_PROV_003', 'WD_TIME_004', 'BAMBOO_005'][i % 5],
        status: ['success', 'error', 'warning', 'running', 'pending'][Math.floor(Math.random() * 5)],
        message: 'Execution completed successfully',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.floor(Math.random() * 300) + 10,
        recordsProcessed: Math.floor(Math.random() * 10000) + 100
      }));
      
      setLogsData(mockLogs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load interface logs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogsData();
  }, []);

  const handleRefreshLogs = () => {
    loadLogsData();
    toast({
      title: "Refreshed",
      description: "Interface logs have been updated"
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Interface Logs</h1>
        <p className="text-muted-foreground">
          Detailed view of all interface execution logs with advanced filtering and search capabilities.
        </p>
      </div>

      <RecentTransactions 
        data={logsData}
        onRefresh={handleRefreshLogs}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Logs;