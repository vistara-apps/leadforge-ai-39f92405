
'use client';

import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Phone, 
  MapPin,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  lead: string;
  company: string;
  date: Date;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const [meetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Discovery Call',
      lead: 'Sarah Chen',
      company: 'TechFlow Inc',
      date: new Date(2024, 0, 18, 10, 0),
      time: '10:00 AM',
      duration: 30,
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Product Demo',
      lead: 'Michael Rodriguez',
      company: 'StartupXYZ',
      date: new Date(2024, 0, 19, 14, 0),
      time: '2:00 PM',
      duration: 45,
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Follow-up Call',
      lead: 'Jennifer Park',
      company: 'DataCorp',
      date: new Date(2024, 0, 22, 11, 0),
      time: '11:00 AM',
      duration: 15,
      type: 'phone',
      status: 'scheduled'
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMeetingsForDate = (date: Date) => {
    return meetings.filter(meeting => isSameDay(meeting.date, date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-base-light rounded-lg">
            {getTypeIcon(meeting.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
            <p className="text-sm text-gray-600">with {meeting.lead} from {meeting.company}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
          {meeting.status}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{format(meeting.date, 'MMM d, yyyy')}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{meeting.time} ({meeting.duration}min)</span>
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="text-base-blue hover:text-blue-600 text-sm font-medium">
            Join Meeting
          </button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">
            Reschedule
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings className="w-4 h-4" />
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
            <h2 className="text-2xl font-bold text-gray-900">Calendar & Scheduling</h2>
            <p className="text-gray-600">Manage your meetings and availability</p>
          </div>
          <button className="bg-base-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {['month', 'week', 'day'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    viewMode === mode
                      ? 'bg-base-blue text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {viewMode === 'month' && (
              <div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map(day => {
                    const dayMeetings = getMeetingsForDate(day);
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          min-h-[80px] p-2 border border-gray-100 hover:bg-gray-50 transition-colors
                          ${isSelected ? 'bg-base-blue text-white' : ''}
                          ${isToday && !isSelected ? 'bg-blue-50 text-base-blue border-base-blue' : ''}
                          ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-900'}
                        `}
                      >
                        <div className="text-sm font-medium mb-1">
                          {format(day, 'd')}
                        </div>
                        {dayMeetings.length > 0 && (
                          <div className="space-y-1">
                            {dayMeetings.slice(0, 2).map(meeting => (
                              <div
                                key={meeting.id}
                                className={`text-xs p-1 rounded ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {meeting.time}
                              </div>
                            ))}
                            {dayMeetings.length > 2 && (
                              <div className={`text-xs ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                                +{dayMeetings.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {getMeetingsForDate(new Date()).length > 0 ? (
                getMeetingsForDate(new Date()).map(meeting => (
                  <div key={meeting.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-base-light rounded">
                      {getTypeIcon(meeting.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{meeting.title}</p>
                      <p className="text-xs text-gray-600">{meeting.time} with {meeting.lead}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No meetings scheduled for today</p>
              )}
            </div>
          </div>

          {/* Meeting Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Meetings</span>
                <span className="font-semibold text-gray-900">{meetings.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scheduled</span>
                <span className="font-semibold text-blue-600">
                  {meetings.filter(m => m.status === 'scheduled').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">
                  {meetings.filter(m => m.status === 'completed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">No Shows</span>
                <span className="font-semibold text-red-600">
                  {meetings.filter(m => m.status === 'no-show').length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-4 h-4 text-base-blue" />
                  <span className="text-sm font-medium">Set Availability</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="w-4 h-4 text-base-blue" />
                  <span className="text-sm font-medium">Meeting Preferences</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-base-blue" />
                  <span className="text-sm font-medium">Booking Link</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {meetings
              .filter(meeting => meeting.date >= new Date())
              .map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
