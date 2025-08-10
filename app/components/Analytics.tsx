
'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Target,
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  leadsSourced: number;
  emailsSent: number;
  emailsOpened: number;
  emailsReplied: number;
  callsMade: number;
  callsAnswered: number;
  meetingsScheduled: number;
  meetingsCompleted: number;
  conversions: number;
  revenue: number;
}

export function Analytics() {
  const [timePeriod, setTimePeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  const [analyticsData] = useState<AnalyticsData[]>([
    {
      period: '30d',
      leadsSourced: 247,
      emailsSent: 1456,
      emailsOpened: 623,
      emailsReplied: 187,
      callsMade: 89,
      callsAnswered: 34,
      meetingsScheduled: 23,
      meetingsCompleted: 19,
      conversions: 7,
      revenue: 42000
    }
  ]);

  const currentData = analyticsData[0];

  const metrics = [
    {
      title: 'Leads Sourced',
      value: currentData.leadsSourced,
      change: 15.2,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Email Open Rate',
      value: `${((currentData.emailsOpened / currentData.emailsSent) * 100).toFixed(1)}%`,
      change: 3.7,
      icon: Mail,
      color: 'green'
    },
    {
      title: 'Response Rate',
      value: `${((currentData.emailsReplied / currentData.emailsSent) * 100).toFixed(1)}%`,
      change: -1.2,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Call Answer Rate',
      value: `${((currentData.callsAnswered / currentData.callsMade) * 100).toFixed(1)}%`,
      change: 8.4,
      icon: Phone,
      color: 'orange'
    },
    {
      title: 'Meeting Show Rate',
      value: `${((currentData.meetingsCompleted / currentData.meetingsScheduled) * 100).toFixed(1)}%`,
      change: 5.6,
      icon: Calendar,
      color: 'emerald'
    },
    {
      title: 'Conversion Rate',
      value: `${((currentData.conversions / currentData.leadsSourced) * 100).toFixed(1)}%`,
      change: 12.8,
      icon: Target,
      color: 'indigo'
    }
  ];

  const funnelData = [
    { stage: 'Leads Sourced', count: currentData.leadsSourced, percentage: 100 },
    { stage: 'Emails Sent', count: currentData.emailsSent, percentage: 85 },
    { stage: 'Emails Opened', count: currentData.emailsOpened, percentage: 43 },
    { stage: 'Emails Replied', count: currentData.emailsReplied, percentage: 13 },
    { stage: 'Meetings Scheduled', count: currentData.meetingsScheduled, percentage: 9 },
    { stage: 'Meetings Completed', count: currentData.meetingsCompleted, percentage: 8 },
    { stage: 'Conversions', count: currentData.conversions, percentage: 3 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
      indigo: 'bg-indigo-500 text-indigo-600 bg-indigo-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const MetricCard = ({ metric }: { metric: any }) => {
    const Icon = metric.icon;
    const colorClasses = getColorClasses(metric.color).split(' ');
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            <div className="flex items-center mt-2">
              {metric.change > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[2]}`}>
            <Icon className={`w-6 h-6 ${colorClasses[1]}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
            <p className="text-gray-600">Track your lead automation performance and ROI</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-blue focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Revenue and Time Saved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Impact</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Generated Revenue</span>
                <span className="text-2xl font-bold text-green-600">
                  ${currentData.revenue.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Average deal size: ${(currentData.revenue / currentData.conversions).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pipeline Value</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${(currentData.revenue * 2.3).toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Estimated value of active opportunities
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Time Saved</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-2xl font-bold text-blue-600">47 hours</span>
              </div>
              <div className="text-xs text-gray-500">
                Automated tasks that would take manual effort
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Cost Savings</span>
                <span className="text-lg font-semibold text-gray-900">$2,350</span>
              </div>
              <div className="text-xs text-gray-500">
                Based on $50/hour saved automation value
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
          <p className="text-sm text-gray-600 mt-1">Track your lead journey from sourcing to conversion</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700 text-right">
                  {stage.stage}
                </div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-base-blue to-blue-500 transition-all duration-300"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-sm font-medium text-white">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                </div>
                {index > 0 && (
                  <div className="w-16 text-sm text-gray-500 text-center">
                    {((stage.count / funnelData[index - 1].count) * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Email</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">12.8% conversion</div>
                  <div className="text-sm text-gray-500">1,456 sent</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Phone</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">38.2% conversion</div>
                  <div className="text-sm text-gray-500">34 connected</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">LinkedIn</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">8.7% conversion</div>
                  <div className="text-sm text-gray-500">203 reached</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Best Performing Times</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Email Open Times</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tuesday 10:00 AM</span>
                    <span className="font-medium text-green-600">47% open rate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Thursday 2:00 PM</span>
                    <span className="font-medium text-green-600">43% open rate</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Call Answer Times</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Wednesday 11:00 AM</span>
                    <span className="font-medium text-blue-600">68% answer rate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Friday 3:00 PM</span>
                    <span className="font-medium text-blue-600">61% answer rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
