import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAppStore } from '../../stores/useStore';

const { 
  FiSearch, FiFilter, FiUsers, FiBookOpen, 
  FiMessageSquare, FiClock, FiTag, FiGrid, FiList, FiUser
} = FiIcons;

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useAppStore();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    communities: [],
    courses: [],
    posts: [],
    users: [],
  });
  
  // Extract query from URL params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      setSearchQuery(q);
      performSearch(q);
    }
  }, [location.search, setSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      navigate(`/app/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  };

  const performSearch = (searchTerm) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock results
      setResults({
        communities: [
          {
            id: 1,
            name: 'React Developers',
            description: 'A community for React developers to share knowledge and best practices.',
            members: 1234,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            category: 'Technology',
          },
          {
            id: 2,
            name: 'JavaScript Enthusiasts',
            description: 'For JavaScript lovers - from beginners to experts. Share tips, ask questions, and grow together.',
            members: 2345,
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
            category: 'Programming',
          },
        ],
        courses: [
          {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the basics of React, including components, props, state, and hooks.',
            instructor: 'John Doe',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            duration: '4 hours',
            level: 'Beginner',
          },
          {
            id: 2,
            title: 'Advanced React Patterns',
            description: 'Master advanced React patterns like render props, compound components, and more.',
            instructor: 'Sarah Wilson',
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
            duration: '6 hours',
            level: 'Advanced',
          },
        ],
        posts: [
          {
            id: 1,
            title: 'How to optimize React components for better performance',
            content: 'In this post, I share techniques for optimizing React components to improve performance...',
            author: {
              name: 'Emily Chen',
              avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            },
            community: 'React Developers',
            createdAt: '2023-06-15T10:30:00Z',
            comments: 12,
          },
          {
            id: 2,
            title: 'Understanding React useEffect hook',
            content: 'The useEffect hook is one of the most powerful and commonly used hooks in React...',
            author: {
              name: 'Mike Johnson',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            community: 'JavaScript Enthusiasts',
            createdAt: '2023-06-10T14:15:00Z',
            comments: 8,
          },
        ],
        users: [
          {
            id: 101,
            name: 'Sarah Wilson',
            username: 'sarahw',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            bio: 'Frontend developer specializing in React',
          },
          {
            id: 102,
            name: 'John Doe',
            username: 'johndoe',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            bio: 'Full-stack developer and instructor',
          },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter results based on active tab
  const filteredResults = activeTab === 'all' 
    ? results 
    : { [activeTab]: results[activeTab], communities: [], courses: [], posts: [], users: [] };

  // Calculate total results
  const totalResults = 
    results.communities.length + 
    results.courses.length + 
    results.posts.length + 
    results.users.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Search
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search for communities, courses, posts, or users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Search
            </button>
          </form>
        </motion.div>
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <>
          {/* Tabs and View Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex overflow-x-auto space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All Results ({totalResults})
              </button>
              <button
                onClick={() => setActiveTab('communities')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'communities'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2 inline-block" />
                Communities ({results.communities.length})
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'courses'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SafeIcon icon={FiBookOpen} className="w-4 h-4 mr-2 inline-block" />
                Courses ({results.courses.length})
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'posts'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2 inline-block" />
                Posts ({results.posts.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SafeIcon icon={FiUser} className="w-4 h-4 mr-2 inline-block" />
                Users ({results.users.length})
              </button>
            </div>
            
            <div className="flex items-center">
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
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16">
              <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We could not find anything matching your search for "{searchQuery}".
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Try using different keywords or check for typos.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Communities Results */}
              {(activeTab === 'all' || activeTab === 'communities') && filteredResults.communities.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Communities
                    </h2>
                    {activeTab === 'all' && filteredResults.communities.length > 2 && (
                      <button 
                        onClick={() => setActiveTab('communities')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View all ({filteredResults.communities.length})
                      </button>
                    )}
                  </div>
                  
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {(activeTab === 'all' ? filteredResults.communities.slice(0, 3) : filteredResults.communities).map((community) => (
                      <Card 
                        key={community.id} 
                        hover
                        className={viewMode === 'grid' ? 'overflow-hidden' : 'p-4'}
                      >
                        {viewMode === 'grid' ? (
                          <>
                            <div className="relative">
                              <img 
                                src={community.image} 
                                alt={community.name} 
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="p-5">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {community.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {community.members.toLocaleString()} members
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                  {community.category}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <img 
                              src={community.image} 
                              alt={community.name} 
                              className="w-20 h-20 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {community.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                                  {community.members.toLocaleString()} members
                                </div>
                                <span>{community.category}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Join
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {(activeTab === 'all' || activeTab === 'courses') && filteredResults.courses.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Courses
                    </h2>
                    {activeTab === 'all' && filteredResults.courses.length > 2 && (
                      <button 
                        onClick={() => setActiveTab('courses')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View all ({filteredResults.courses.length})
                      </button>
                    )}
                  </div>
                  
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {(activeTab === 'all' ? filteredResults.courses.slice(0, 3) : filteredResults.courses).map((course) => (
                      <Card 
                        key={course.id} 
                        hover
                        className={viewMode === 'grid' ? 'overflow-hidden' : 'p-4'}
                      >
                        {viewMode === 'grid' ? (
                          <>
                            <div className="relative">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="p-5">
                              <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300">
                                  {course.level}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {course.duration}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {course.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {course.description}
                              </p>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                By {course.instructor}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-20 h-20 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
                                  {course.title}
                                </h3>
                                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300">
                                  {course.level}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                                {course.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>By {course.instructor}</span>
                                <div className="flex items-center">
                                  <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                                  {course.duration}
                                </div>
                              </div>
                            </div>
                            <Button size="sm">
                              View
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {(activeTab === 'all' || activeTab === 'posts') && filteredResults.posts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Forum Posts
                    </h2>
                    {activeTab === 'all' && filteredResults.posts.length > 2 && (
                      <button 
                        onClick={() => setActiveTab('posts')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View all ({filteredResults.posts.length})
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {(activeTab === 'all' ? filteredResults.posts.slice(0, 3) : filteredResults.posts).map((post) => (
                      <Card 
                        key={post.id} 
                        hover
                        className="p-5"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                                {post.author.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                in {post.community}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                                {formatDate(post.createdAt)}
                              </div>
                              <div className="flex items-center">
                                <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-1" />
                                {post.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Results */}
              {(activeTab === 'all' || activeTab === 'users') && filteredResults.users.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Users
                    </h2>
                    {activeTab === 'all' && filteredResults.users.length > 2 && (
                      <button 
                        onClick={() => setActiveTab('users')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View all ({filteredResults.users.length})
                      </button>
                    )}
                  </div>
                  
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {(activeTab === 'all' ? filteredResults.users.slice(0, 3) : filteredResults.users).map((user) => (
                      <Card 
                        key={user.id} 
                        hover
                        className="p-5"
                      >
                        <div className="flex items-center">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-16 h-16 rounded-full mr-4"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              @{user.username}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                              {user.bio}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <SafeIcon icon={FiSearch} className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search for content
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Enter keywords to search for communities, courses, posts, or users.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;