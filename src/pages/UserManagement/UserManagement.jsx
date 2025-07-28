import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Table from '../../components/UI/Table';
import { selectUser, updateUserFilters } from '../../store/slices/userSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, filters } = useSelector((state) => state.users);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateUserFilters({ search: searchInput }));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(updateUserFilters({ [e.target.name]: e.target.value }));
  };

  // Handle user row click
  const handleUserClick = (user) => {
    dispatch(selectUser(user));
    navigate(`/users/${user.id}`);
  };

  // Filter users based on current filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch = 
      filters.search === '' || 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) || 
      user.email.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || user.status === filters.status;

    // Role filter
    const matchesRole = filters.role === 'all' || user.role === filters.role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Table columns
  const columns = [
    {
      header: 'User',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center">
          <img 
            src={row.avatar} 
            alt={row.name} 
            className="w-8 h-8 rounded-full mr-3 object-cover border border-gray-200 dark:border-gray-700" 
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      cell: (row) => {
        let badgeColor = 'default';
        if (row.role === 'admin') badgeColor = 'danger';
        else if (row.role === 'manager') badgeColor = 'warning';
        
        return (
          <Badge variant={badgeColor} className="capitalize">
            {row.role}
          </Badge>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        let badgeColor = 'default';
        if (row.status === 'active') badgeColor = 'success';
        else if (row.status === 'inactive') badgeColor = 'danger';
        else if (row.status === 'pending') badgeColor = 'warning';
        
        return (
          <Badge variant={badgeColor} className="capitalize">
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: 'Workspaces',
      accessor: 'workspaces',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">{row.workspaces}</span>
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
    {
      header: 'Last Login',
      accessor: 'lastLoginAt',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.lastLoginAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${row.id}/edit`);
            }}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add delete confirmation logic here
            }}
            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <Button 
          onClick={() => navigate('/users/new')}
          icon={<PlusIcon className="w-5 h-5 mr-1" />}
        >
          Add User
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
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
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Role:</span>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredUsers}
          isLoading={loading}
          onRowClick={handleUserClick}
          emptyMessage="No users found. Try adjusting your search or filters."
        />
      </Card>
    </div>
  );
};

export default UserManagement;