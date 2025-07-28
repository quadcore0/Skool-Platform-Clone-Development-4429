import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO, formatDistance } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';

const { 
  FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUsers, 
  FiVideo, FiDownload, FiShare2, FiEdit, FiTrash2,
  FiExternalLink, FiMessageSquare, FiAlertCircle, FiPlus
} = FiIcons;

const EventDetail = () => {
  const { id: communityId, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // In a real app, we would fetch the event details from the API
    setTimeout(() => {
      setEvent({
        id: parseInt(eventId),
        title: 'React Performance Optimization Workshop',
        description: `Join us for an in-depth workshop on optimizing React applications for better performance. 
        
We'll cover:
- Identifying performance bottlenecks
- Using React.memo, useMemo, and useCallback effectively
- Implementing virtualization for large lists
- Code splitting and lazy loading techniques
- Performance monitoring and measurement

This is a hands-on workshop, so come prepared with your laptop and a basic React development environment set up. We'll provide code examples and exercises that you can follow along with.`,
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
        attendees: [
          {
            id: 201,
            name: 'Sarah Wilson',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          {
            id: 202,
            name: 'Mike Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            id: 203,
            name: 'Emily Chen',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          },
          {
            id: 204,
            name: 'David Brown',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          },
        ],
        totalAttendees: 48,
        capacity: 100,
        isAttending: true,
        videoUrl: 'https://zoom.us/j/123456789',
        materials: [
          {
            name: 'Workshop Slides',
            url: '#',
            type: 'pdf',
          },
          {
            name: 'Code Examples',
            url: '#',
            type: 'zip',
          },
        ],
        comments: [
          {
            id: 301,
            author: {
              id: 201,
              name: 'Sarah Wilson',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            },
            content: 'Really looking forward to this workshop! Will there be any follow-up sessions?',
            timestamp: '2023-06-20T14:32:00Z',
          },
          {
            id: 302,
            author: {
              id: 101,
              name: 'John Doe',
              avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
              isHost: true,
            },
            content: 'Yes, we\'re planning to do a follow-up advanced session next month if there\'s enough interest.',
            timestamp: '2023-06-20T15:45:00Z',
          },
        ],
      });
      setIsAttending(true);
      setLoading(false);
    }, 1000);
  }, [eventId]);

  const handleAttendance = () => {
    // In a real app, we would update the attendance status on the server
    setIsAttending(!isAttending);
    setEvent(prev => ({
      ...prev,
      totalAttendees: isAttending ? prev.totalAttendees - 1 : prev.totalAttendees + 1,
    }));
  };

  const formatEventDate = (startTime, endTime) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    
    return `${format(start, 'EEEE, MMMM d, yyyy')} • ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const formatTimeToEvent = (startTime) => {
    const start = parseISO(startTime);
    const now = new Date();
    
    if (start < now) {
      return 'Event has started';
    }
    
    return formatDistance(start, now, { addSuffix: true });
  };

  if (loading || !event) {
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
          to={`/app/communities/${communityId}/events`}
          className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-1" />
          Back to Events
        </Link>
      </div>

      {/* Event Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </h1>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <SafeIcon icon={FiShare2} className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button 
                variant={isAttending ? "outline" : "primary"}
                onClick={handleAttendance}
              >
                {isAttending ? 'Cancel RSVP' : 'Attend Event'}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2 text-primary-500" />
              <span>{formatEventDate(event.startTime, event.endTime)}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiClock} className="w-5 h-5 mr-2 text-primary-500" />
              <span>{formatTimeToEvent(event.startTime)}</span>
            </div>
            
            <div className="flex items-center">
              {event.location === 'Virtual' ? (
                <SafeIcon icon={FiVideo} className="w-5 h-5 mr-2 text-primary-500" />
              ) : (
                <SafeIcon icon={FiMapPin} className="w-5 h-5 mr-2 text-primary-500" />
              )}
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2 text-primary-500" />
              <span>{event.totalAttendees}/{event.capacity} attendees</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About this event
            </h2>
            <div className="prose dark:prose-invert max-w-none mb-6 whitespace-pre-line">
              {event.description}
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center">
                <img 
                  src={event.host.avatar} 
                  alt={event.host.name}
                  className="w-8 h-8 rounded-full mr-3" 
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Hosted by {event.host.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Event Organizer
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                Contact Host
              </Button>
            </div>
          </Card>
          
          {/* Event Materials */}
          {event.materials && event.materials.length > 0 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Event Materials
              </h2>
              <div className="space-y-3">
                {event.materials.map((material, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3">
                        <SafeIcon 
                          icon={material.type === 'pdf' ? FiIcons.FiFile : FiIcons.FiFolder} 
                          className="w-5 h-5 text-gray-600 dark:text-gray-400" 
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {material.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {material.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded transition-colors"
                    >
                      <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Join Instructions */}
          {event.location === 'Virtual' && event.videoUrl && (
            <Card className="p-6 mb-6 border-l-4 border-primary-500">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                  <SafeIcon icon={FiVideo} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Join Virtual Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This is a virtual event. Click the button below to join the meeting.
                  </p>
                  <a 
                    href={event.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-2" />
                    Join Meeting
                  </a>
                </div>
              </div>
            </Card>
          )}
          
          {/* Comments Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Discussion
            </h2>
            
            {/* New Comment Form */}
            <div className="mb-6">
              <textarea
                placeholder="Add a comment or ask a question..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              ></textarea>
              <div className="mt-2 flex justify-end">
                <Button size="sm">
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {event.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full flex-shrink-0" 
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-gray-900 dark:text-white mr-2">
                        {comment.author.name}
                      </span>
                      {comment.author.isHost && (
                        <span className="px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full">
                          Host
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {formatDistance(parseISO(comment.timestamp), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                    <div className="mt-2 flex space-x-4">
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Reply
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Right Column - Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Date Card */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Event Details
              </h3>
              {isAttending && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  You're Attending
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/10 rounded-lg mr-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {format(parseISO(event.startTime), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {format(parseISO(event.startTime), 'h:mm a')} - {format(parseISO(event.endTime), 'h:mm a')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/10 rounded-lg mr-3">
                  <SafeIcon 
                    icon={event.location === 'Virtual' ? FiVideo : FiMapPin} 
                    className="w-5 h-5 text-primary-600 dark:text-primary-400" 
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.location}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {event.location === 'Virtual' ? 'Join via Zoom' : 'See address details'}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  className="w-full"
                  variant={isAttending ? "outline" : "primary"}
                  onClick={handleAttendance}
                >
                  {isAttending ? 'Cancel RSVP' : 'Attend Event'}
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Attendees Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Attendees ({event.totalAttendees}/{event.capacity})
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {event.attendees.map((attendee) => (
                <img 
                  key={attendee.id}
                  src={attendee.avatar} 
                  alt={attendee.name}
                  title={attendee.name}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" 
                />
              ))}
              {event.totalAttendees > event.attendees.length && (
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  +{event.totalAttendees - event.attendees.length}
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {event.capacity - event.totalAttendees} spots remaining
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiAlertCircle} className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                This event has limited capacity
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;