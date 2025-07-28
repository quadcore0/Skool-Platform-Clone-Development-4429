import { format, subDays, addDays } from 'date-fns';

// Helper function to generate random date within range
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Helper function to generate random integer within range
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Helper function to pick random element from array
const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate demo users
export const generateDemoUsers = (count) => {
  const roles = ['admin', 'manager', 'user'];
  const statuses = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const firstName = randomElement([
      'John', 'Jane', 'Michael', 'Emma', 'David', 'Sarah', 'Robert', 'Lisa',
      'William', 'Olivia', 'James', 'Sophia', 'Thomas', 'Emily', 'Daniel'
    ]);
    const lastName = randomElement([
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis',
      'Garcia', 'Wilson', 'Taylor', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall'
    ]);
    
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const role = randomElement(roles);
    const status = randomElement(statuses);
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const lastLoginAt = randomDate(new Date(createdAt), new Date()).toISOString();
    
    return {
      id,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      role,
      status,
      createdAt,
      lastLoginAt,
      workspaces: randomInt(1, 5),
      avatar: `https://randomuser.me/api/portraits/${randomInt(0, 1) ? 'men' : 'women'}/${randomInt(1, 99)}.jpg`,
    };
  });
};

// Generate demo workspaces
export const generateDemoWorkspaces = (count) => {
  const statuses = ['active', 'archived', 'trial'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Manufacturing'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const name = randomElement([
      'Team Alpha', 'Project X', 'Innovate Labs', 'Growth Squad', 'Core Systems',
      'Future Vision', 'Strategic Ops', 'Dev Team', 'Marketing Hub', 'Design Studio',
      'Sales Force', 'Customer Success', 'Data Analytics', 'Research Group', 'Product Team'
    ]) + ` ${id}`;
    
    const status = randomElement(statuses);
    const industry = randomElement(industries);
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const updatedAt = randomDate(new Date(createdAt), new Date()).toISOString();
    const usersCount = randomInt(3, 50);
    const storageUsed = randomInt(10, 500);
    const storageLimit = 1000;
    
    return {
      id,
      name,
      description: `${name} is a workspace for ${industry.toLowerCase()} projects and collaboration.`,
      status,
      industry,
      createdAt,
      updatedAt,
      usersCount,
      storageUsed,
      storageLimit,
      owner: randomElement(generateDemoUsers(1)),
    };
  });
};

// Generate demo subscriptions
export const generateDemoSubscriptions = (count) => {
  const plans = ['free', 'starter', 'pro', 'enterprise'];
  const statuses = ['active', 'canceled', 'past_due', 'trialing'];
  const paymentMethods = ['credit_card', 'paypal', 'bank_transfer', 'invoice'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const plan = randomElement(plans);
    const status = randomElement(statuses);
    const paymentMethod = randomElement(paymentMethods);
    
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const startDate = createdAt;
    
    // Calculate end date based on status
    let endDate;
    if (status === 'canceled') {
      endDate = randomDate(new Date(startDate), new Date()).toISOString();
    } else if (status === 'trialing') {
      endDate = addDays(new Date(startDate), 14).toISOString();
    } else {
      endDate = addDays(new Date(startDate), 365).toISOString();
    }
    
    // Calculate price based on plan
    let price;
    switch (plan) {
      case 'free': price = 0; break;
      case 'starter': price = 19; break;
      case 'pro': price = 49; break;
      case 'enterprise': price = 99; break;
      default: price = 0;
    }
    
    const user = randomElement(generateDemoUsers(1));
    const workspace = randomElement(generateDemoWorkspaces(1));
    
    return {
      id,
      plan,
      status,
      paymentMethod,
      price,
      createdAt,
      startDate,
      endDate,
      renewalDate: status !== 'canceled' ? endDate : null,
      user,
      workspace,
      billingCycles: randomInt(1, 12),
      lastInvoiceDate: randomDate(new Date(startDate), new Date()).toISOString(),
      nextInvoiceDate: status !== 'canceled' ? addDays(new Date(), randomInt(1, 30)).toISOString() : null,
      invoices: Array.from({ length: randomInt(1, 6) }, (_, j) => ({
        id: `inv_${id}_${j + 1}`,
        amount: price,
        date: randomDate(new Date(startDate), new Date()).toISOString(),
        status: randomElement(['paid', 'pending', 'failed']),
      })),
    };
  });
};

// Generate demo features
export const generateDemoFeatures = (count) => {
  const types = ['core', 'beta', 'premium', 'enterprise'];
  const categories = ['UI', 'API', 'Integration', 'Analytics', 'Security'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const name = randomElement([
      'Dark Mode', 'API Access', 'Advanced Analytics', 'Custom Branding', 'SSO Integration',
      'Audit Logs', 'Webhooks', 'Team Collaboration', 'File Storage', 'Export Data',
      'Custom Domain', 'Priority Support', 'Bulk Actions', 'Advanced Search', 'Automated Reports'
    ]) + ` ${id}`;
    
    const key = name.toLowerCase().replace(/\s+/g, '_');
    const type = randomElement(types);
    const category = randomElement(categories);
    const enabled = Math.random() > 0.3; // 70% chance of being enabled
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const updatedAt = randomDate(new Date(createdAt), new Date()).toISOString();
    
    return {
      id,
      name,
      key,
      description: `${name} feature for ${category.toLowerCase()} functionality.`,
      type,
      category,
      enabled,
      createdAt,
      updatedAt,
      availablePlans: (() => {
        switch (type) {
          case 'core': return ['free', 'starter', 'pro', 'enterprise'];
          case 'beta': return ['pro', 'enterprise'];
          case 'premium': return ['pro', 'enterprise'];
          case 'enterprise': return ['enterprise'];
          default: return ['free', 'starter', 'pro', 'enterprise'];
        }
      })(),
    };
  });
};

// Generate demo API keys
export const generateDemoApiKeys = (count) => {
  const statuses = ['active', 'revoked', 'expired'];
  const scopes = ['read', 'write', 'admin'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const name = randomElement([
      'Production API Key', 'Development API Key', 'Testing API Key', 'Integration Key',
      'Webhook Key', 'Analytics Key', 'Admin Key', 'Read-Only Key', 'Client Key'
    ]) + ` ${id}`;
    
    const status = randomElement(statuses);
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const expiresAt = status === 'expired' 
      ? randomDate(new Date(createdAt), new Date()).toISOString()
      : addDays(new Date(), randomInt(30, 365)).toISOString();
    const revokedAt = status === 'revoked' ? randomDate(new Date(createdAt), new Date()).toISOString() : null;
    
    const workspace = randomElement(generateDemoWorkspaces(1));
    const createdBy = randomElement(generateDemoUsers(1));
    
    // Generate a fake API key with prefix
    const key = status === 'active' 
      ? `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      : null;
    
    // Random selection of scopes
    const selectedScopes = [];
    scopes.forEach(scope => {
      if (Math.random() > 0.3) {
        selectedScopes.push(scope);
      }
    });
    
    // Ensure at least one scope
    if (selectedScopes.length === 0) {
      selectedScopes.push('read');
    }
    
    return {
      id,
      name,
      key,
      status,
      scopes: selectedScopes,
      createdAt,
      expiresAt,
      revokedAt,
      lastUsedAt: status === 'active' ? randomDate(new Date(createdAt), new Date()).toISOString() : null,
      workspace,
      createdBy,
      usageCount: randomInt(0, 1000),
      rateLimit: randomInt(60, 1000),
    };
  });
};

// Generate demo notifications
export const generateDemoNotifications = (count) => {
  const types = ['system', 'marketing', 'billing', 'feature', 'security'];
  const statuses = ['draft', 'scheduled', 'sent', 'canceled'];
  const channels = ['email', 'in-app', 'push', 'sms'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const type = randomElement(types);
    
    // Generate title based on type
    let title;
    switch (type) {
      case 'system':
        title = randomElement([
          'System Maintenance Scheduled', 'New Feature Available', 'Important Security Update',
          'Service Disruption Notice', 'System Status Update'
        ]);
        break;
      case 'marketing':
        title = randomElement([
          'Special Offer Inside!', 'Introducing Our New Plan', 'Exclusive Webinar Invitation',
          'Product Update Newsletter', 'Join Our Referral Program'
        ]);
        break;
      case 'billing':
        title = randomElement([
          'Your Invoice is Ready', 'Payment Successfully Processed', 'Subscription Renewal Notice',
          'Action Required: Update Payment Method', 'Receipt for Your Recent Payment'
        ]);
        break;
      case 'feature':
        title = randomElement([
          'New Feature: Advanced Analytics', 'Try Our Beta Feature', 'Feature Update Available',
          'Feature Announcement: Dark Mode', 'New Integration Available'
        ]);
        break;
      case 'security':
        title = randomElement([
          'Security Alert: Unusual Login', 'Password Reset Required', 'Two-Factor Authentication Reminder',
          'Security Best Practices', 'Privacy Policy Update'
        ]);
        break;
      default:
        title = 'Notification';
    }
    
    const status = randomElement(statuses);
    const selectedChannels = [];
    channels.forEach(channel => {
      if (Math.random() > 0.5) {
        selectedChannels.push(channel);
      }
    });
    
    // Ensure at least one channel
    if (selectedChannels.length === 0) {
      selectedChannels.push('email');
    }
    
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const scheduledAt = status === 'scheduled' ? addDays(new Date(), randomInt(1, 14)).toISOString() : null;
    const sentAt = status === 'sent' ? randomDate(new Date(createdAt), new Date()).toISOString() : null;
    
    return {
      id,
      title,
      content: `This is a ${type} notification with important information for all users. ${Math.random().toString(36).substring(2, 15)}`,
      type,
      status,
      channels: selectedChannels,
      createdAt,
      scheduledAt,
      sentAt,
      targetAudience: randomElement(['all', 'free_users', 'paid_users', 'admins']),
      createdBy: randomElement(generateDemoUsers(1)),
      stats: status === 'sent' ? {
        delivered: randomInt(50, 1000),
        opened: randomInt(20, 500),
        clicked: randomInt(5, 200),
      } : null,
    };
  });
};

// Generate demo support tickets
export const generateDemoSupportTickets = (count) => {
  const statuses = ['open', 'in_progress', 'resolved', 'closed'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const categories = ['billing', 'technical', 'feature_request', 'account', 'general'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const status = randomElement(statuses);
    const priority = randomElement(priorities);
    const category = randomElement(categories);
    
    // Generate subject based on category
    let subject;
    switch (category) {
      case 'billing':
        subject = randomElement([
          'Issue with my recent invoice', 'Cannot update payment method', 'Question about subscription',
          'Billing cycle confusion', 'Refund request'
        ]);
        break;
      case 'technical':
        subject = randomElement([
          'API integration error', 'Website not loading correctly', 'Data export issue',
          'Error 500 when saving settings', 'Performance problems'
        ]);
        break;
      case 'feature_request':
        subject = randomElement([
          'Suggestion for new analytics feature', 'Request for dark mode', 'Need better export options',
          'Integration with third-party service', 'Mobile app request'
        ]);
        break;
      case 'account':
        subject = randomElement([
          'Cannot reset password', 'Need to change email address', 'User permissions issue',
          'Account verification problem', 'How to delete my account'
        ]);
        break;
      case 'general':
        subject = randomElement([
          'General question about your service', 'Documentation request', 'Pricing question',
          'Partnership inquiry', 'Feedback on recent update'
        ]);
        break;
      default:
        subject = 'Support request';
    }
    
    const createdAt = randomDate(new Date(2022, 0, 1), new Date()).toISOString();
    const updatedAt = randomDate(new Date(createdAt), new Date()).toISOString();
    const resolvedAt = ['resolved', 'closed'].includes(status) ? randomDate(new Date(createdAt), new Date()).toISOString() : null;
    
    const user = randomElement(generateDemoUsers(1));
    
    // Generate responses based on status
    let responses = [];
    if (status !== 'open') {
      const responseCount = randomInt(1, 5);
      const supportAgents = generateDemoUsers(3).map(u => ({ ...u, role: 'support' }));
      
      for (let j = 0; j < responseCount; j++) {
        const isCustomer = j % 2 === 0 && j > 0;
        const responder = isCustomer ? user : randomElement(supportAgents);
        
        responses.push({
          id: `resp_${id}_${j + 1}`,
          content: `This is a ${isCustomer ? 'customer' : 'support'} response to the ticket. ${Math.random().toString(36).substring(2, 15)}`,
          createdAt: randomDate(new Date(createdAt), new Date()).toISOString(),
          user: responder,
        });
      }
      
      // Sort responses by date
      responses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    return {
      id,
      subject,
      content: `I'm having an issue with ${subject.toLowerCase()}. Please help me resolve this problem. ${Math.random().toString(36).substring(2, 15)}`,
      status,
      priority,
      category,
      createdAt,
      updatedAt,
      resolvedAt,
      user,
      assignedTo: status === 'in_progress' ? randomElement(generateDemoUsers(1)) : null,
      responses,
    };
  });
};

// Generate analytics data
export const generateDemoAnalytics = () => {
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);
  
  // Generate daily data for the past 30 days
  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = format(subDays(today, 29 - i), 'yyyy-MM-dd');
    
    return {
      date,
      newUsers: randomInt(5, 50),
      activeUsers: randomInt(50, 200),
      revenue: randomInt(500, 5000),
      apiCalls: randomInt(1000, 10000),
      subscriptions: randomInt(1, 10),
      churn: randomInt(0, 5),
    };
  });
  
  // Generate monthly data for the past 12 months
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - 11 + i, 1);
    const month = format(monthDate, 'yyyy-MM');
    
    return {
      month,
      newUsers: randomInt(50, 500),
      activeUsers: randomInt(500, 2000),
      revenue: randomInt(5000, 50000),
      apiCalls: randomInt(10000, 100000),
      subscriptions: randomInt(10, 100),
      churn: randomInt(1, 20),
    };
  });
  
  // Feature usage data
  const features = generateDemoFeatures(10);
  const featureUsage = features.map(feature => ({
    id: feature.id,
    name: feature.name,
    usageCount: randomInt(100, 10000),
    activeUsers: randomInt(10, 1000),
    growth: randomInt(-20, 50),
  }));
  
  // Plan distribution
  const planDistribution = [
    { name: 'Free', value: randomInt(500, 2000) },
    { name: 'Starter', value: randomInt(100, 500) },
    { name: 'Professional', value: randomInt(50, 200) },
    { name: 'Enterprise', value: randomInt(10, 50) },
  ];
  
  // User retention cohort
  const userRetention = Array.from({ length: 6 }, (_, i) => {
    const cohortMonth = format(new Date(today.getFullYear(), today.getMonth() - 5 + i, 1), 'yyyy-MM');
    
    return {
      cohort: cohortMonth,
      initialUsers: randomInt(100, 500),
      month1: randomInt(70, 95),
      month2: randomInt(50, 80),
      month3: randomInt(40, 70),
      month4: randomInt(30, 60),
      month5: randomInt(25, 55),
      month6: randomInt(20, 50),
    };
  });
  
  return {
    dailyData,
    monthlyData,
    featureUsage,
    planDistribution,
    userRetention,
    summary: {
      totalUsers: randomInt(5000, 20000),
      activeUsers: randomInt(1000, 10000),
      totalRevenue: randomInt(50000, 500000),
      averageRevenuePerUser: randomInt(10, 100),
      churnRate: (randomInt(1, 10) / 100).toFixed(2),
    }
  };
};