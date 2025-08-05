import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Filter, Download, RefreshCw, Search, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return { 
          variant: 'default', 
          className: 'bg-success text-success-foreground hover:bg-success/80',
          label: 'Success'
        };
      case 'error':
        return { 
          variant: 'destructive', 
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
          label: 'Error'
        };
      case 'warning':
        return { 
          variant: 'secondary', 
          className: 'bg-warning text-warning-foreground hover:bg-warning/80',
          label: 'Warning'
        };
      case 'running':
        return { 
          variant: 'default', 
          className: 'bg-primary text-primary-foreground hover:bg-primary/80',
          label: 'Running'
        };
      case 'pending':
        return { 
          variant: 'outline', 
          className: 'border-muted-foreground text-muted-foreground',
          label: 'Pending'
        };
      default:
        return { 
          variant: 'outline', 
          className: '',
          label: status
        };
    }
  };

  const config = getStatusConfig();
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

const AdvancedFilters = ({ filters, setFilters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onApply();
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Advanced Filters</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={localFilters.status || ''}
              onValueChange={(value) => setLocalFilters({...localFilters, status: value || undefined})}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interface">Interface</Label>
            <Input
              id="interface"
              placeholder="Interface name..."
              value={localFilters.interfaceName || ''}
              onChange={(e) => setLocalFilters({...localFilters, interfaceName: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={localFilters.startDate || ''}
              onChange={(e) => setLocalFilters({...localFilters, startDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={localFilters.endDate || ''}
              onChange={(e) => setLocalFilters({...localFilters, endDate: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="integrationKey">Integration Key</Label>
          <Input
            id="integrationKey"
            placeholder="Integration key..."
            value={localFilters.integrationKey || ''}
            onChange={(e) => setLocalFilters({...localFilters, integrationKey: e.target.value})}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setLocalFilters({})}
          >
            Clear All
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

const RecentTransactions = ({ data = [], onRefresh, isLoading = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [filters, setFilters] = useState({});
  const [quickSearch, setQuickSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (sortConfig.key === 'timestamp') {
          const aDate = new Date(a[sortConfig.key]);
          const bDate = new Date(b[sortConfig.key]);
          return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
        }
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      // Quick search
      if (quickSearch) {
        const searchLower = quickSearch.toLowerCase();
        if (!item.interfaceName.toLowerCase().includes(searchLower) &&
            !item.integrationKey.toLowerCase().includes(searchLower) &&
            !item.message.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Advanced filters
      if (filters.status && item.status !== filters.status) return false;
      if (filters.interfaceName && !item.interfaceName.toLowerCase().includes(filters.interfaceName.toLowerCase())) return false;
      if (filters.integrationKey && !item.integrationKey.toLowerCase().includes(filters.integrationKey.toLowerCase())) return false;
      
      if (filters.startDate || filters.endDate) {
        const itemDate = new Date(item.timestamp);
        if (filters.startDate && itemDate < new Date(filters.startDate)) return false;
        if (filters.endDate && itemDate > new Date(filters.endDate)) return false;
      }

      return true;
    });
  }, [sortedData, quickSearch, filters]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    }
    return null;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Interface Execution Logs</h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-48"
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <AdvancedFilters 
              filters={filters} 
              setFilters={setFilters}
              onApply={() => setCurrentPage(1)}
            />
          </Dialog>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-4">
        Showing {paginatedData.length} of {filteredData.length} results
        {filteredData.length !== data.length && ` (filtered from ${data.length} total)`}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  {getSortIcon('timestamp')}
                </div>
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('interfaceName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Interface Name</span>
                  {getSortIcon('interfaceName')}
                </div>
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('integrationKey')}
              >
                <div className="flex items-center space-x-1">
                  <span>Integration Key</span>
                  {getSortIcon('integrationKey')}
                </div>
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="text-left p-3">Message</th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center space-x-1">
                  <span>Duration</span>
                  {getSortIcon('duration')}
                </div>
              </th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((log) => (
              <tr 
                key={log.id} 
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-3 text-sm">
                  {formatTimestamp(log.timestamp)}
                </td>
                <td className="p-3">
                  <div className="font-medium text-sm">{log.interfaceName}</div>
                  <div className="text-xs text-muted-foreground">
                    {log.recordsProcessed?.toLocaleString()} records
                  </div>
                </td>
                <td className="p-3">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {log.integrationKey}
                  </code>
                </td>
                <td className="p-3">
                  <StatusBadge status={log.status} />
                </td>
                <td className="p-3 max-w-xs">
                  <div className="text-sm truncate" title={log.message}>
                    {log.message}
                  </div>
                </td>
                <td className="p-3 text-sm">
                  {log.duration}s
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecentTransactions;