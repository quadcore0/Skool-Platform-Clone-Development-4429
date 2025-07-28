import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useAppStore } from '../../stores/useStore';

const { 
  FiUser, FiMail, FiLock, FiSave, FiEdit,
  FiBell, FiGlobe, FiTrash2, FiEyeOff
} = FiIcons;

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { preferences, setPreferences } = useAppStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: 'Your Name',
      username: 'username',
      email: user?.email || '',
      bio: 'Full-stack developer passionate about React, Node.js, and building intuitive user experiences.',
      location: 'San Francisco, CA',
      website: 'https://example.com',
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const onProfileSubmit = async (data) => {
    setLoading(true);
    try {
      // In a real app, we would upload the image and update the profile in the backend
      await updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSettings = (setting, value) => {
    setPreferences({ 
      ...preferences, 
      [setting]: value 
    });
    toast.success('Notification preferences updated');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'account', label: 'Account', icon: FiMail },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'privacy', label: 'Privacy & Security', icon: FiLock },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Tabs and Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5 mr-3" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Profile Information
                </h2>
                <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
                  {/* Profile Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                          {imagePreview ? (
                            <img 
                              src={imagePreview} 
                              alt="Profile preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                              <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <SafeIcon icon={FiTrash2} className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer bg-white dark:bg-gray-800 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <span>Change</span>
                          <input
                            id="profile-image"
                            name="profile-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          JPG, PNG, GIF up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName', { required: 'Full name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      {...register('bio')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        {...register('location')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Website
                      </label>
                      <input
                        id="website"
                        type="url"
                        {...register('website')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                      <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Account Settings
                </h2>

                {/* Email */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Email Address
                  </h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {user?.email || 'user@example.com'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your primary email address
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Password
                  </h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        ••••••••••••
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last changed 3 months ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
                    Danger Zone
                  </h3>
                  <div className="border border-red-200 dark:border-red-900/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Delete Account
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                        <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Notification Settings
                </h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Email Notifications
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            Community Updates
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive updates about communities you've joined
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.notifications || false}
                            onChange={() => updateNotificationSettings('notifications', !preferences.notifications)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            Course Announcements
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive updates about courses you're enrolled in
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            Weekly Digest
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive a weekly summary of activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.emailDigest || false}
                            onChange={() => updateNotificationSettings('emailDigest', !preferences.emailDigest)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Push Notifications
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            New Messages
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications for new messages
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            Forum Activity
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications for replies to your posts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === 'privacy' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Privacy & Security
                </h2>

                {/* Privacy Settings */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Privacy Settings
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Profile Visibility
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Control who can see your profile
                        </p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                        <option value="public">Public</option>
                        <option value="members">Members Only</option>
                        <option value="private">Private</option>
                      </select>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Activity Visibility
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Control who can see your activity
                        </p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                        <option value="everyone">Everyone</option>
                        <option value="followers">Followers</option>
                        <option value="nobody">Nobody</option>
                      </select>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Show Online Status
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Allow others to see when you're online
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </li>
                  </ul>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Active Sessions
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage your active login sessions
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiEyeOff} className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Login History
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View your recent login activity
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiGlobe} className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </li>
                  </ul>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;