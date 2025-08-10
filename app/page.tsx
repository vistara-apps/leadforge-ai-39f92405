
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useNotification,
} from '@coinbase/onchainkit/minikit';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Name,
  Identity,
  Address,
  Avatar,
} from '@coinbase/onchainkit/identity';
import { Dashboard } from './components/Dashboard';
import { LeadSourcer } from './components/LeadSourcer';
import { ICPBuilder } from './components/ICPBuilder';
import { OutreachCenter } from './components/OutreachCenter';
import { Calendar } from './components/Calendar';
import { Analytics } from './components/Analytics';
import { 
  Users, 
  Target, 
  MessageCircle, 
  CalendarDays, 
  BarChart3,
  Home 
} from 'lucide-react';

type TabType = 'dashboard' | 'icp' | 'sourcing' | 'outreach' | 'calendar' | 'analytics';

export default function LeadAutomationPlatform() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    if (result) {
      setFrameAdded(true);
      await sendNotification({
        title: 'Lead Automation Platform Added! 🎯',
        body: 'Start automating your lead generation and outreach workflow.',
      });
    }
  }, [addFrame, sendNotification]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added && !frameAdded) {
      return (
        <button
          onClick={handleAddFrame}
          className="bg-base-blue text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Save Frame
        </button>
      );
    }
    return null;
  }, [context, frameAdded, handleAddFrame]);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'icp' as TabType, label: 'ICP Builder', icon: Target },
    { id: 'sourcing' as TabType, label: 'Lead Sourcing', icon: Users },
    { id: 'outreach' as TabType, label: 'Outreach', icon: MessageCircle },
    { id: 'calendar' as TabType, label: 'Calendar', icon: CalendarDays },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'icp':
        return <ICPBuilder />;
      case 'sourcing':
        return <LeadSourcer />;
      case 'outreach':
        return <OutreachCenter />;
      case 'calendar':
        return <Calendar />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-light to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-base-blue rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Lead Automation</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {saveFrameButton}
              <Wallet className="z-10">
                <ConnectWallet className="bg-base-blue hover:bg-blue-600">
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
              <button
                onClick={close}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-base-blue text-base-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Built for solo founders and small teams
            </p>
            <button
              onClick={() => openUrl('https://base.org')}
              className="text-sm text-base-blue hover:text-blue-600"
            >
              Built on Base
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
