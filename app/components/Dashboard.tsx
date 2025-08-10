
'use client';

import { useState } from 'react';
import { 
  Users, 
  Target, 
  MessageCircle, 
  CalendarDays,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export function Dashboard() {
  const [stats] = useState({
    totalLeads: 1247,
    verifiedLeads: 856,
    activeOutreach: 23,
    scheduledMeetings: 7,
    conversionRate: 12.3,
    responseRate: 34.7
  });

  const [recentActivity] = useState([
    { id: 1, type: 'lead_added', message: '15 new leads sourced from LinkedIn', time: '2 hours ago' },
    { id: 2, type: 'meeting_scheduled', message: 'Meeting scheduled with John Doe', time: '4 hours ago' },
    { id: 3, type: 'outreach_sent', message: 'Email sequence sent to 12 leads', time: '6 hours ago' },
    { id: 4, type: 'lead_verified', message: '8 leads verified successfully', time: '8 hours ago' }
  ]);

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-base-blue to-blue-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Lead Automation</h2>
        <p className="text-blue-100 text-lg">
          Streamline your lead generation and outreach process with AI-powered automation
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Leads"
          value={stats.totalLeads.toLocaleString()}
          change={15.2}
          color="bg-blue-500"
        />
        <StatCard
          icon={CheckCircle}
          title="Verified Leads"
          value={stats.verifiedLeads.toLocaleString()}
          change={8.7}
          color="bg-green-500"
        />
        <StatCard
          icon={MessageCircle}
          title="Active Outreach"
          value={stats.activeOutreach}
          change={-2.1}
          color="bg-purple-500"
        />
        <StatCard
          icon={CalendarDays}
          title="Scheduled Meetings"
          value={stats.scheduledMeetings}
          change={25.0}
          color="bg-orange-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change={3.2}
          color="bg-emerald-500"
        />
        <StatCard
          icon={Target}
          title="Response Rate"
          value={`${stats.responseRate}%`}
          change={5.8}
          color="bg-indigo-500"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'lead_added' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'meeting_scheduled' && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'outreach_sent' && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-purple-600" />
                      </div>
                    )}
                    {activity.type === 'lead_verified' && (
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-base-blue hover:bg-base-light transition-colors">
                <Users className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">Source New Leads</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-base-blue hover:bg-base-light transition-colors">
                <Target className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">Update ICP</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-base-blue hover:bg-base-light transition-colors">
                <MessageCircle className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">Start Outreach</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-base-blue hover:bg-base-light transition-colors">
                <CalendarDays className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Lead Quality Score</h4>
              <p className="text-3xl font-bold text-blue-600">8.7/10</p>
              <p className="text-sm text-gray-500">Based on verification data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Outreach Success</h4>
              <p className="text-3xl font-bold text-green-600">34.7%</p>
              <p className="text-sm text-gray-500">Response rate this month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Time Saved</h4>
              <p className="text-3xl font-bold text-purple-600">23h</p>
              <p className="text-sm text-gray-500">Automation this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
