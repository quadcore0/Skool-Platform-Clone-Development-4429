import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  CreditCardIcon,
  BoltIcon,
  ServerIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Demo data for charts
const monthlyRevenue = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 7000 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 8000 },
  { name: 'Jul', value: 10000 },
];

const userGrowth = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1400 },
  { name: 'Mar', value: 1600 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 2200 },
  { name: 'Jun', value: 2600 },
  { name: 'Jul', value: 3000 },
];

const apiUsage = [
  { name: 'Mon', value: 5000 },
  { name: 'Tue', value: 4800 },
  { name: 'Wed', value: 6000 },
  { name: 'Thu', value: 7500 },
  { name: 'Fri', value: 8000 },
  { name: 'Sat', value: 4500 },
  { name: 'Sun', value: 3500 },
];

const subscriptionData = [
  { name: 'Free', value: 400 },
  { name: 'Starter', value: 300 },
  { name: 'Pro', value: 200 },
  { name: 'Enterprise', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const { workspaces } = useSelector((state) => state.workspaces);
  const { tickets } = useSelector((state) => state.support);
  
  const activeUsers = users.filter(u => u.status === 'active').length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
  
  // Calculate MRR (Monthly Recurring Revenue)
  const mrr = subscriptions
    .filter(s => s.status === 'active')
    .reduce((total, sub) => total + sub.price, 0);

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg px-6 py-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Admin'}</h1>
        <p className="mb-4">Here's what's happening with your platform today.</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="border-white text-white hover:bg-white/20">
            View Reports
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/20">
            Invite Team
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-blue-100">
            <UsersIcon className="w-12 h-12 opacity-20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">{activeUsers}</p>
              <Badge variant="success" className="ml-2">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                12%
              </Badge>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Compared to last month
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-green-100">
            <CurrencyDollarIcon className="w-12 h-12 opacity-20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</p>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">${mrr}</p>
              <Badge variant="success" className="ml-2">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                8%
              </Badge>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Compared to last month
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-purple-100">
            <CreditCardIcon className="w-12 h-12 opacity-20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscriptions</p>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">{activeSubscriptions}</p>
              <Badge variant="success" className="ml-2">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                5%
              </Badge>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Compared to last month
            </p>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-amber-100">
            <ServerIcon className="w-12 h-12 opacity-20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">API Requests</p>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">2.4M</p>
              <Badge variant="warning" className="ml-2">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                18%
              </Badge>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Compared to last month
            </p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card title="Monthly Revenue" subtitle="Revenue trend over the past 7 months">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyRevenue}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Growth Chart */}
        <Card title="User Growth" subtitle="New user signups over time">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userGrowth}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Usage */}
        <Card title="API Usage" subtitle="Daily API request volume">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={apiUsage}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Subscription Distribution */}
        <Card title="Subscription Plans" subtitle="Distribution of active subscriptions">
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* System Health */}
        <Card title="System Health" subtitle="Current system status">
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">API Services</span>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Database</span>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Authentication</span>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BoltIcon className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Background Jobs</span>
              </div>
              <Badge variant="warning">Degraded</Badge>
            </div>
            <div className="mt-4">
              <Link to="/system-status">
                <Button variant="outline" size="sm" className="w-full">
                  View System Status
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent activity and tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card title="Recent Activity" subtitle="Latest platform events">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-3 px-4 flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New user registered
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  John Smith created a new account
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                5m ago
              </div>
            </div>
            <div className="py-3 px-4 flex items-start">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                <CreditCardIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New subscription
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Acme Inc. upgraded to Pro plan
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                15m ago
              </div>
            </div>
            <div className="py-3 px-4 flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full mr-3">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New support ticket
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  API integration issue reported
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                42m ago
              </div>
            </div>
            <div className="py-3 px-4 flex items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-full mr-3">
                <ServerIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  API rate limit reached
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Customer XYZ exceeded their API quota
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                1h ago
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" className="w-full">
              View All Activity
            </Button>
          </div>
        </Card>

        {/* Quick Tasks */}
        <Card title="Quick Tasks" subtitle="Things that need your attention">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full mr-3">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {openTickets} support tickets to resolve
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    3 high priority tickets
                  </p>
                </div>
              </div>
              <Link to="/support">
                <Button size="xs">View</Button>
              </Link>
            </div>
            <div className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-full mr-3">
                  <CreditCardIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    2 failed payments to review
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Payment method issues
                  </p>
                </div>
              </div>
              <Link to="/subscriptions">
                <Button size="xs">View</Button>
              </Link>
            </div>
            <div className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                  <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    5 new users to approve
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Pending account verifications
                  </p>
                </div>
              </div>
              <Link to="/users">
                <Button size="xs">View</Button>
              </Link>
            </div>
            <div className="py-3 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                  <ServerIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    System update available
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Version 2.4.0 ready to install
                  </p>
                </div>
              </div>
              <Button size="xs">Update</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;