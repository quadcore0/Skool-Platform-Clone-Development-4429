import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import { useCommunitiesStore } from '../../stores/useStore';

const { FiImage, FiUpload, FiGlobe, FiLock, FiX } = FiIcons;

const CreateCommunity = () => {
  const navigate = useNavigate();
  const { addCommunity } = useCommunitiesStore();
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // In a real app, we would upload the image and create the community in the backend
      const newCommunity = {
        id: Date.now(),
        name: data.name,
        description: data.description,
        category: data.category,
        isPrivate: isPrivate,
        members: 1, // Just the creator
        image: coverPreview || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
        owner: 'You',
        joined: true,
        activity: 'New',
        createdAt: new Date().toISOString(),
      };

      // Add the new community to our store
      addCommunity(newCommunity);
      
      toast.success('Community created successfully!');
      navigate(`/app/communities/${newCommunity.id}`);
    } catch (error) {
      console.error('Error creating community:', error);
      toast.error('Failed to create community. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create a New Community
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Set up your learning community and invite members to join.
        </p>
      </motion.div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Cover Image Upload */}
          <div>
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

          {/* Community Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Community Name *
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { 
                required: 'Community name is required',
                maxLength: {
                  value: 100,
                  message: 'Name must be less than 100 characters'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., JavaScript Developers Network"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description', { 
                required: 'Description is required',
                maxLength: {
                  value: 500,
                  message: 'Description must be less than 500 characters'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe what your community is about..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health & Wellness</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Privacy Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Privacy
            </label>
            <div className="mt-2 space-y-4">
              <div 
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  !isPrivate 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => setIsPrivate(false)}
              >
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  !isPrivate 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {!isPrivate && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                    <SafeIcon icon={FiGlobe} className="mr-2 text-gray-500" />
                    Public
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Anyone can find and join this community
                  </p>
                </div>
              </div>

              <div 
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  isPrivate 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => setIsPrivate(true)}
              >
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  isPrivate 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {isPrivate && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                    <SafeIcon icon={FiLock} className="mr-2 text-gray-500" />
                    Private
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Only people you invite can join this community
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/app/communities')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={loading}
            >
              <SafeIcon icon={FiUpload} className="w-4 h-4 mr-2" />
              Create Community
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCommunity;