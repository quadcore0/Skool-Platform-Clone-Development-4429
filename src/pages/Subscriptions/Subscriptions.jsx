import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Table from '../../components/UI/Table';
import { 
  selectSubscription, 
  updateSubscriptionFilters 
} from '../../store/slices/subscriptionSlice';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscriptions, loading, filters, plans } = useSelector((state) => state.subscriptions);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateSubscriptionFilters({ search: searchInput }));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(updateSubscriptionFilters({ [e.target.name]: e.target.value }));
  };

  // Handle subscription row click
  const handleSubscriptionClick = (subscription) => {
    dispatch(selectSubscription(subscription));
    navigate(`/subscriptions/${subscription.id}`);
  };

  // Filter subscriptions based on current filters
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    // Search filter
    const matchesSearch = 
      filters.search === '' || 
      subscription.workspace?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      subscription.user?.email?.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || subscription.status === filters.status;

    // Plan filter
    const matchesPlan = filters.plan === 'all' || subscription.plan === filters.plan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'canceled':
        return <Badge variant="danger">Canceled</Badge>;
      case 'past_due':
        return <Badge variant="warning">Past Due</Badge>;
      case 'trialing':
        return <Badge variant="info">Trial</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Workspace',
      accessor: 'workspace',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {row.workspace?.name || 'N/A'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.user?.email || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      header: 'Plan',
      accessor: 'plan',
      cell: (row) => {
        const plan = plans.find(p => p.id === row.plan) || { name: row.plan };
        return (
          <span className="capitalize font-medium text-gray-900 dark:text-white">
            {plan.name}
          </span>
        );
      },
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">
          ${row.price}/mo
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.startDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Next Invoice',
      accessor: 'nextInvoiceDate',
      cell: (row) => (
        row.nextInvoiceDate ? (
          <span className="text-gray-600 dark:text-gray-400">
            {new Date(row.nextInvoiceDate).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">N/A</span>
        )
      ),
    },
    {
      header: 'Payment Method',
      accessor: 'paymentMethod',
      cell: (row) => (
        <span className="capitalize text-gray-600 dark:text-gray-400">
          {row.paymentMethod.replace('_', ' ')}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
        <Button 
          onClick={() => navigate('/subscriptions/new')}
          icon={<PlusIcon className="w-5 h-5 mr-1" />}
        >
          Add Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Summary Cards */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Subscriptions</h3>
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {subscriptions.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Across all plans
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscriptions</h3>
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {subscriptions.filter(s => s.status === 'active').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Currently active
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</h3>
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            ${subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Recurring monthly
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Past Due</h3>
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {subscriptions.filter(s => s.status === 'past_due').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Require attention
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
                placeholder="Search subscriptions..."
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
                <option value="canceled">Canceled</option>
                <option value="past_due">Past Due</option>
                <option value="trialing">Trial</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Plan:</span>
              <select
                name="plan"
                value={filters.plan}
                onChange={handleFilterChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Plans</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredSubscriptions}
          isLoading={loading}
          onRowClick={handleSubscriptionClick}
          emptyMessage="No subscriptions found. Try adjusting your search or filters."
        />
      </Card>
    </div>
  );
};

export default Subscriptions;