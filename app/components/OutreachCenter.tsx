
'use client';

import { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Phone, 
  Calendar,
  PlayCircle,
  PauseCircle,
  Settings,
  BarChart3,
  Users,
  Eye,
  Edit3
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'phone' | 'mixed';
  status: 'active' | 'paused' | 'completed' | 'draft';
  leads: number;
  sent: number;
  opened: number;
  replied: number;
  scheduled: number;
  createdDate: string;
}

interface OutreachTemplate {
  id: string;
  name: string;
  type: 'email' | 'linkedin';
  subject?: string;
  content: string;
  variables: string[];
}

export function OutreachCenter() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'sequences'>('campaigns');
  
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q1 SaaS Founders Outreach',
      type: 'email',
      status: 'active',
      leads: 150,
      sent: 142,
      opened: 89,
      replied: 23,
      scheduled: 7,
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'LinkedIn CTOs Engagement',
      type: 'linkedin',
      status: 'active',
      leads: 87,
      sent: 87,
      opened: 62,
      replied: 15,
      scheduled: 4,
      createdDate: '2024-01-08'
    },
    {
      id: '3',
      name: 'Follow-up Call Campaign',
      type: 'phone',
      status: 'paused',
      leads: 45,
      sent: 32,
      opened: 0,
      replied: 8,
      scheduled: 3,
      createdDate: '2024-01-05'
    }
  ]);

  const [templates] = useState<OutreachTemplate[]>([
    {
      id: '1',
      name: 'Cold Email - SaaS Introduction',
      type: 'email',
      subject: 'Quick question about {{company_name}}\'s growth',
      content: 'Hi {{first_name}},\n\nI noticed {{company_name}} has been growing rapidly in the {{industry}} space. I\'d love to share how we\'ve helped similar companies...',
      variables: ['first_name', 'company_name', 'industry']
    },
    {
      id: '2',
      name: 'LinkedIn Connection Request',
      type: 'linkedin',
      content: 'Hi {{first_name}}, I see you\'re doing great work at {{company_name}}. Would love to connect and share insights about {{industry}} trends.',
      variables: ['first_name', 'company_name', 'industry']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <MessageSquare className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'mixed': return <Users className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : '0.0';
  };

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-base-light rounded-lg">
            {getTypeIcon(campaign.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
            <p className="text-sm text-gray-500">
              Created {new Date(campaign.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{campaign.leads}</div>
          <div className="text-xs text-gray-500">Leads</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{campaign.sent}</div>
          <div className="text-xs text-gray-500">Sent</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{campaign.opened}</div>
          <div className="text-xs text-gray-500">Opened</div>
          <div className="text-xs text-green-600">{calculateRate(campaign.opened, campaign.sent)}%</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{campaign.replied}</div>
          <div className="text-xs text-gray-500">Replied</div>
          <div className="text-xs text-purple-600">{calculateRate(campaign.replied, campaign.sent)}%</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{campaign.scheduled}</div>
          <div className="text-xs text-gray-500">Meetings</div>
          <div className="text-xs text-orange-600">{calculateRate(campaign.scheduled, campaign.replied)}%</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {campaign.status === 'active' ? (
            <button className="flex items-center space-x-1 text-sm text-yellow-600 hover:text-yellow-700">
              <PauseCircle className="w-4 h-4" />
              <span>Pause</span>
            </button>
          ) : (
            <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700">
              <PlayCircle className="w-4 h-4" />
              <span>Resume</span>
            </button>
          )}
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-sm text-base-blue hover:text-blue-600">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-base-blue hover:text-blue-600">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );

  const TemplateCard = ({ template }: { template: OutreachTemplate }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-base-light rounded-lg">
            {getTypeIcon(template.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            {template.subject && (
              <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
            )}
          </div>
        </div>
        <button className="flex items-center space-x-1 text-sm text-base-blue hover:text-blue-600">
          <Edit3 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-700 line-clamp-3">{template.content}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {template.variables.map(variable => (
            <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
              {variable}
            </span>
          ))}
        </div>
        <button className="text-sm text-base-blue hover:text-blue-600 font-medium">
          Use Template
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Outreach Center</h2>
            <p className="text-gray-600">Manage your multi-channel outreach campaigns and templates</p>
          </div>
          <button className="bg-base-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'campaigns', label: 'Campaigns', icon: Send },
              { id: 'templates', label: 'Templates', icon: Edit3 },
              { id: 'sequences', label: 'Sequences', icon: Calendar },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-base-blue text-base-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {campaigns.filter(c => c.status === 'active').length}
                  </div>
                  <div className="text-sm text-blue-700">Active Campaigns</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {campaigns.reduce((acc, c) => acc + c.sent, 0)}
                  </div>
                  <div className="text-sm text-green-700">Total Sent</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {campaigns.reduce((acc, c) => acc + c.replied, 0)}
                  </div>
                  <div className="text-sm text-purple-700">Total Replies</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {campaigns.reduce((acc, c) => acc + c.scheduled, 0)}
                  </div>
                  <div className="text-sm text-orange-700">Meetings Booked</div>
                </div>
              </div>

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Create and manage reusable message templates</p>
                <button className="bg-base-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  New Template
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {templates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sequences' && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sequence Builder Coming Soon</h3>
              <p className="text-gray-600">Create automated multi-step outreach sequences with smart timing and follow-ups.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
