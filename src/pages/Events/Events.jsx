import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const { 
  FiPlus, FiCalendar, FiClock, FiUsers, FiMap,
  FiSearch, FiFilter, FiChevronLeft, FiChevronRight,
  FiVideo
} = FiIcons;

const Events = () => {
  const { id: communityId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Demo events data
  useEffect(() => {
    setLoading(true);
    
    // In a real app, we would fetch events from the API
    const demoEvents = [
      {
        id: 1,
        title: 'React Performance Optimization Workshop',
        description: 'Learn advanced techniques to optimize your React applications for better performance.',
        startTime: '2023-06-25T15:00:00Z',
        endTime: '2023-06-25T17:00:00Z',
        timezone: 'America/New_York',
        location: 'Virtual',
        type: 'workshop',
        host: {
          id: 101,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        },
        attendees: 48,
        capacity: 100,
        isAttending: true,
        videoUrl: 'https://zoom.us/j/123456789',
      },
      {
        id: 2,
        title: 'Weekly Community Standup',
        description: 'Join our weekly standup to share updates, ask questions, and connect with other community members.',
        startTime: '2023-06-20T13:00:00Z',
        endTime: '2023-06-20T14:00:00Z',
        timezone: 'America/New_York',
        location: 'Virtual',
        type: 'meetup',
        host: {
          id: 102,
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
        attendees: 32,
        capacity: 50,
        isAttending: false,
        videoUrl: 'https://meet.google.com/abc-defg-hij',
      },
      {
        id: 3,
        title: 'Introduction to State Management with Redux',
        description: 'A beginner-friendly session covering Redux fundamentals and how to integrate it with React.',
        startTime: '2023-06-15T18:00:00Z',
        endTime: '2023-06-15T19:30:00Z',
        timezone: 'America/New_York',
        location: 'Virtual',
        type: 'webinar',
        host: {
          id: 103,
          name: 'Mike Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        attendees: 75,
        capacity: 100,
        isAttending: true,
        videoUrl: 'https://youtube.com/live/abc123',
        recording: 'https://youtube.com/watch?v=abc123',
      },
      {
        id: 4,
        title: 'React Native vs Flutter: Pros and Cons',
        description: 'A detailed comparison of React Native and Flutter for cross-platform mobile development.',
        startTime: '2023-06-10T16:00:00Z',
        endTime: '2023-06-10T17:30:00Z',
        timezone: 'America/New_York',
        location: 'Virtual',
        type: 'panel',
        host: {
          id: 104,
          name: 'Emily Chen',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        attendees: 120,
        capacity: 150,
        isAttending: false,
        recording: 'https://youtube.com/watch?v=xyz789',
      },
      {
        id: 5,
        title: 'Community Hackathon',
        description: 'Join us for a weekend of coding, collaboration, and fun! Build something awesome with fellow community members.',
        startTime: '2023-07-15T09:00:00Z',
        endTime: '2023-07-16T18:00:00Z',
        timezone: 'America/New_York',
        location: 'Tech Hub - 123 Main St, New York, NY',
        type: 'hackathon',
        host: {
          id: 101,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        },
        attendees: 45,
        capacity: 60,
        isAttending: true,
      },
    ];

    setEvents(demoEvents);
    setLoading(false);
  }, []);

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const eventDate = parseISO(event.startTime);
    const now = new Date();
    
    if (filter === 'upcoming') {
      return matchesSearch && isAfter(eventDate, now);
    } else if (filter === 'past') {
      return matchesSearch && isBefore(eventDate, now);
    } else if (filter === 'today') {
      return matchesSearch && isToday(eventDate);
    } else if (filter === 'attending') {
      return matchesSearch && event.isAttending;
    }
    
    return matchesSearch;
  }).sort((a, b) => {
    // Sort by date (upcoming first, then past)
    return filter === 'past' 
      ? new Date(b.startTime) - new Date(a.startTime) // Past: newest to oldest
      : new Date(a.startTime) - new Date(b.startTime); // Upcoming: oldest to newest
  });

  const formatEventDate = (startTime, endTime) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    
    // Same day event
    if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
      return `${format(start, 'MMM d, yyyy')} • ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    }
    
    // Multi-day event
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const getEventStatusBadge = (event) => {
    const eventDate = parseISO(event.startTime);
    const now = new Date();
    
    if (isAfter(eventDate, now)) {
      return {
        label: 'Upcoming',
        class: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
      };
    } else if (isBefore(parseISO(event.endTime), now)) {
      return {
        label: event.recording ? 'Recording Available' : 'Past',
        class: event.recording 
          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      };
    } else {
      return {
        label: 'Live Now',
        class: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
      };
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

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
            Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover upcoming events and join live sessions
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-0"
        >
          <Button onClick={() => navigate(`/app/communities/${communityId}/events/new`)}>
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
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
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="attending">I'm Attending</option>
              <option value="past">Past Events</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event, index) => {
          const status = getEventStatusBadge(event);
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                hover
                onClick={() => navigate(`/app/communities/${communityId}/events/${event.id}`)}
                className="p-0 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Column - Date */}
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-6 flex flex-col items-center justify-center md:w-48 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {format(parseISO(event.startTime), 'MMM')}
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {format(parseISO(event.startTime), 'd')}
                      </div>
                      <div className="text-lg font-medium text-gray-600 dark:text-gray-400">
                        {format(parseISO(event.startTime), 'EEE')}
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                        {format(parseISO(event.startTime), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Event Details */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.class}`}>
                            {status.label}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                      </div>
                      
                      {event.isAttending && (
                        <div className="ml-4 px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                          Attending
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{formatEventDate(event.startTime, event.endTime)}</span>
                      </div>
                      
                      <div className="flex items-center mr-4">
                        <SafeIcon 
                          icon={event.location === 'Virtual' ? FiVideo : FiMap} 
                          className="w-4 h-4 mr-1 flex-shrink-0" 
                        />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{event.attendees}/{event.capacity} attendees</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filter === 'upcoming' ? "There are no upcoming events scheduled." : 
             filter === 'today' ? "There are no events happening today." :
             filter === 'attending' ? "You're not attending any events." : 
             "No past events match your search criteria."}
          </p>
          <Button onClick={() => navigate(`/app/communities/${communityId}/events/new`)}>
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </motion.div>
      )}

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <SafeIcon icon={FiChevronLeft} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg border border-primary-200 dark:border-primary-700">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
              2
            </button>
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <SafeIcon icon={FiChevronRight} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;