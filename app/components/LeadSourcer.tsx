
'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Star,
  Building,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  score: number;
  status: 'new' | 'verified' | 'contacted' | 'converted';
  source: string;
  addedDate: string;
}

export function LeadSourcer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isSourceLoading, setIsSourceLoading] = useState(false);

  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'VP of Engineering',
      company: 'TechFlow Inc',
      email: 'sarah@techflow.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/sarahchen',
      score: 92,
      status: 'new',
      source: 'LinkedIn',
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Founder & CEO',
      company: 'StartupXYZ',
      email: 'mike@startupxyz.co',
      location: 'Austin, TX',
      linkedin: 'https://linkedin.com/in/mrodriguez',
      score: 87,
      status: 'verified',
      source: 'Sales Navigator',
      addedDate: '2024-01-14'
    },
    {
      id: '3',
      name: 'Jennifer Park',
      title: 'CTO',
      company: 'DataCorp',
      email: 'j.park@datacorp.io',
      phone: '+1 (555) 987-6543',
      location: 'Seattle, WA',
      score: 78,
      status: 'contacted',
      source: 'Company Website',
      addedDate: '2024-01-13'
    }
  ]);

  const sources = ['all', 'LinkedIn', 'Sales Navigator', 'Company Website', 'Industry Reports', 'Referrals'];
  const statuses = ['all', 'new', 'verified', 'contacted', 'converted'];

  const handleSourceLeads = () => {
    setIsSourceLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSourceLoading(false);
      alert('Found 47 new leads matching your ICP criteria!');
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'status-badge';
    switch (status) {
      case 'new': return `${baseClasses} status-new`;
      case 'verified': return `${baseClasses} status-verified`;
      case 'contacted': return `${baseClasses} status-contacted`;
      case 'converted': return `${baseClasses} status-converted`;
      default: return baseClasses;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    
    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lead Sourcing</h2>
            <p className="text-gray-600">Discover and verify high-quality leads for your outreach campaigns</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSourceLeads}
              disabled={isSourceLoading}
              className="bg-base-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isSourceLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{isSourceLoading ? 'Sourcing...' : 'Source New Leads'}</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads by name, company, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Source Filter */}
          <div className="sm:w-48">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-blue focus:border-transparent"
            >
              {sources.map(source => (
                <option key={source} value={source}>
                  {source === 'all' ? 'All Sources' : source}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-blue focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-blue-600">{leads.length}</p>
          <p className="text-sm text-gray-600">Total Leads</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'verified').length}</p>
          <p className="text-sm text-gray-600">Verified</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-yellow-600">{leads.filter(l => l.status === 'contacted').length}</p>
          <p className="text-sm text-gray-600">Contacted</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-purple-600">{Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length)}</p>
          <p className="text-sm text-gray-600">Avg Score</p>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Leads ({filteredLeads.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-base-blue to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {lead.name.charAt(0)}
                  </div>

                  {/* Lead Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">{lead.name}</h4>
                      <span className={getStatusBadge(lead.status)}>
                        {lead.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{lead.title} at {lead.company}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{lead.location}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="flex items-center space-x-1 text-base-blue hover:text-blue-600">
                          <Mail className="w-4 h-4" />
                          <span>{lead.email}</span>
                        </a>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </a>
                      )}
                      {lead.linkedin && (
                        <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Source: {lead.source}</span>
                        <span>Added: {new Date(lead.addedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score and Actions */}
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
