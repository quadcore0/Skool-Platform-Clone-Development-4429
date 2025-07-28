import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  UserPlusIcon, 
  TrashIcon,
  UsersIcon,
  CogIcon,
  FolderIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { selectWorkspace } from '../../store/slices/workspaceSlice';

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workspaces, selectedWorkspace } = useSelector((state) => state.workspaces);
  const [workspace, setWorkspace] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // If we already have the selected workspace and it matches the URL parameter
    if (selectedWorkspace && selectedWorkspace.id === workspaceId) {
      setWorkspace(selectedWorkspace);
      setLoading(false);
      return;
    }
    
    // Otherwise, find the workspace in the workspaces array
    const foundWorkspace = workspaces.find(w => w.id === workspaceId);
    if (foundWorkspace) {
      dispatch(selectWorkspace(foundWorkspace));
      setWorkspace(foundWorkspace);
    } else {
      // Handle workspace not found
      console.error('Workspace not found');
      // You might want to redirect to a 404 page or back to workspaces list
    }
    
    setLoading(false);
  }, [workspaceId, workspaces, selectedWorkspace, dispatch]);

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

  if (loading || !workspace) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Mock data for demo purposes
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', lastActive: '2023-06-15T10:30:00Z' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', lastActive: '2023-06-14T08:45:00Z' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', lastActive: '2023-06-10T14:20:00Z' },
  ];

  const mockProjects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', members: 5, lastUpdated: '2023-06-14T10:30:00Z' },
    { id: 2, name: 'Mobile App', status: 'Completed', members: 3, lastUpdated: '2023-06-10T16:45:00Z' },
    { id: 3, name: 'Marketing Campaign', status: 'Planning', members: 2, lastUpdated: '2023-06-12T09:15:00Z' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/workspaces')}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{workspace.name}</h1>
          {getStatusBadge(workspace.status)}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            icon={<PencilIcon className="w-4 h-4 mr-1" />}
            onClick={() => navigate(`/workspaces/${workspace.id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/10"
            icon={<TrashIcon className="w-4 h-4 mr-1" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workspace Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workspace Info</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                  <p className="text-gray-900 dark:text-white mt-1">{workspace.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</h3>
                  <p className="text-gray-900 dark:text-white mt-1">{workspace.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</h3>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {new Date(workspace.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {new Date(workspace.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Usage Stats */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Storage</span>
                    <span className="text-gray-900 dark:text-white">
                      {workspace.storageUsed} / {workspace.storageLimit} MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(workspace.storageUsed / workspace.storageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Users</span>
                    <span className="text-gray-900 dark:text-white">
                      {workspace.usersCount} users
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Projects</span>
                    <span className="text-gray-900 dark:text-white">
                      {mockProjects.length} projects
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Owner Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Owner</h2>
              
              <div className="flex items-center">
                <img 
                  src={workspace.owner.avatar} 
                  alt={workspace.owner.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {workspace.owner.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {workspace.owner.email}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm" className="w-full">
                  Transfer Ownership
                </Button>
              </div>
            </Card>
          </div>

          {/* Activity & Recent Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <UsersIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">Jane Smith</span> joined the workspace
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      2 days ago
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <FolderIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">John Doe</span> created a new project
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      3 days ago
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <CogIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">System</span> updated workspace settings
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      5 days ago
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  View All Activity
                </button>
              </div>
            </Card>

            {/* Recent Members */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Members ({workspace.usersCount})</h2>
                <Button 
                  size="sm" 
                  variant="outline"
                  icon={<UserPlusIcon className="w-4 h-4 mr-1" />}
                  onClick={() => setActiveTab('members')}
                >
                  Invite
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Badge className="capitalize">{user.role}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button 
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => setActiveTab('members')}
                >
                  View All Members
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Members</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage workspace members and their permissions</p>
            </div>
            <Button 
              icon={<UserPlusIcon className="w-4 h-4 mr-2" />}
            >
              Invite Member
            </Button>
          </div>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
                          defaultValue={user.role}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="User">User</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage workspace projects</p>
            </div>
            <Button 
              icon={<PlusIcon className="w-4 h-4 mr-2" />}
            >
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map(project => (
              <Card key={project.id} className="p-6" hover>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <Badge
                    variant={
                      project.status === 'In Progress' ? 'warning' : 
                      project.status === 'Completed' ? 'success' : 'default'
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Members</span>
                    <span className="text-gray-900 dark:text-white">{project.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(project.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Workspace Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage workspace configuration and preferences</p>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="workspace-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  id="workspace-name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={workspace.name}
                />
              </div>
              
              <div>
                <label htmlFor="workspace-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="workspace-description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={workspace.description}
                />
              </div>
              
              <div>
                <label htmlFor="workspace-industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Industry
                </label>
                <select
                  id="workspace-industry"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={workspace.industry}
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Danger Zone</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Archive Workspace</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Archive this workspace and all its data. You can restore it later.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/10">
                  Archive
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Delete Workspace</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete this workspace and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/10">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDetail;