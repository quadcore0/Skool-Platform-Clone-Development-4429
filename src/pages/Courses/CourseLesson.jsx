import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import ReactPlayer from 'react-player/lazy';

const { 
  FiArrowLeft, FiArrowRight, FiCheckCircle, FiBook, 
  FiMessageSquare, FiDownload, FiChevronRight, FiChevronDown,
  FiThumbsUp, FiClock, FiLock
} = FiIcons;

const CourseLesson = () => {
  const { communityId, courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [showLessons, setShowLessons] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Demo data
  const course = {
    id: parseInt(courseId),
    title: 'React Fundamentals',
    description: 'Learn the basics of React, including components, props, state, and hooks.',
    instructor: 'John Doe',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
  };

  const lessons = [
    {
      id: 1,
      title: 'Introduction to the Course',
      duration: '10:23',
      type: 'video',
      isCompleted: true,
      isLocked: false,
      videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    },
    {
      id: 2,
      title: 'Setting Up Your Development Environment',
      duration: '15:45',
      type: 'video',
      isCompleted: true,
      isLocked: false,
      videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    },
    {
      id: 3,
      title: 'Creating Your First Component',
      duration: '20:12',
      type: 'video',
      isCompleted: false,
      isLocked: false,
      videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    },
    {
      id: 4,
      title: 'Understanding Props and State',
      duration: '18:37',
      type: 'video',
      isCompleted: false,
      isLocked: true,
      videoUrl: '',
    },
    {
      id: 5,
      title: 'Working with Hooks',
      duration: '25:14',
      type: 'video',
      isCompleted: false,
      isLocked: true,
      videoUrl: '',
    },
    {
      id: 6,
      title: 'Assignment: Build a Todo App',
      duration: '1:00:00',
      type: 'assignment',
      isCompleted: false,
      isLocked: true,
      videoUrl: '',
    },
  ];

  const currentLesson = lessons.find(lesson => lesson.id === parseInt(lessonId)) || lessons[0];
  const currentLessonIndex = lessons.findIndex(lesson => lesson.id === parseInt(lessonId));
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;
  
  const comments = [
    {
      id: 1,
      user: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: 'Great explanation! I was confused about how props work but now it makes sense.',
      timestamp: '2 days ago',
      likes: 12,
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Could you explain more about how the useState hook differs from class-based state management?',
      timestamp: '1 day ago',
      likes: 5,
      replies: [
        {
          id: 3,
          user: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          content: 'Great question! The main differences are simplicity and scoping. useState gives you a value and a setter function, whereas class components require this.state and this.setState. Hooks also allow you to organize code by concern rather than lifecycle methods.',
          timestamp: '1 day ago',
          likes: 8,
        }
      ]
    },
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(currentLesson.isCompleted);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [lessonId, currentLesson.isCompleted]);

  const handleComplete = () => {
    setIsCompleted(true);
    // In a real app, we would update the completion status in the backend
    if (nextLesson && !nextLesson.isLocked) {
      setTimeout(() => {
        navigate(`/app/communities/${communityId}/courses/${courseId}/lessons/${nextLesson.id}`);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <Link 
          to={`/app/communities/${communityId}/courses/${courseId}`}
          className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-1" />
          Back to Course
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Lesson List */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Course Content
              </h3>
              <button 
                onClick={() => setShowLessons(!showLessons)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <SafeIcon 
                  icon={showLessons ? FiChevronDown : FiChevronRight} 
                  className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                />
              </button>
            </div>
            
            {showLessons && (
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 border-b border-gray-100 dark:border-gray-700 flex items-center ${
                      lesson.id === parseInt(lessonId)
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="mr-3 flex-shrink-0">
                      {lesson.isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className={`text-sm font-medium ${
                          lesson.id === parseInt(lessonId)
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-900 dark:text-white'
                        } ${lesson.isLocked ? 'text-gray-400 dark:text-gray-500' : ''}`}
                      >
                        {lesson.title}
                        {lesson.isLocked && (
                          <SafeIcon icon={FiLock} className="inline-block ml-1 w-3 h-3" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="capitalize">{lesson.type}</span>
                        <span className="mx-1">•</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    
                    {!lesson.isLocked && lesson.id !== parseInt(lessonId) && (
                      <Link
                        to={`/app/communities/${communityId}/courses/${courseId}/lessons/${lesson.id}`}
                        className="ml-2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        <SafeIcon icon={FiChevronRight} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentLesson.title}
              </h2>
              <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                {currentLesson.duration}
              </div>
            </div>
            
            <div>
              {/* Video Player */}
              {currentLesson.type === 'video' && (
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full">
                    <ReactPlayer
                      url={currentLesson.videoUrl || 'https://www.youtube.com/watch?v=w7ejDZ8SWv8'}
                      width="100%"
                      height="480px"
                      controls
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Assignment Content */}
              {currentLesson.type === 'assignment' && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Assignment: Build a Todo App
                  </h3>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      In this assignment, you'll apply what you've learned to build a simple Todo application using React.
                    </p>
                    
                    <h4>Requirements:</h4>
                    <ul>
                      <li>Create a new React application</li>
                      <li>Implement components for adding, displaying, and removing todos</li>
                      <li>Use React hooks for state management</li>
                      <li>Add the ability to mark todos as complete</li>
                      <li>Style your application using CSS or a UI library</li>
                    </ul>
                    
                    <h4>Resources:</h4>
                    <div className="mt-4 flex items-center">
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                        Download Assignment PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Submission
                    </h4>
                    
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <SafeIcon 
                        icon={FiIcons.FiUpload} 
                        className="w-10 h-10 text-gray-400 mx-auto mb-2" 
                      />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Drag and drop your project files here, or click to browse
                      </p>
                      <Button size="sm">Upload Project</Button>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Accepted formats: .zip, .rar, .github URL
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <SafeIcon icon={FiBook} className="w-4 h-4 mr-2 inline-block" />
                  Notes & Resources
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === 'discussion'
                      ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2 inline-block" />
                  Discussion
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs py-0.5 px-2 rounded-full">
                    {comments.length}
                  </span>
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'content' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Lesson Summary</h3>
                    <p>
                      In this lesson, we covered the fundamental concepts of React components and how they work. 
                      We discussed the differences between functional and class components, and how to use props 
                      to pass data between components.
                    </p>
                    
                    <h4>Key Points:</h4>
                    <ul>
                      <li>React components are reusable pieces of UI</li>
                      <li>Props are used to pass data from parent to child components</li>
                      <li>Functional components are the modern way to write React components</li>
                      <li>The virtual DOM helps React efficiently update the UI</li>
                    </ul>
                    
                    <h4>Additional Resources:</h4>
                    <ul>
                      <li>
                        <a href="#" className="text-primary-600 hover:text-primary-700">
                          React Official Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary-600 hover:text-primary-700">
                          Understanding React Components (PDF)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary-600 hover:text-primary-700">
                          GitHub Repository with Examples
                        </a>
                      </li>
                    </ul>
                    
                    <h4>Next Steps:</h4>
                    <p>
                      In the next lesson, we'll dive deeper into state management with React hooks. 
                      Make sure to complete the practice exercises before moving on.
                    </p>
                  </div>
                )}
                
                {activeTab === 'discussion' && (
                  <div className="space-y-6">
                    {/* New Comment Form */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Join the Discussion
                      </h3>
                      <textarea
                        placeholder="Add your comment..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm">Post Comment</Button>
                      </div>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.map(comment => (
                        <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                          <div className="flex items-start space-x-3">
                            <img 
                              src={comment.avatar} 
                              alt={comment.user} 
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {comment.user}
                                </h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {comment.content}
                              </p>
                              <div className="flex items-center mt-2 space-x-4">
                                <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                  <SafeIcon icon={FiThumbsUp} className="w-3 h-3 mr-1" />
                                  Like ({comment.likes})
                                </button>
                                <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                  Reply
                                </button>
                              </div>
                              
                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-4 ml-6 space-y-4">
                                  {comment.replies.map(reply => (
                                    <div key={reply.id} className="flex items-start space-x-3">
                                      <img 
                                        src={reply.avatar} 
                                        alt={reply.user} 
                                        className="w-8 h-8 rounded-full"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <h5 className="font-medium text-gray-900 dark:text-white">
                                            {reply.user}
                                          </h5>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {reply.timestamp}
                                          </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                                          {reply.content}
                                        </p>
                                        <div className="flex items-center mt-2">
                                          <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                            <SafeIcon icon={FiThumbsUp} className="w-3 h-3 mr-1" />
                                            Like ({reply.likes})
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            {prevLesson ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/app/communities/${communityId}/courses/${courseId}/lessons/${prevLesson.id}`)}
              >
                <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
            ) : (
              <div></div>
            )}
            
            {isCompleted ? (
              <Button
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                disabled
              >
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-2" />
                Completed
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Mark as Complete
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {nextLesson && !nextLesson.isLocked ? (
              <Button
                onClick={() => navigate(`/app/communities/${communityId}/courses/${courseId}/lessons/${nextLesson.id}`)}
              >
                Next Lesson
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
              </Button>
            ) : nextLesson ? (
              <Button disabled>
                Next Lesson
                <SafeIcon icon={FiLock} className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate(`/app/communities/${communityId}/courses/${courseId}`)}
              >
                Finish Course
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;