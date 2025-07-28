import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { useForumStore } from '../../stores/useStore';

const { 
  FiArrowLeft, FiMessageCircle, FiThumbsUp, FiBookmark, 
  FiFlag, FiShare2, FiEdit, FiTrash2, FiLock, FiTag,
  FiClock, FiChevronUp, FiChevronDown, FiEye
} = FiIcons;

const ForumPost = () => {
  const { id: communityId, postId } = useParams();
  const navigate = useNavigate();
  const { posts, setCurrentPost } = useForumStore();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  // Demo data for comments
  const comments = [
    {
      id: 101,
      author: {
        id: 201,
        name: 'Lisa Zhang',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      content: 'I recommend using Firebase Authentication with the official React Firebase hooks library. It makes the integration really straightforward and handles a lot of the boilerplate for you.',
      createdAt: '2023-06-15T12:45:00Z',
      likes: 8,
      isAccepted: true,
    },
    {
      id: 102,
      author: {
        id: 202,
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: 'For more complex authentication flows, you might want to consider Auth0 or Supabase as alternatives. They provide more features out of the box.',
      createdAt: '2023-06-15T14:12:00Z',
      likes: 5,
      replies: [
        {
          id: 201,
          author: {
            id: 101,
            name: 'Sarah Wilson',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          content: 'Thanks for the suggestion! Have you used Supabase before? How does it compare to Firebase in terms of ease of use?',
          createdAt: '2023-06-15T15:30:00Z',
          likes: 2,
        },
        {
          id: 202,
          author: {
            id: 202,
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          content: 'Yes, I\'ve used both. Supabase has a more SQL-like approach and better database features, while Firebase is more NoSQL focused. For auth specifically, both are pretty easy to set up, but Supabase gives you more control over the user data and auth rules.',
          createdAt: '2023-06-15T16:05:00Z',
          likes: 3,
        }
      ]
    },
    {
      id: 103,
      author: {
        id: 203,
        name: 'Mike Peterson',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      content: 'I would recommend using a custom hook to abstract away the authentication logic. This will make it easier to switch providers in the future if needed.',
      createdAt: '2023-06-16T09:20:00Z',
      likes: 4,
    },
  ];

  useEffect(() => {
    setLoading(true);
    
    // In a real app, we would fetch the post details from the API
    const foundPost = posts.find(p => p.id === parseInt(postId));
    
    if (foundPost) {
      setPost({
        ...foundPost,
        comments: comments,
      });
      setCurrentPost(foundPost);
    } else {
      // Demo post for when the ID doesn't match any in the store
      setPost({
        id: parseInt(postId),
        title: 'How to implement authentication with React and Firebase?',
        content: 'I\'m building a React app and want to implement user authentication with Firebase. What\'s the best approach for this? Should I use the Firebase SDK directly or use a wrapper library? I\'ve seen some examples using Context API to manage the auth state, but I\'m not sure if that\'s the best practice.\n\nAlso, how do you handle protected routes with React Router? Any examples or resources would be greatly appreciated!',
        author: {
          id: 101,
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
        createdAt: '2023-06-15T10:30:00Z',
        tags: ['React', 'Firebase', 'Authentication'],
        likes: 24,
        views: 342,
        isPinned: false,
        isLocked: false,
        comments: comments,
      });
    }
    
    setLoading(false);
  }, [postId, posts, setCurrentPost]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In a real app, we would send the comment to the API
    const comment = {
      id: Date.now(),
      author: {
        id: 999, // Current user
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    setPost(prev => ({
      ...prev,
      comments: [comment, ...prev.comments],
    }));
    
    setNewComment('');
  };

  if (loading || !post) {
    return (
      <div className="p-6 max-w-5xl mx-auto flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to={`/app/communities/${communityId}/forum`}
          className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-1" />
          Back to Forum
        </Link>
      </div>

      {/* Main Post */}
      <Card className="mb-6 overflow-hidden">
        <div className="p-6">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
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
            </div>
          </div>
          
          {/* Post Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          {/* Post Content */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2.5 py-1 rounded"
              >
                <SafeIcon icon={FiTag} className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Post Actions */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <SafeIcon icon={FiThumbsUp} className="w-4 h-4 mr-1.5" />
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <SafeIcon icon={FiMessageCircle} className="w-4 h-4 mr-1.5" />
                <span>{post.comments.length} Comments</span>
              </button>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <SafeIcon icon={FiEye} className="w-4 h-4 mr-1.5" />
                <span>{post.views} Views</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <SafeIcon icon={FiBookmark} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <SafeIcon icon={FiShare2} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <SafeIcon icon={FiFlag} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Comment */}
      {!post.isLocked && (
        <Card className="mb-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add Your Comment
          </h3>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
              required
            ></textarea>
            <div className="mt-4 flex justify-end">
              <Button type="submit">
                Post Comment
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Comments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Comments ({post.comments.length})
          </h2>
          <select 
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>

        {post.comments.map((comment) => (
          <Card key={comment.id} className="p-6">
            <div className="flex">
              {/* Vote Column */}
              <div className="flex flex-col items-center mr-4">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <SafeIcon icon={FiChevronUp} className="w-5 h-5 text-gray-400" />
                </button>
                <span className="text-gray-900 dark:text-white font-medium my-1">{comment.likes}</span>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <SafeIcon icon={FiChevronDown} className="w-5 h-5 text-gray-400" />
                </button>
                {comment.isAccepted && (
                  <div className="mt-2 p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </div>
              
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img 
                      src={comment.author.avatar} 
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {comment.author.name}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-gray-700 dark:text-gray-300 mb-4">
                  {comment.content}
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Reply
                  </button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Share
                  </button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Report
                  </button>
                </div>
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <img 
                              src={reply.author.avatar} 
                              alt={reply.author.name}
                              className="w-6 h-6 rounded-full mr-2" 
                            />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {reply.author.name}
                              </span>
                              <span className="mx-1 text-xs text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-gray-700 dark:text-gray-300 mb-2">
                          {reply.content}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <SafeIcon icon={FiThumbsUp} className="w-3 h-3 mr-1" />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Locked Message */}
      {post.isLocked && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-center">
          <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
          <p className="text-gray-700 dark:text-gray-300">
            This thread has been locked. You cannot add new comments.
          </p>
        </div>
      )}
    </div>
  );
};

export default ForumPost;