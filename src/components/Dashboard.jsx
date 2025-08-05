import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import StatCards from './StatCards';
import ActivityGraph from './ActivityGraph';
import RecentTransactions from './RecentTransactions';
import UsageRadar from './UsageRadar';
import Grid from './Grid';
import { useToast } from '@/hooks/use-toast';

// Mock API service (in real app, this would be actual API calls)
const mockApiService = {
  getSummaryMetrics: (timeRange) => {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        const baseMetrics = {
          totalExecutions: Math.floor(Math.random() * 10000) + 5000,
          successfulExecutions: Math.floor(Math.random() * 8000) + 4000,
          failedExecutions: Math.floor(Math.random() * 500) + 50,
          warningExecutions: Math.floor(Math.random() * 300) + 20,
          runningExecutions: Math.floor(Math.random() * 50) + 5,
          pendingExecutions: Math.floor(Math.random() * 100) + 10,
          averageDuration: Math.floor(Math.random() * 200) + 45,
          totalDataProcessed: Math.floor(Math.random() * 5000000) + 1000000
        };
        
        baseMetrics.successRate = ((baseMetrics.successfulExecutions / baseMetrics.totalExecutions) * 100);
        baseMetrics.errorRate = ((baseMetrics.failedExecutions / baseMetrics.totalExecutions) * 100);
        
        resolve(baseMetrics);
      }, 300);
    });
  },

  getChartData: (timeRange) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const intervals = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
        const data = [];
        
        for (let i = 0; i < intervals; i++) {
          data.push({
            label: `Period ${i + 1}`,
            success: Math.floor(Math.random() * 100) + 20,
            error: Math.floor(Math.random() * 20) + 1,
            warning: Math.floor(Math.random() * 15) + 1,
            running: Math.floor(Math.random() * 10) + 1,
            pending: Math.floor(Math.random() * 5) + 1
          });
        }
        
        resolve(data);
      }, 300);
    });
  },

  getInterfaceLogs: (page = 1, limit = 25, filters = {}) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const statuses = ['success', 'error', 'warning', 'running', 'pending'];
        const interfaces = [
          'SAP SuccessFactors - Employee Data Sync',
          'SAP ECP - Payroll Integration',
          'Active Directory - User Provisioning',
          'Workday - Time & Attendance',
          'BambooHR - Performance Data'
        ];
        const keys = ['SF_EMP_001', 'ECP_PAY_002', 'AD_PROV_003', 'WD_TIME_004', 'BAMBOO_005'];
        
        const data = [];
        for (let i = 0; i < limit; i++) {
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          data.push({
            id: `log_${page}_${i}`,
            interfaceName: interfaces[Math.floor(Math.random() * interfaces.length)],
            integrationKey: keys[Math.floor(Math.random() * keys.length)],
            status,
            message: status === 'success' ? 'Execution completed successfully' : 
                    status === 'error' ? 'Connection timeout occurred' :
                    'Processing with warnings',
            timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            duration: Math.floor(Math.random() * 300) + 10,
            recordsProcessed: Math.floor(Math.random() * 10000) + 100
          });
        }
        
        resolve({
          data,
          totalRecords: 50000,
          page,
          totalPages: Math.ceil(50000 / limit)
        });
      }, 400);
    });
  }
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    summary: false,
    chart: false,
    logs: false
  });
  
  const { toast } = useToast();

  // Load data based on time range
  useEffect(() => {
    loadSummaryData();
    loadChartData();
    loadLogsData();
  }, [timeRange]);

  const loadSummaryData = async () => {
    setIsLoading(prev => ({ ...prev, summary: true }));
    try {
      const data = await mockApiService.getSummaryMetrics(timeRange);
      setSummaryData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load summary metrics",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, summary: false }));
    }
  };

  const loadChartData = async () => {
    setIsLoading(prev => ({ ...prev, chart: true }));
    try {
      const data = await mockApiService.getChartData(timeRange);
      setChartData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load chart data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, chart: false }));
    }
  };

  const loadLogsData = async () => {
    setIsLoading(prev => ({ ...prev, logs: true }));
    try {
      const response = await mockApiService.getInterfaceLogs(1, 25);
      setLogsData(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load interface logs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, logs: false }));
    }
  };

  const handleRefreshLogs = () => {
    loadLogsData();
    toast({
      title: "Refreshed",
      description: "Interface logs have been updated"
    });
  };

  const handleAdvancedFilters = () => {
    // This would typically open a more complex filter dialog
    toast({
      title: "Advanced Filters",
      description: "Advanced filtering options are available in the logs table"
    });
  };

  return (
    <div className="h-full">
      <TopBar />
      <Grid />
    </div>
  );
};

export default Dashboard;