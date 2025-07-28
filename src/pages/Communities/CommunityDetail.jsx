import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { useCommunitiesStore } from '../../stores/useStore';

const { 
  FiUsers, FiBookOpen, FiMessageSquare, FiCalendar, 
  FiInfo, FiSettings, FiLock, FiGlobe, FiUserPlus,
  FiTrendingUp, FiAward, FiActivity
} = FiIcons;

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { communities, setCurrentCommunity } = useCommunitiesStore();
  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Demo data
  const memberStats = {
    total: 1234,
    active: 876,
    new: 42
  };

  const courseStats = {
    total: 8,
    completed: 256,
    inProgress: 189
  };

  const forumStats = {
    posts: 124,
    comments: 856,
    engagement: '87%'
  };

  useEffect(() => {
    // In a real app, we would fetch community details from the API
    setLoading(true);
    const foundCommunity = communities.find(c => c.id === parseInt(id));
    
    if (foundCommunity) {
      setCommunity(foundCommunity);
      setCurrentCommunity(foundCommunity);
    } else {
      // Demo community for when the ID doesn't match any in the store
      setCommunity({
        id: parseInt(id),
        name: 'React Developers',
        description: 'A community for React developers to share knowledge and best practices.',
        members: 1234,
        isPrivate: false,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=300&fit=crop',
        owner: 'John Doe',
        joined: true,
        activity: 'Very Active',
      });
    }
    
    setLoading(false);
  }, [id, communities, setCurrentCommunity]);

  if (loading || !community) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'courses', label: 'Courses', icon: FiBookOpen },
    { id: 'forum', label: 'Forum', icon: FiMessageSquare },
    { id: 'events', label: 'Events', icon: FiCalendar },
    { id: 'members', label: 'Members', icon: FiUsers },
    { id: 'settings', label: 'Settings', icon: FiSettings, admin: true },
  ];

  return (
    <div className="min-h-full">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gray-900">
        <img 
          src={community.image} 
          alt={community.name} 
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold mr-2">{community.name}</h1>
                {community.isPrivate ? (
                  <SafeIcon icon={FiLock} className="w-5 h-5" />
                ) : (
                  <SafeIcon icon={FiGlobe} className="w-5 h-5" />
                )}
              </div>
              <p className="text-gray-200 max-w-2xl">{community.description}</p>
            </div>
            
            <div className="flex space-x-3">
              {community.joined ? (
                <Button>
                  <SafeIcon icon={FiUserPlus} className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              ) : (
                <Button>
                  Join Community
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Stats Cards */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Members
                </h3>
                <SafeIcon icon={FiUsers} className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Total Members</span>
                <span className="font-semibold">{memberStats.total}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Active Members</span>
                <span className="font-semibold">{memberStats.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">New This Month</span>
                <span className="font-semibold">{memberStats.new}</span>
              </div>
              <div className="mt-4">
                <Link to={`/app/communities/${community.id}/members`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all members
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Courses
                </h3>
                <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Total Courses</span>
                <span className="font-semibold">{courseStats.total}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Completions</span>
                <span className="font-semibold">{courseStats.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                <span className="font-semibold">{courseStats.inProgress}</span>
              </div>
              <div className="mt-4">
                <Link to={`/app/communities/${community.id}/courses`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Browse courses
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Forum Activity
                </h3>
                <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                <span className="font-semibold">{forumStats.posts}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Comments</span>
                <span className="font-semibold">{forumStats.comments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Engagement Rate</span>
                <span className="font-semibold">{forumStats.engagement}</span>
              </div>
              <div className="mt-4">
                <Link to={`/app/communities/${community.id}/forum`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Join discussions
                </Link>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
                <SafeIcon icon={FiActivity} className="w-5 h-5 text-primary-500" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <SafeIcon icon={FiAward} className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      New milestone achieved: 1000+ members!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Today
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <SafeIcon icon={FiBookOpen} className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      New course: "Advanced React Patterns" is now available
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Yesterday
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Hot discussion: "Best State Management in 2023"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      2 days ago
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2" />
                  View All Activity
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'courses' && (
          <div className="text-center py-10">
            <SafeIcon icon={FiBookOpen} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Browse Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Explore all courses and learning materials in this community.
            </p>
            <Button
              onClick={() => navigate(`/app/communities/${community.id}/courses`)}
            >
              <SafeIcon icon={FiBookOpen} className="w-4 h-4 mr-2" />
              View All Courses
            </Button>
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="text-center py-10">
            <SafeIcon icon={FiMessageSquare} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Community Forum
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Join discussions, ask questions, and share your knowledge.
            </p>
            <Button
              onClick={() => navigate(`/app/communities/${community.id}/forum`)}
            >
              <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2" />
              Browse Forum
            </Button>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="text-center py-10">
            <SafeIcon icon={FiCalendar} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Upcoming Events
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Discover upcoming live sessions, workshops, and community events.
            </p>
            <Button
              onClick={() => navigate(`/app/communities/${community.id}/events`)}
            >
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
              View All Events
            </Button>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="text-center py-10">
            <SafeIcon icon={FiUsers} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Community Members
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Connect with other members and grow your network.
            </p>
            <Button
              onClick={() => navigate(`/app/communities/${community.id}/members`)}
            >
              <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
              View All Members
            </Button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-10">
            <SafeIcon icon={FiSettings} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Community Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Manage your community settings, permissions, and integrations.
            </p>
            <Button
              onClick={() => navigate(`/app/communities/${community.id}/settings`)}
            >
              <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
              Manage Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;