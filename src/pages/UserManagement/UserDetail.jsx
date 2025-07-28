import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  KeyIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  XCircleIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { selectUser } from '../../store/slices/userSlice';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, selectedUser } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // If we already have the selected user and it matches the URL parameter
    if (selectedUser && selectedUser.id === userId) {
      setUser(selectedUser);
      setLoading(false);
      return;
    }
    
    // Otherwise, find the user in the users array
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      dispatch(selectUser(foundUser));
      setUser(foundUser);
    } else {
      // Handle user not found
      console.error('User not found');
      // You might want to redirect to a 404 page or back to users list
    }
    
    setLoading(false);
  }, [userId, users, selectedUser, dispatch]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/users')}
          icon={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Back to Users
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <div className="mt-2">
              <Badge variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'} className="capitalize">
                {user.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Role</span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Member Since</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Last Active</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(user.lastLoginAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Workspaces</span>
              <span className="font-medium text-gray-900 dark:text-white">{user.workspaces}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              icon={<PencilIcon className="w-4 h-4 mr-2" />}
              onClick={() => navigate(`/users/${user.id}/edit`)}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              icon={<KeyIcon className="w-4 h-4 mr-2" />}
            >
              Reset Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/10"
              icon={<TrashIcon className="w-4 h-4 mr-2" />}
            >
              Delete Account
            </Button>
          </div>
        </Card>

        {/* User Details and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</h4>
                <p className="text-gray-900 dark:text-white">{user.firstName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</h4>
                <p className="text-gray-900 dark:text-white">{user.lastName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</h4>
                <p className="text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Role</h4>
                <p className="text-gray-900 dark:text-white capitalize">{user.role}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</h4>
                <div className="flex items-center">
                  {user.status === 'active' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className="text-gray-900 dark:text-white capitalize">{user.status}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Joined Date</h4>
                <p className="text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* User Workspaces */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workspaces</h3>
              <Button size="sm" variant="outline">Manage Access</Button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Workspace</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Mock data for demo */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Product Team</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="primary" className="capitalize">Admin</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Marketing</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default" className="capitalize">Member</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {/* Mock activity data */}
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <KeyIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Logged in from <span className="font-medium">192.168.1.1</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(user.lastLoginAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <PencilIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Updated profile information
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;