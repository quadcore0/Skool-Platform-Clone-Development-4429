import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { selectTicket, updateTicket, addTicketResponse } from '../../store/slices/supportSlice';

const SupportTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tickets, selectedTicket } = useSelector((state) => state.support);
  const { user } = useSelector((state) => state.auth);
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    setLoading(true);
    
    // If we already have the selected ticket and it matches the URL parameter
    if (selectedTicket && selectedTicket.id === ticketId) {
      setTicket(selectedTicket);
      setStatusUpdate(selectedTicket.status);
      setLoading(false);
      return;
    }
    
    // Otherwise, find the ticket in the tickets array
    const foundTicket = tickets.find(t => t.id === ticketId);
    if (foundTicket) {
      dispatch(selectTicket(foundTicket));
      setTicket(foundTicket);
      setStatusUpdate(foundTicket.status);
    } else {
      // Handle ticket not found
      console.error('Ticket not found');
      // You might want to redirect to a 404 page or back to tickets list
    }
    
    setLoading(false);
  }, [ticketId, tickets, selectedTicket, dispatch]);

  // Handle status update
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusUpdate(newStatus);
    
    // Update ticket status in store
    dispatch(updateTicket({
      id: ticket.id,
      status: newStatus,
      updatedAt: new Date().toISOString()
    }));
  };

  // Handle reply submission
  const handleSubmitReply = (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    const response = {
      id: `resp_${ticket.id}_${(ticket.responses?.length || 0) + 1}`,
      content: replyText,
      createdAt: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      }
    };
    
    // Add response to ticket
    dispatch(addTicketResponse({
      ticketId: ticket.id,
      response
    }));
    
    // Clear reply text
    setReplyText('');
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="warning">Open</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'low':
        return <Badge variant="default">Low</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  if (loading || !ticket) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/support')}
          icon={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Back to Support
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ticket #{ticket.id}</h1>
      </div>

      {/* Ticket Details */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{ticket.subject}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
              <Badge variant="default" className="capitalize">{ticket.category.replace('_', ' ')}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusUpdate}
              onChange={handleStatusChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <Button variant="outline">Assign</Button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src={ticket.user.avatar} 
                alt={ticket.user.name} 
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">{ticket.user.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {ticket.content}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Ticket Activity & Responses */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity & Responses</h3>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </Badge>
            {ticket.assignedTo && (
              <Badge variant="default" className="flex items-center gap-1">
                <UserIcon className="w-3 h-3" />
                <span>
                  Assigned to: {ticket.assignedTo.name}
                </span>
              </Badge>
            )}
          </div>
        </div>

        {/* Response Timeline */}
        <div className="space-y-6 mb-6">
          {ticket.responses && ticket.responses.length > 0 ? (
            ticket.responses.map((response) => (
              <div key={response.id} className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={response.user.avatar} 
                      alt={response.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{response.user.name}</span>
                      {response.user.role === 'support' && (
                        <Badge variant="info">Support</Badge>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(response.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {response.content}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 border-t border-gray-200 dark:border-gray-700">
              <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">No responses yet</p>
            </div>
          )}
        </div>

        {/* Reply Form */}
        {ticket.status !== 'closed' && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Add Response</h4>
            <form onSubmit={handleSubmitReply}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your response..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
              />
              <div className="mt-4 flex justify-end">
                <Button type="submit">
                  Send Response
                </Button>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SupportTicket;