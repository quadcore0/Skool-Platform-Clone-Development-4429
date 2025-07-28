import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Table from '../../components/UI/Table';
import { 
  selectTicket,
  updateTicketFilters
} from '../../store/slices/supportSlice';

const Support = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, loading, filters } = useSelector((state) => state.support);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateTicketFilters({ search: searchInput }));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(updateTicketFilters({ [e.target.name]: e.target.value }));
  };

  // Handle ticket row click
  const handleTicketClick = (ticket) => {
    dispatch(selectTicket(ticket));
    navigate(`/support/${ticket.id}`);
  };

  // Filter tickets based on current filters
  const filteredTickets = tickets.filter((ticket) => {
    // Search filter
    const matchesSearch = 
      filters.search === '' || 
      ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.content.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status;

    // Priority filter
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="warning">Open</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'low':
        return <Badge variant="default">Low</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">#{row.id}</span>
      ),
    },
    {
      header: 'Subject',
      accessor: 'subject',
      cell: (row) => (
        <div className="font-medium text-gray-900 dark:text-white">{row.subject}</div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Priority',
      accessor: 'priority',
      cell: (row) => getPriorityBadge(row.priority),
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: (row) => (
        <span className="capitalize text-gray-600 dark:text-gray-400">
          {row.category.replace('_', ' ')}
        </span>
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
      header: 'Updated',
      accessor: 'updatedAt',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support</h1>
        <Button 
          onClick={() => navigate('/support/new')}
          icon={<PlusIcon className="w-5 h-5 mr-1" />}
        >
          New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Summary Cards */}
        <Card className="p-5">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Tickets</h3>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {tickets.length}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Open Tickets</h3>
          <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {tickets.filter(t => t.status === 'open').length}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">In Progress</h3>
          <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {tickets.filter(t => t.status === 'in_progress').length}
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Resolved</h3>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search tickets..."
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Priority:</span>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredTickets}
          isLoading={loading}
          onRowClick={handleTicketClick}
          emptyMessage="No tickets found. Try adjusting your search or filters."
        />
      </Card>
    </div>
  );
};

export default Support;