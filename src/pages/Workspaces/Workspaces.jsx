import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Table from '../../components/UI/Table';
import { selectWorkspace, updateWorkspaceFilters } from '../../store/slices/workspaceSlice';

const Workspaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workspaces, loading, filters } = useSelector((state) => state.workspaces);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateWorkspaceFilters({ search: searchInput }));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(updateWorkspaceFilters({ [e.target.name]: e.target.value }));
  };

  // Handle workspace row click
  const handleWorkspaceClick = (workspace) => {
    dispatch(selectWorkspace(workspace));
    navigate(`/workspaces/${workspace.id}`);
  };

  // Filter workspaces based on current filters
  const filteredWorkspaces = workspaces.filter((workspace) => {
    // Search filter
    const matchesSearch = 
      filters.search === '' || 
      workspace.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      workspace.description.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || workspace.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'archived':
        return <Badge variant="danger">Archived</Badge>;
      case 'trial':
        return <Badge variant="warning">Trial</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Workspace',
      accessor: 'name',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.industry}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Users',
      accessor: 'usersCount',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">{row.usersCount}</span>
      ),
    },
    {
      header: 'Storage',
      accessor: 'storageUsed',
      cell: (row) => (
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs mb-1">
            <span>{row.storageUsed} MB</span>
            <span>{row.storageLimit} MB</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(100, (row.storageUsed / row.storageLimit) * 100)}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      header: 'Owner',
      accessor: 'owner',
      cell: (row) => (
        <div className="flex items-center">
          <img 
            src={row.owner?.avatar} 
            alt={row.owner?.name} 
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-gray-600 dark:text-gray-400">{row.owner?.name}</span>
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workspaces</h1>
        <Button 
          onClick={() => navigate('/workspaces/new')}
          icon={<PlusIcon className="w-5 h-5 mr-1" />}
        >
          Create Workspace
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search workspaces..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex items-center">
            <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Status:</span>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredWorkspaces}
          isLoading={loading}
          onRowClick={handleWorkspaceClick}
          emptyMessage="No workspaces found. Try adjusting your search or filters."
        />
      </Card>
    </div>
  );
};

export default Workspaces;