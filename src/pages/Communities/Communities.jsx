import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useCommunitiesStore } from '../../stores/useStore';

const { 
  FiPlus, FiUsers, FiSearch, FiFilter, FiGrid, 
  FiList, FiTrendingUp, FiLock, FiGlobe
} = FiIcons;

const Communities = () => {
  const { communities, setCommunities } = useCommunitiesStore();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Demo communities data
  useEffect(() => {
    const demoCommunitiesData = [
      {
        id: 1,
        name: 'React Developers',
        description: 'A community for React developers to share knowledge and best practices.',
        members: 1234,
        isPrivate: false,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
        owner: 'John Doe',
        joined: true,
        activity: 'Very Active',
      },
      {
        id: 2,
        name: 'Web Development Bootcamp',
        description: 'Learn full-stack web development from scratch with hands-on projects.',
        members: 856,
        isPrivate: true,
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=200&fit=crop',
        owner: 'Sarah Wilson',
        joined: true,
        activity: 'Active',
      },
      {
        id: 3,
        name: 'Programming Hub',
        description: 'General programming discussions, career advice, and code reviews.',
        members: 2103,
        isPrivate: false,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
        owner: 'Mike Johnson',
        joined: false,
        activity: 'Very Active',
      },
      {
        id: 4,
        name: 'UI/UX Design Masters',
        description: 'Master the art of user interface and user experience design.',
        members: 678,
        isPrivate: false,
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
        owner: 'Emily Chen',
        joined: false,
        activity: 'Moderate',
      },
      {
        id: 5,
        name: 'Digital Marketing Pro',
        description: 'Advanced strategies for digital marketing and growth hacking.',
        members: 543,
        isPrivate: true,
        category: 'Marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
        owner: 'David Brown',
        joined: false,
        activity: 'Active',
      },
      {
        id: 6,
        name: 'Data Science Academy',
        description: 'Learn data science, machine learning, and artificial intelligence.',
        members: 1876,
        isPrivate: false,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
        owner: 'Lisa Zhang',
        joined: true,
        activity: 'Very Active',
      },
    ];

    setCommunities(demoCommunitiesData);
  }, [setCommunities]);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'joined') return matchesSearch && community.joined;
    if (filterBy === 'public') return matchesSearch && !community.isPrivate;
    if (filterBy === 'private') return matchesSearch && community.isPrivate;
    
    return matchesSearch;
  });

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'Very Active': return 'text-green-600 bg-green-100';
      case 'Active': return 'text-blue-600 bg-blue-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Communities
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and join learning communities that match your interests.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-0"
        >
          <Link to="/app/communities/create">
            <Button>
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Create Community
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="flex-1 relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-4">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Communities</option>
            <option value="joined">My Communities</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          {/* View Mode Toggle */}
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
      </motion.div>

      {/* Communities Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCommunities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {viewMode === 'grid' ? (
                <Card hover className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      {community.isPrivate ? (
                        <div className="p-2 bg-black/50 rounded-lg">
                          <SafeIcon icon={FiLock} className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="p-2 bg-black/50 rounded-lg">
                          <SafeIcon icon={FiGlobe} className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {community.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(community.activity)}`}>
                        {community.activity}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {community.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                        {community.members.toLocaleString()} members
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {community.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        by {community.owner}
                      </span>
                      <Link to={`/app/communities/${community.id}`}>
                        <Button size="sm" variant={community.joined ? 'outline' : 'primary'}>
                          {community.joined ? 'View' : 'Join'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card hover className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {community.name}
                        </h3>
                        {community.isPrivate ? (
                          <SafeIcon icon={FiLock} className="w-4 h-4 text-gray-400" />
                        ) : (
                          <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(community.activity)}`}>
                          {community.activity}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {community.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                          {community.members.toLocaleString()} members
                        </div>
                        <span>{community.category}</span>
                        <span>by {community.owner}</span>
                      </div>
                    </div>
                    
                    <Link to={`/app/communities/${community.id}`}>
                      <Button variant={community.joined ? 'outline' : 'primary'}>
                        {community.joined ? 'View' : 'Join'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCommunities.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <SafeIcon icon={FiUsers} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No communities found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filters, or create a new community.
          </p>
          <Link to="/app/communities/create">
            <Button>
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Create Community
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Communities;