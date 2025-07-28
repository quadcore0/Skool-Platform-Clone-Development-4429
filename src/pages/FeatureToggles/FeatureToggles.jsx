import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { 
  toggleFeature,
  updateFeatureFilters,
  selectFeature
} from '../../store/slices/featureSlice';

const FeatureToggles = () => {
  const dispatch = useDispatch();
  const { features, loading, filters } = useSelector((state) => state.features);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Apply search filter
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateFeatureFilters({ search: searchInput }));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(updateFeatureFilters({ [e.target.name]: e.target.value }));
  };

  // Handle feature toggle
  const handleToggleFeature = (featureId, enabled) => {
    dispatch(toggleFeature({ featureId, enabled }));
  };

  // Handle feature click
  const handleFeatureClick = (feature) => {
    dispatch(selectFeature(feature));
    // Open feature detail modal or navigate to detail page
  };

  // Filter features based on current filters
  const filteredFeatures = features.filter((feature) => {
    // Search filter
    const matchesSearch = 
      filters.search === '' || 
      feature.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      feature.description.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'enabled' && feature.enabled) || 
      (filters.status === 'disabled' && !feature.enabled);

    // Type filter
    const matchesType = filters.type === 'all' || feature.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Group features by category
  const groupedFeatures = filteredFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Toggles</h1>
        <Button 
          onClick={() => {/* Open create feature modal */}}
          icon={<PlusIcon className="w-5 h-5 mr-1" />}
        >
          New Feature
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search features..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Status:</span>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Type:</span>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="core">Core</option>
                <option value="beta">Beta</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredFeatures.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No features found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{category}</h2>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plans</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {categoryFeatures.map((feature) => (
                        <tr 
                          key={feature.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleFeatureClick(feature)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{feature.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{feature.key}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={
                                feature.type === 'core' ? 'default' :
                                feature.type === 'beta' ? 'info' :
                                feature.type === 'premium' ? 'warning' :
                                feature.type === 'enterprise' ? 'primary' : 'default'
                              }
                              className="capitalize"
                            >
                              {feature.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {feature.availablePlans.join(', ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(feature.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={feature.enabled} 
                                onChange={() => handleToggleFeature(feature.id, !feature.enabled)} 
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default FeatureToggles;