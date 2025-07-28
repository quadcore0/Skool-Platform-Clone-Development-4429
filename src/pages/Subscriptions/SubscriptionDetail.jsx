import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ExclamationCircleIcon, 
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { selectSubscription } from '../../store/slices/subscriptionSlice';

const SubscriptionDetail = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscriptions, selectedSubscription, plans } = useSelector((state) => state.subscriptions);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // If we already have the selected subscription and it matches the URL parameter
    if (selectedSubscription && selectedSubscription.id === subscriptionId) {
      setSubscription(selectedSubscription);
      setLoading(false);
      return;
    }
    
    // Otherwise, find the subscription in the subscriptions array
    const foundSubscription = subscriptions.find(s => s.id === subscriptionId);
    if (foundSubscription) {
      dispatch(selectSubscription(foundSubscription));
      setSubscription(foundSubscription);
    } else {
      // Handle subscription not found
      console.error('Subscription not found');
      // You might want to redirect to a 404 page or back to subscriptions list
    }
    
    setLoading(false);
  }, [subscriptionId, subscriptions, selectedSubscription, dispatch]);

  // Get plan details
  const getPlan = (planId) => {
    return plans.find(p => p.id === planId) || { name: planId, price: 0, features: [] };
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'canceled':
        return <Badge variant="danger">Canceled</Badge>;
      case 'past_due':
        return <Badge variant="warning">Past Due</Badge>;
      case 'trialing':
        return <Badge variant="info">Trial</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading || !subscription) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const plan = getPlan(subscription.plan);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/subscriptions')}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            icon={<PencilIcon className="w-4 h-4 mr-2" />}
            onClick={() => navigate(`/subscriptions/${subscription.id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Overview Card */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
            {getStatusBadge(subscription.status)}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Workspace</h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {subscription.workspace?.name || 'N/A'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Plan</h3>
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </p>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  (${subscription.price}/month)
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Plan Features</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                
                {subscription.endDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</h3>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h3>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {subscription.paymentMethod.replace('_', ' ')}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Billing Cycles</h3>
                  <p className="text-gray-900 dark:text-white">
                    {subscription.billingCycles}
                  </p>
                </div>
              </div>
            </div>
            
            {subscription.status === 'active' && (
              <div className="pt-2">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/10">
                  Cancel Subscription
                </Button>
              </div>
            )}
            
            {subscription.status === 'canceled' && (
              <div className="pt-2">
                <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-900 dark:hover:bg-blue-900/10">
                  Reactivate Subscription
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Subscription Details and Invoices */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Information */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Billing Information</h2>
              <Button size="sm" variant="outline" icon={<PencilIcon className="w-4 h-4 mr-1" />}>
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Billing Contact</h3>
                <p className="text-gray-900 dark:text-white">{subscription.user?.name || 'N/A'}</p>
                <p className="text-gray-600 dark:text-gray-400">{subscription.user?.email || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h3>
                <div className="flex items-center">
                  <CreditCardIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <p className="text-gray-900 dark:text-white capitalize">
                    {subscription.paymentMethod.replace('_', ' ')}
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {subscription.paymentMethod === 'credit_card' ? '•••• 4242' : ''}
                    </span>
                  </p>
                </div>
              </div>
              
              {subscription.nextInvoiceDate && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Next Invoice</h3>
                  <div className="flex items-center">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-gray-900 dark:text-white">
                        ${subscription.price} on {new Date(subscription.nextInvoiceDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatic payment
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {subscription.status === 'past_due' && (
                <div>
                  <h3 className="text-sm font-medium text-red-500 mb-1">Payment Issue</h3>
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                    <div>
                      <p className="text-red-600 dark:text-red-400">
                        Payment failed on {new Date(subscription.lastInvoiceDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please update payment method
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Invoices */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Invoices</h2>
            
            {subscription.invoices && subscription.invoices.length > 0 ? (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {subscription.invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{invoice.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {invoice.status === 'paid' && (
                            <Badge variant="success">Paid</Badge>
                          )}
                          {invoice.status === 'pending' && (
                            <Badge variant="warning">Pending</Badge>
                          )}
                          {invoice.status === 'failed' && (
                            <Badge variant="danger">Failed</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <Button size="xs" variant="outline">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">No invoices available for this subscription</p>
              </div>
            )}
          </Card>

          {/* Plan Changes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Plan Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Upgrade Plan</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Need more features or users? Upgrade your plan to get access to additional functionality.
                </p>
                <Button size="sm" variant="outline" icon={<ArrowPathIcon className="w-4 h-4 mr-1" />}>
                  Change Plan
                </Button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Billing Cycle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Currently billed monthly. Switch to annual billing to save 20%.
                </p>
                <Button size="sm" variant="outline" icon={<ArrowPathIcon className="w-4 h-4 mr-1" />}>
                  Switch to Annual
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;