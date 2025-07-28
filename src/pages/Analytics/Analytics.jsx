import React from 'react';
import Card from '../../components/UI/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Monthly revenue data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [4000, 3800, 5200, 6000, 5500, 7000, 8500, 9200, 8700, 9500, 10200, 11000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // User growth data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 150, 180, 250, 300, 380, 420, 480, 550, 600, 650, 700],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Plan distribution data
  const planDistributionData = {
    labels: ['Free', 'Starter', 'Pro', 'Enterprise'],
    datasets: [
      {
        label: 'Users',
        data: [1800, 500, 250, 100],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            2,650
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +12% from last month
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            $85,240
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +8% from last month
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscriptions</h3>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            850
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +5% from last month
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Revenue Per User</h3>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            $32
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +3% from last month
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Revenue" className="p-6">
          <div className="h-80">
            <Line 
              data={revenueData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value}`
                    }
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card title="User Growth" className="p-6">
          <div className="h-80">
            <Bar 
              data={userGrowthData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Plan Distribution" className="p-6">
          <div className="h-60">
            <Pie 
              data={planDistributionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card title="Top Metrics" className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">User Retention</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400">0%</span>
                <span className="text-blue-600 dark:text-blue-400">78%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Conversion Rate</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '23%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400">0%</span>
                <span className="text-green-600 dark:text-green-400">23%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Churn Rate</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400">0%</span>
                <span className="text-red-600 dark:text-red-400">5%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Average Session Duration</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400">0 min</span>
                <span className="text-purple-600 dark:text-purple-400">18 min</span>
                <span className="text-gray-500 dark:text-gray-400">30 min</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;