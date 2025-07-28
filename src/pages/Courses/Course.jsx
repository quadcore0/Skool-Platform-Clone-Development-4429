import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const { 
  FiPlayCircle, FiLock, FiCheckCircle, FiBook, 
  FiClock, FiUsers, FiAward, FiPlus, FiFilter,
  FiSearch, FiGrid, FiList
} = FiIcons;

const Course = () => {
  const { id: communityId, courseId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Demo courses data
  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React, including components, props, state, and hooks.',
      instructor: 'John Doe',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      duration: '4 hours',
      lessons: 12,
      enrolled: 856,
      progress: 0,
      category: 'Development',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns like render props, compound components, and more.',
      instructor: 'Sarah Wilson',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
      duration: '6 hours',
      lessons: 18,
      enrolled: 543,
      progress: 0.4,
      category: 'Development',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'React Native for Beginners',
      description: 'Build mobile apps for iOS and Android using React Native.',
      instructor: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      duration: '8 hours',
      lessons: 24,
      enrolled: 1243,
      progress: 0.7,
      category: 'Mobile Development',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'State Management with Redux',
      description: 'Learn how to manage application state with Redux and Redux Toolkit.',
      instructor: 'Emily Chen',
      image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=200&fit=crop',
      duration: '5 hours',
      lessons: 15,
      enrolled: 756,
      progress: 0.2,
      category: 'Development',
      level: 'Intermediate',
    },
  ];

  // If courseId is provided, show the course detail
  if (courseId) {
    const course = courses.find(c => c.id === parseInt(courseId)) || courses[0];
    
    const lessons = [
      {
        id: 1,
        title: 'Introduction to the Course',
        duration: '10:23',
        type: 'video',
        isCompleted: true,
        isLocked: false,
      },
      {
        id: 2,
        title: 'Setting Up Your Development Environment',
        duration: '15:45',
        type: 'video',
        isCompleted: true,
        isLocked: false,
      },
      {
        id: 3,
        title: 'Creating Your First Component',
        duration: '20:12',
        type: 'video',
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 4,
        title: 'Understanding Props and State',
        duration: '18:37',
        type: 'video',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 5,
        title: 'Working with Hooks',
        duration: '25:14',
        type: 'video',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 6,
        title: 'Assignment: Build a Todo App',
        duration: '1:00:00',
        type: 'assignment',
        isCompleted: false,
        isLocked: true,
      },
    ];
    
    const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
    const progress = completedLessons / lessons.length;
    
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            to={`/app/communities/${communityId}/courses`}
            className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium mb-4"
          >
            <SafeIcon icon={FiIcons.FiArrowLeft} className="w-4 h-4 mr-1" />
            Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden mb-6">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
                  <div className="p-6">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {course.title}
                    </h1>
                    <div className="flex flex-wrap items-center text-white text-sm">
                      <span className="flex items-center mr-4">
                        <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                        {course.enrolled} enrolled
                      </span>
                      <span className="flex items-center mr-4">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center mr-4">
                        <SafeIcon icon={FiBook} className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiAward} className="w-4 h-4 mr-1" />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About This Course
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  This course is taught by <span className="font-medium text-gray-900 dark:text-white">{course.instructor}</span>, 
                  an experienced instructor with years of industry experience. You'll learn through 
                  a combination of video lessons, hands-on exercises, and real-world projects.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Course Content
                </h2>
                
                <div className="mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full" 
                      style={{ width: `${progress * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{completedLessons} of {lessons.length} lessons completed</span>
                    <span>{Math.round(progress * 100)}% complete</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={`border rounded-lg p-4 ${
                        lesson.isCompleted 
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {lesson.isCompleted ? (
                              <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                            ) : lesson.isLocked ? (
                              <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-400" />
                            ) : lesson.type === 'video' ? (
                              <SafeIcon icon={FiPlayCircle} className="w-5 h-5 text-primary-500" />
                            ) : (
                              <SafeIcon icon={FiBook} className="w-5 h-5 text-primary-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <span className="capitalize">{lesson.type}</span>
                              <span className="mx-2">•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        {!lesson.isLocked && (
                          <Button 
                            size="sm" 
                            variant={lesson.isCompleted ? "outline" : "primary"}
                            onClick={() => navigate(`/app/communities/${communityId}/courses/${courseId}/lessons/${lesson.id}`)}
                          >
                            {lesson.isCompleted ? 'Review' : 'Start'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Your Progress
                </h3>
                
                <div className="mb-6">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary-200 text-primary-800">
                          {Math.round(progress * 100)}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2.5 mb-4 overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div 
                        style={{ width: `${progress * 100}%` }} 
                        className="bg-primary-500 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
                    <span className="font-semibold">{completedLessons}/{lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time Spent</span>
                    <span className="font-semibold">1h 23m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Activity</span>
                    <span className="font-semibold">Today</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/app/communities/${communityId}/courses/${courseId}/lessons/${completedLessons + 1}`)}
                  >
                    {progress === 0 ? 'Start Course' : progress === 1 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Related Courses
                </h3>
                
                <div className="space-y-4">
                  {courses.filter(c => c.id !== parseInt(courseId)).slice(0, 3).map(relatedCourse => (
                    <div key={relatedCourse.id} className="flex items-center space-x-3">
                      <img 
                        src={relatedCourse.image} 
                        alt={relatedCourse.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {relatedCourse.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {relatedCourse.lessons} lessons • {relatedCourse.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Link 
                    to={`/app/communities/${communityId}/courses`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Browse all courses
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise, show the courses list
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'beginner') return matchesSearch && course.level === 'Beginner';
    if (filterBy === 'intermediate') return matchesSearch && course.level === 'Intermediate';
    if (filterBy === 'advanced') return matchesSearch && course.level === 'Advanced';
    
    return matchesSearch;
  });

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
            Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Expand your knowledge with our comprehensive courses
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-0"
        >
          <Link to={`/app/communities/${communityId}/courses/create`}>
            <Button>
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Create Course
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
            placeholder="Search courses..."
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
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
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

      {/* Courses Grid/List */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {viewMode === 'grid' ? (
              <Card hover onClick={() => navigate(`/app/communities/${communityId}/courses/${course.id}`)} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  
                  {course.progress > 0 && (
                    <div className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 px-4 py-1">
                      <div className="bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-500 h-1.5 rounded-full" 
                          style={{ width: `${course.progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
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
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      By {course.instructor}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <SafeIcon icon={FiBook} className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card hover onClick={() => navigate(`/app/communities/${communityId}/courses/${course.id}`)} className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300">
                        {course.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-1">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiBook} className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="w-20 flex-shrink-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-right">
                        {Math.round(course.progress * 100)}%
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-primary-500 h-1.5 rounded-full" 
                          style={{ width: `${course.progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <SafeIcon icon={FiBook} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filters, or create a new course.
          </p>
          <Link to={`/app/communities/${communityId}/courses/create`}>
            <Button>
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Course;