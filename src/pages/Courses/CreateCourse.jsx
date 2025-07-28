import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { useCoursesStore } from '../../stores/useStore';

const { 
  FiArrowLeft, FiImage, FiUpload, FiX, FiPlus, 
  FiTrash2, FiMove, FiVideo, FiFileText, FiEdit
} = FiIcons;

const CreateCourse = () => {
  const { id: communityId } = useParams();
  const navigate = useNavigate();
  const { addCourse } = useCoursesStore();
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Introduction to the Course', type: 'video', duration: '10:00', content: '' }
  ]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      level: '',
      category: '',
      price: 0,
      isPaid: false,
    }
  });

  const isPaid = watch('isPaid');

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      { 
        id: lessons.length + 1, 
        title: `New Lesson ${lessons.length + 1}`, 
        type: 'video', 
        duration: '00:00',
        content: ''
      }
    ]);
  };

  const removeLesson = (id) => {
    if (lessons.length === 1) {
      toast.error('Course must have at least one lesson');
      return;
    }
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const updateLesson = (id, field, value) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const moveLesson = (id, direction) => {
    const index = lessons.findIndex(lesson => lesson.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === lessons.length - 1)) {
      return;
    }
    
    const newLessons = [...lessons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newLessons[index], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[index]];
    setLessons(newLessons);
  };

  const onSubmit = async (data) => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, we would upload the image and create the course in the backend
      const newCourse = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        instructor: 'You',
        image: coverPreview || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
        duration: '0 hours',
        lessons: lessons.length,
        enrolled: 0,
        progress: 0,
        category: data.category,
        level: data.level,
        isPaid: data.isPaid,
        price: data.isPaid ? parseFloat(data.price) : 0,
        createdAt: new Date().toISOString(),
        lessonsList: lessons,
      };

      // Add the new course to our store
      addCourse(newCourse);
      
      toast.success('Course created successfully!');
      navigate(`/app/communities/${communityId}/courses/${newCourse.id}`);
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link 
          to={`/app/communities/${communityId}/courses`}
          className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create a New Course
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your knowledge by creating a structured learning experience
          </p>
        </motion.div>
      </div>

      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Details</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Content & Lessons</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Course Details */}
        {currentStep === 1 && (
          <Card className="p-6">
            {/* Cover Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="mt-1">
                {coverPreview ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={coverPreview} 
                      alt="Cover preview" 
                      className="w-full h-64 object-cover" 
                    />
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <SafeIcon 
                        icon={FiImage} 
                        className="mx-auto h-12 w-12 text-gray-400" 
                      />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor="cover-image" className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                          <span>Upload a file</span>
                          <input 
                            id="cover-image" 
                            name="cover-image" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleCoverImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                {...register('title', { 
                  required: 'Course title is required',
                  maxLength: {
                    value: 100,
                    message: 'Title must be less than 100 characters'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Mastering React: From Basics to Advanced"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description', { 
                  required: 'Description is required',
                  maxLength: {
                    value: 1000,
                    message: 'Description must be less than 1000 characters'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe what your course covers and what students will learn..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Level & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level *
                </label>
                <select
                  id="level"
                  {...register('level', { required: 'Level is required' })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Personal Development">Personal Development</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <input
                  id="isPaid"
                  type="checkbox"
                  {...register('isPaid')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isPaid" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  This is a paid course
                </label>
              </div>
              
              {isPaid && (
                <div className="mt-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', { 
                        required: isPaid ? 'Price is required' : false,
                        min: {
                          value: 0,
                          message: 'Price must be a positive number'
                        }
                      })}
                      className="w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end">
              <Button type="button" onClick={() => setCurrentStep(2)}>
                Next: Add Content
                <SafeIcon icon={FiArrowLeft} className="ml-2 w-4 h-4 rotate-180" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Course Content */}
        {currentStep === 2 && (
          <div>
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Course Content
                </h2>
                <Button type="button" size="sm" onClick={addLesson}>
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  Add Lesson
                </Button>
              </div>

              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-medium text-primary-600 dark:text-primary-400 mr-3">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                          className="font-medium text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 p-0"
                          placeholder="Lesson title"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={lesson.type}
                          onChange={(e) => updateLesson(lesson.id, 'type', e.target.value)}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="video">Video</option>
                          <option value="text">Text</option>
                          <option value="assignment">Assignment</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                          className="text-sm w-20 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="00:00"
                        />
                        <button
                          type="button"
                          onClick={() => moveLesson(lesson.id, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded-full ${
                            index === 0 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <SafeIcon icon={FiMove} className="w-4 h-4 transform rotate-90" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLesson(lesson.id, 'down')}
                          disabled={index === lessons.length - 1}
                          className={`p-1 rounded-full ${
                            index === lessons.length - 1
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <SafeIcon icon={FiMove} className="w-4 h-4 transform -rotate-90" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeLesson(lesson.id)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Lesson Content */}
                    <div className="pl-9">
                      {lesson.type === 'video' && (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiVideo} className="w-4 h-4 text-primary-500" />
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Video content - You'll be able to upload after course creation
                          </div>
                        </div>
                      )}
                      
                      {lesson.type === 'text' && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiFileText} className="w-4 h-4 text-primary-500" />
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Text content
                            </div>
                          </div>
                          <textarea
                            value={lesson.content}
                            onChange={(e) => updateLesson(lesson.id, 'content', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter text content for this lesson..."
                            rows={3}
                          ></textarea>
                        </div>
                      )}
                      
                      {lesson.type === 'assignment' && (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiEdit} className="w-4 h-4 text-primary-500" />
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Assignment - You'll be able to configure after course creation
                          </div>
                        </div>
                      )}
                      
                      {lesson.type === 'quiz' && (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiEdit} className="w-4 h-4 text-primary-500" />
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Quiz - You'll be able to add questions after course creation
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep(1)}
              >
                <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
                Back to Details
              </Button>
              
              <Button 
                type="submit" 
                loading={loading}
              >
                <SafeIcon icon={FiUpload} className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCourse;