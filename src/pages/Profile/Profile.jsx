import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

const { 
  FiUser, FiMail, FiCalendar, FiMapPin, FiLink, FiEdit,
  FiBookOpen, FiMessageSquare, FiAward, FiTrendingUp,
  FiGrid, FiList, FiMessageCircle, FiUsers, FiThumbsUp
} = FiIcons;

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState('grid');

  const isOwnProfile = user?.id === userId;

  useEffect(() => {
    setLoading(true);
    
    // In a real app, we would fetch the user profile from the API
    setTimeout(() => {
      setProfile({
        id: userId,
        name: isOwnProfile ? 'Your Name' : 'John Doe',
        username: isOwnProfile ? 'yourname' : 'johndoe',
        email: isOwnProfile ? user?.email : 'john.doe@example.com',
        avatar: `https://randomuser.me/api/portraits/${isOwnProfile ? 'lego/1' : 'men/41'}.jpg`,
        bio: 'Full-stack developer passionate about React, Node.js, and building intuitive user experiences. I love sharing knowledge and helping others learn to code.',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        joinedDate: '2022-03-15T00:00:00Z',
        stats: {
          posts: 42,
          communities: 8,
          followers: 156,
          following: 98,
        },
        badges: [
          { id: 1, name: 'Top Contributor', icon: FiAward },
          { id: 2, name: 'Course Creator', icon: FiBookOpen },
          { id: 3, name: 'Community Builder', icon: FiUsers },
        ],
        communities: [
          { id: 1, name: 'React Developers', role: 'Member' },
          { id: 2, name: 'JavaScript Enthusiasts', role: 'Moderator' },
          { id: 3, name: 'Web Development', role: 'Admin' },
        ],
        recentActivities: [
          { 
            id: 1, 
            type: 'post', 
            title: 'How to optimize React components for better performance',
            community: 'React Developers',
            timestamp: '2023-06-10T14:32:00Z',
            likes: 24,
            comments: 8,
          },
          { 
            id: 2, 
            type: 'course_completion', 
            title: 'Completed "Advanced JavaScript Patterns"',
            community: 'JavaScript Enthusiasts',
            timestamp: '2023-06-05T10:15:00Z',
          },
          { 
            id: 3, 
            type: 'comment', 
            title: 'Commented on "Best practices for state management"',
            community: 'React Developers',
            timestamp: '2023-06-03T09:45:00Z',
            content: 'I prefer using Redux for large applications because it provides a predictable state container and makes debugging easier with time-travel.',
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [userId, isOwnProfile, user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'post':
        return FiMessageSquare;
      case 'course_completion':
        return FiBookOpen;
      case 'comment':
        return FiMessageCircle;
      default:
        return FiMessageSquare;
    }
  };

  if (loading || !profile) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Avatar */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover" 
                />
                {isOwnProfile && (
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    @{profile.username}
                  </p>
                </div>
                
                {isOwnProfile ? (
                  <Link to="/app/settings">
                    <Button variant="outline">
                      <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <Button>
                    <SafeIcon icon={FiIcons.FiUserPlus} className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {profile.bio}
              </p>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center mr-4 mb-2">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-1" />
                  <span>{profile.email}</span>
                </div>
                
                {profile.location && (
                  <div className="flex items-center mr-4 mb-2">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                {profile.website && (
                  <div className="flex items-center mr-4 mb-2">
                    <SafeIcon icon={FiLink} className="w-4 h-4 mr-1" />
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {profile.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center mb-2">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                  <span>Joined {formatDate(profile.joinedDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.stats.posts}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.stats.communities}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.stats.followers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.stats.following}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>
          
          {/* Badges */}
          {profile.badges && profile.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {profile.badges.map(badge => (
                <div 
                  key={badge.id}
                  className="flex items-center px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full"
                >
                  <SafeIcon icon={badge.icon} className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'posts'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2 inline-block" />
            Posts
          </button>
          
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'activity'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2 inline-block" />
            Activity
          </button>
          
          <button
            onClick={() => setActiveTab('communities')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'communities'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2 inline-block" />
            Communities
          </button>
        </div>
      </div>

      {/* View Toggle (for Posts and Communities) */}
      {(activeTab === 'posts' || activeTab === 'communities') && (
        <div className="flex justify-end mb-6">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <SafeIcon icon={FiGrid} className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <SafeIcon icon={FiList} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {profile.recentActivities.filter(a => a.type === 'post').length > 0 ? (
              profile.recentActivities
                .filter(a => a.type === 'post')
                .map(post => (
                  <Card 
                    key={post.id} 
                    hover
                    className="p-5"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        in {post.community}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <SafeIcon icon={FiThumbsUp} className="w-4 h-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <SafeIcon icon={FiMessageCircle} className="w-4 h-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
            ) : (
              <div className="col-span-full text-center py-10">
                <SafeIcon icon={FiMessageSquare} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When you create posts, they will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {profile.recentActivities.length > 0 ? (
              profile.recentActivities.map(activity => (
                <Card key={activity.id} className="p-5">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <SafeIcon 
                        icon={getActivityIcon(activity.type)} 
                        className="w-5 h-5 text-primary-600 dark:text-primary-400" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        in {activity.community}
                      </p>
                      {activity.content && (
                        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm border-l-2 border-gray-200 dark:border-gray-700 pl-3 italic">
                          "{activity.content}"
                        </p>
                      )}
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <SafeIcon icon={FiTrendingUp} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No recent activity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your activity will be tracked and shown here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {profile.communities.length > 0 ? (
              profile.communities.map(community => (
                <Card 
                  key={community.id} 
                  hover
                  className={viewMode === 'grid' ? 'p-6' : 'p-4'}
                >
                  {viewMode === 'grid' ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                        {community.name.charAt(0)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {community.name}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {community.role}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mr-4 flex items-center justify-center text-white text-lg font-bold">
                        {community.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {community.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full mt-1">
                          {community.role}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <SafeIcon icon={FiUsers} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Not a member of any communities
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Join communities to connect with others and learn together.
                </p>
                <Link to="/app/communities">
                  <Button>
                    Explore Communities
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;