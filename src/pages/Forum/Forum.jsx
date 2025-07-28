import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useForumStore } from '../../stores/useStore';

const { 
  FiPlus, FiMessageSquare, FiSearch, FiFilter, 
  FiTag, FiUser, FiClock, FiThumbsUp, FiMessageCircle,
  FiStar, FiTrendingUp, FiBookmark
} = FiIcons;

const Forum = () => {
  const { id: communityId } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts, setLoading } = useForumStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('recent');
  const [tagFilter, setTagFilter] = useState('all');

  // Demo data
  const tags = [
    'All',
    'Question',
    'Discussion',
    'Resource',
    'Announcement',
    'Help',
    'Tutorial',
  ];

  // Demo forum posts data
  useEffect(() => {
    setLoading(true);
    
    const demoPosts = [
      {
        id: 1,
        title: 'How to implement authentication with React and Firebase?',
        content: 'I\'m building a React app and want to implement user authentication with Firebase. What\'s the best approach for this? Should I use the Firebase SDK directly or use a wrapper library?',
        author: {
          id: 101,
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
        createdAt: '2023-06-15T10:30:00Z',
        tags: ['Question', 'Help'],
        likes: 24,
        comments: 8,
        isPinned: true,
        isLocked: false,
        views: 342,
      },
      {
        id: 2,
        title: 'Announcing our new React course: Advanced Patterns',
        content: 'We\'re excited to announce our new course on Advanced React Patterns! In this course, you\'ll learn how to implement complex patterns like compound components, render props, and more.',
        author: {
          id: 102,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          role: 'Admin',
        },
        createdAt: '2023-06-14T15:45:00Z',
        tags: ['Announcement'],
        likes: 56,
        comments: 12,
        isPinned: true,
        isLocked: false,
        views: 789,
      },
      {
        id: 3,
        title: 'Using React Query for API data fetching - My experience',
        content: 'I\'ve been using React Query for managing server state in my React applications for the past few months, and I wanted to share my experience. It\'s been a game-changer for how I handle data fetching, caching, and synchronization.',
        author: {
          id: 103,
          name: 'Emily Chen',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        createdAt: '2023-06-13T09:20:00Z',
        tags: ['Discussion', 'Resource'],
        likes: 37,
        comments: 15,
        isPinned: false,
        isLocked: false,
        views: 456,
      },
      {
        id: 4,
        title: 'Best practices for organizing Redux store in a large application',
        content: 'I\'m working on a large-scale React application with Redux for state management. As the application grows, I\'m finding it harder to keep the Redux store organized. What are some best practices for structuring the store in large applications?',
        author: {
          id: 104,
          name: 'Mike Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        createdAt: '2023-06-12T14:15:00Z',
        tags: ['Question', 'Discussion'],
        likes: 19,
        comments: 23,
        isPinned: false,
        isLocked: false,
        views: 301,
      },
      {
        id: 5,
        title: 'Tutorial: Building a custom hook for form validation',
        content: 'In this tutorial, I\'ll show you how to build a custom React hook for form validation. We\'ll create a reusable hook that can handle different validation rules and provide real-time feedback.',
        author: {
          id: 105,
          name: 'David Brown',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
        createdAt: '2023-06-11T11:10:00Z',
        tags: ['Tutorial', 'Resource'],
        likes: 42,
        comments: 7,
        isPinned: false,
        isLocked: false,
        views: 528,
      },
      {
        id: 6,
        title: 'Community guidelines - Please read before posting',
        content: 'Welcome to our community! Before you start posting, please take a moment to read our community guidelines. We want to ensure that this remains a helpful and respectful place for everyone.',
        author: {
          id: 102,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          role: 'Admin',
        },
        createdAt: '2023-06-10T08:00:00Z',
        tags: ['Announcement'],
        likes: 89,
        comments: 3,
        isPinned: true,
        isLocked: true,
        views: 1254,
      },
    ];

    setPosts(demoPosts);
    setLoading(false);
  }, [setPosts, setLoading]);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = tagFilter === 'all' || post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase());
    
    return matchesSearch && matchesTag;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Always show pinned posts first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then apply the selected sorting
    switch (filterBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b.views - a.views;
      case 'most_liked':
        return b.likes - a.likes;
      case 'most_commented':
        return b.comments - a.comments;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            Community Forum
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join discussions, ask questions, and share your knowledge
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-0"
        >
          <Button onClick={() => navigate(`/app/communities/${communityId}/forum/new`)}>
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search forum posts..."
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
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="most_liked">Most Liked</option>
              <option value="most_commented">Most Commented</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tags Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8 overflow-x-auto"
      >
        <div className="flex space-x-2 pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag.toLowerCase())}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                tagFilter === tag.toLowerCase() || (tagFilter === 'all' && tag === 'All')
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag === 'All' ? (
                <span className="flex items-center">
                  <SafeIcon icon={FiMessageSquare} className="w-3.5 h-3.5 mr-1.5" />
                  All Topics
                </span>
              ) : (
                <span className="flex items-center">
                  <SafeIcon icon={FiTag} className="w-3.5 h-3.5 mr-1.5" />
                  {tag}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {sortedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <Card 
              hover
              onClick={() => navigate(`/app/communities/${communityId}/forum/${post.id}`)}
              className={`p-5 ${post.isPinned ? 'border-l-4 border-primary-500' : ''}`}
            >
              <div className="flex items-start">
                {/* Vote Column */}
                <div className="flex flex-col items-center mr-4">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <SafeIcon icon={FiIcons.FiChevronUp} className="w-5 h-5 text-gray-400" />
                  </button>
                  <span className="text-gray-900 dark:text-white font-medium my-1">{post.likes}</span>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <SafeIcon icon={FiIcons.FiChevronDown} className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {post.isPinned && (
                      <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs px-2 py-0.5 rounded">
                        Pinned
                      </span>
                    )}
                    {post.isLocked && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded">
                        Locked
                      </span>
                    )}
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full mr-2" 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 mr-1">
                        {post.author.name}
                      </span>
                      {post.author.role === 'Admin' && (
                        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs px-1.5 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <SafeIcon icon={FiMessageCircle} className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiIcons.FiEye} className="w-4 h-4 mr-1" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <SafeIcon icon={FiMessageSquare} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to start a discussion in this community.
          </p>
          <Button onClick={() => navigate(`/app/communities/${communityId}/forum/new`)}>
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Forum;