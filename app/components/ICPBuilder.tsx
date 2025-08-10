
'use client';

import { useState } from 'react';
import { Target, Plus, Trash2, Save, Users, Building, MapPin, DollarSign } from 'lucide-react';

interface ICPCriteria {
  id: string;
  category: 'company' | 'role' | 'geography' | 'technographics';
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range';
  value: string;
}

export function ICPBuilder() {
  const [icpName, setIcpName] = useState('B2B SaaS Founders');
  const [criteria, setCriteria] = useState<ICPCriteria[]>([
    {
      id: '1',
      category: 'company',
      field: 'company_size',
      operator: 'in_range',
      value: '10-50'
    },
    {
      id: '2',
      category: 'role',
      field: 'job_title',
      operator: 'contains',
      value: 'Founder, CEO, CTO'
    }
  ]);

  const [savedICPs] = useState([
    { id: 'icp1', name: 'B2B SaaS Founders', leads: 234, active: true },
    { id: 'icp2', name: 'E-commerce Directors', leads: 156, active: false },
    { id: 'icp3', name: 'Marketing VPs', leads: 89, active: true },
  ]);

  const categoryOptions = [
    { value: 'company', label: 'Company', icon: Building },
    { value: 'role', label: 'Role & Title', icon: Users },
    { value: 'geography', label: 'Geography', icon: MapPin },
    { value: 'technographics', label: 'Technology', icon: Target },
  ];

  const fieldOptions = {
    company: ['company_size', 'industry', 'revenue', 'funding_stage', 'growth_rate'],
    role: ['job_title', 'seniority_level', 'department', 'years_experience'],
    geography: ['country', 'state', 'city', 'timezone'],
    technographics: ['tech_stack', 'tools_used', 'platform', 'integrations'],
  };

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'in_range', label: 'In range' },
  ];

  const addCriteria = () => {
    const newCriteria: ICPCriteria = {
      id: Date.now().toString(),
      category: 'company',
      field: 'company_size',
      operator: 'equals',
      value: ''
    };
    setCriteria([...criteria, newCriteria]);
  };

  const updateCriteria = (id: string, updates: Partial<ICPCriteria>) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const removeCriteria = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const handleSaveICP = () => {
    console.log('Saving ICP:', { name: icpName, criteria });
    // Here you would typically save to a backend service
    alert('ICP saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ideal Customer Profile Builder</h2>
            <p className="text-gray-600">Define your target audience for precise lead sourcing</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveICP}
              className="bg-base-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save ICP</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ICP Builder Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* ICP Name */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ICP Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ICP Name
              </label>
              <input
                type="text"
                value={icpName}
                onChange={(e) => setIcpName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-base-blue focus:border-transparent"
                placeholder="e.g., B2B SaaS Founders"
              />
            </div>
          </div>

          {/* Criteria Builder */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Targeting Criteria</h3>
              <button
                onClick={addCriteria}
                className="bg-base-blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Criteria</span>
              </button>
            </div>

            <div className="space-y-4">
              {criteria.map((criterion, index) => (
                <div key={criterion.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Criteria {index + 1}
                    </span>
                    <button
                      onClick={() => removeCriteria(criterion.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Category
                      </label>
                      <select
                        value={criterion.category}
                        onChange={(e) => updateCriteria(criterion.id, { 
                          category: e.target.value as ICPCriteria['category'],
                          field: fieldOptions[e.target.value as ICPCriteria['category']][0]
                        })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-base-blue"
                      >
                        {categoryOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Field */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Field
                      </label>
                      <select
                        value={criterion.field}
                        onChange={(e) => updateCriteria(criterion.id, { field: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-base-blue"
                      >
                        {fieldOptions[criterion.category].map(field => (
                          <option key={field} value={field}>
                            {field.replace('_', ' ').toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Operator */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Operator
                      </label>
                      <select
                        value={criterion.operator}
                        onChange={(e) => updateCriteria(criterion.id, { operator: e.target.value as ICPCriteria['operator'] })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-base-blue"
                      >
                        {operatorOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Value */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={criterion.value}
                        onChange={(e) => updateCriteria(criterion.id, { value: e.target.value })}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-base-blue"
                        placeholder="Enter value..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ICP Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{icpName}</h4>
              <div className="space-y-2">
                {criteria.map((criterion, index) => (
                  <div key={criterion.id} className="text-sm text-gray-600">
                    {index + 1}. {criterion.field.replace('_', ' ')} {criterion.operator.replace('_', ' ')} "{criterion.value}"
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Estimated match: <span className="font-medium text-base-blue">~1,247 leads</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved ICPs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved ICPs</h3>
            <div className="space-y-3">
              {savedICPs.map((icp) => (
                <div key={icp.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{icp.name}</h4>
                    <span className={`w-2 h-2 rounded-full ${icp.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{icp.leads} matching leads</p>
                  <div className="flex space-x-2">
                    <button className="text-xs text-base-blue hover:text-blue-600 font-medium">
                      Edit
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Duplicate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ICP Performance */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ICP Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Match Quality</span>
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="text-sm font-medium text-blue-600">34.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="text-sm font-medium text-purple-600">12.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
