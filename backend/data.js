// Static data for HR Interface Monitoring Dashboard
// Simulating 500,000+ interface records for performance testing

const generateInterfaceRecord = (id, baseDate) => {
  const statuses = ['success', 'error', 'warning', 'running', 'pending'];
  const interfaceNames = [
    'SAP SuccessFactors - Employee Data Sync',
    'SAP ECP - Payroll Integration', 
    'Active Directory - User Provisioning',
    'Workday - Time & Attendance',
    'BambooHR - Performance Data',
    'ADP - Benefits Sync',
    'Salesforce - Contact Integration',
    'ServiceNow - Ticket Management',
    'Azure AD - Identity Sync',
    'Oracle HCM - Core HR Data'
  ];
  
  const integrationKeys = [
    'SF_EMP_SYNC_001',
    'ECP_PAYROLL_002', 
    'AD_USER_PROV_003',
    'WD_TIME_ATT_004',
    'BAMBOO_PERF_005',
    'ADP_BENEFITS_006',
    'SF_CONTACT_007',
    'SNOW_TICKET_008',
    'AZURE_ID_009',
    'ORACLE_HR_010'
  ];

  const messages = {
    success: [
      'Data synchronization completed successfully',
      'All records processed without errors',
      'Integration completed - 0 failures',
      'Sync operation finished successfully'
    ],
    error: [
      'Connection timeout to target system',
      'Authentication failed - invalid credentials',
      'Data validation error - missing required fields',
      'API rate limit exceeded',
      'Network connectivity issues detected'
    ],
    warning: [
      'Some records skipped due to data quality issues',
      'Partial sync completed - check logs for details',
      'Performance degradation detected',
      'Non-critical validation warnings found'
    ],
    running: [
      'Sync operation in progress...',
      'Processing batch 3 of 10',
      'Data transfer ongoing'
    ],
    pending: [
      'Waiting for system availability',
      'Queued for processing',
      'Scheduled sync pending'
    ]
  };

  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const interfaceName = interfaceNames[Math.floor(Math.random() * interfaceNames.length)];
  const integrationKey = integrationKeys[Math.floor(Math.random() * integrationKeys.length)];
  
  // Create timestamp variation
  const timestamp = new Date(baseDate.getTime() + Math.random() * 24 * 60 * 60 * 1000);
  
  return {
    id,
    interfaceName,
    integrationKey,
    status,
    message: messages[status][Math.floor(Math.random() * messages[status].length)],
    timestamp: timestamp.toISOString(),
    duration: Math.floor(Math.random() * 300) + 10, // 10-310 seconds
    recordsProcessed: Math.floor(Math.random() * 10000) + 100,
    dataSize: Math.floor(Math.random() * 50) + 1, // MB
    sourceSystem: 'SAP SuccessFactors',
    targetSystem: 'Various',
    lastUpdated: timestamp.toISOString()
  };
};

// Generate large dataset for performance testing
const generateDataset = (count = 500000) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const baseDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
    data.push(generateInterfaceRecord(i + 1, baseDate));
  }
  
  return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Summary metrics calculation
const calculateSummaryMetrics = (data, timeRange = '24h') => {
  const now = new Date();
  let cutoffDate;
  
  switch (timeRange) {
    case '1h':
      cutoffDate = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case '24h':
      cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  const filteredData = data.filter(record => new Date(record.timestamp) > cutoffDate);
  
  const statusCounts = filteredData.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const totalRecords = filteredData.length;
  const successRate = totalRecords > 0 ? ((statusCounts.success || 0) / totalRecords * 100).toFixed(1) : 0;
  const errorRate = totalRecords > 0 ? ((statusCounts.error || 0) / totalRecords * 100).toFixed(1) : 0;

  return {
    totalExecutions: totalRecords,
    successfulExecutions: statusCounts.success || 0,
    failedExecutions: statusCounts.error || 0,
    warningExecutions: statusCounts.warning || 0,
    runningExecutions: statusCounts.running || 0,
    pendingExecutions: statusCounts.pending || 0,
    successRate: parseFloat(successRate),
    errorRate: parseFloat(errorRate),
    averageDuration: totalRecords > 0 ? 
      Math.round(filteredData.reduce((sum, r) => sum + r.duration, 0) / totalRecords) : 0,
    totalDataProcessed: filteredData.reduce((sum, r) => sum + r.recordsProcessed, 0)
  };
};

// Chart data generation
const generateChartData = (data, timeRange = '24h', interval = 'hour') => {
  const now = new Date();
  let cutoffDate;
  let intervals;

  switch (timeRange) {
    case '1h':
      cutoffDate = new Date(now.getTime() - 60 * 60 * 1000);
      intervals = 12; // 5-minute intervals
      break;
    case '24h':
      cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      intervals = 24; // hourly intervals
      break;
    case '7d':
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      intervals = 7; // daily intervals
      break;
    case '30d':
      cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      intervals = 30; // daily intervals
      break;
    default:
      cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      intervals = 24;
  }

  const chartData = [];
  const timeSlice = (now.getTime() - cutoffDate.getTime()) / intervals;

  for (let i = 0; i < intervals; i++) {
    const startTime = new Date(cutoffDate.getTime() + i * timeSlice);
    const endTime = new Date(cutoffDate.getTime() + (i + 1) * timeSlice);
    
    const intervalData = data.filter(record => {
      const recordTime = new Date(record.timestamp);
      return recordTime >= startTime && recordTime < endTime;
    });

    const statusCounts = intervalData.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});

    chartData.push({
      time: startTime.toISOString(),
      label: timeRange === '1h' ? startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
             timeRange === '24h' ? startTime.toLocaleTimeString('en-US', { hour: '2-digit' }) :
             startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      success: statusCounts.success || 0,
      error: statusCounts.error || 0,
      warning: statusCounts.warning || 0,
      running: statusCounts.running || 0,
      pending: statusCounts.pending || 0,
      total: intervalData.length
    });
  }

  return chartData;
};

// Export data and functions
const hrInterfaceData = generateDataset(100000); // Start with 100k for demo

module.exports = {
  hrInterfaceData,
  generateDataset,
  calculateSummaryMetrics,
  generateChartData,
  
  // API-like functions for frontend
  getInterfaceLogs: (page = 1, limit = 50, filters = {}) => {
    let filteredData = [...hrInterfaceData];
    
    // Apply filters
    if (filters.status) {
      filteredData = filteredData.filter(record => record.status === filters.status);
    }
    if (filters.interfaceName) {
      filteredData = filteredData.filter(record => 
        record.interfaceName.toLowerCase().includes(filters.interfaceName.toLowerCase())
      );
    }
    if (filters.integrationKey) {
      filteredData = filteredData.filter(record => 
        record.integrationKey.toLowerCase().includes(filters.integrationKey.toLowerCase())
      );
    }
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      filteredData = filteredData.filter(record => {
        const recordDate = new Date(record.timestamp);
        return recordDate >= start && recordDate <= end;
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: filteredData.slice(startIndex, endIndex),
      totalRecords: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit)
    };
  },

  getSummaryMetrics: (timeRange = '24h') => {
    return calculateSummaryMetrics(hrInterfaceData, timeRange);
  },

  getChartData: (timeRange = '24h') => {
    return generateChartData(hrInterfaceData, timeRange);
  }
};