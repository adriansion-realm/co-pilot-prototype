'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Calendar,
  Check,
  Plus,
  Building2,
  Heart,
  DollarSign,
  Clock,
  PhoneOff,
  Loader,
  CircleAlert,
  Circle,
  ExternalLink,
  Layers,
  ChevronRight,
  ChevronDown,
  ListChecks,
  User,
  TrendingUp,
  Ban,
  Zap,
  Shield,
  Bell,
  Sparkles,
  LayoutGrid,
  Settings
} from 'lucide-react';

export default function OpportunityDetailPage() {
  const router = useRouter();
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState<'status' | 'vendors' | 'risks' | 'notifications'>('status');
  const [statusSummary, setStatusSummary] = useState(
    `Nedu and Kishaya completed a detailed project planning call on January 14, 2026, clarifying scope, priorities, and budget constraints; the main blocker is aligning the project scope with Nedu's $100K target budget, as initial estimates were significantly higher.

No contractors have been matched or site visits scheduled yet; vendor matching is the immediate next step, with Kishaya aiming to introduce contractor options within the next week.

Nedu is scheduled to meet with a finance partner on January 15, 2026, to explore funding options, which may influence project phasing and scope decisions.`
  );
  const [expandedRisks, setExpandedRisks] = useState<Set<string>>(new Set(['stage']));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleRisk = (riskId: string) => {
    setExpandedRisks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(riskId)) {
        newSet.delete(riskId);
      } else {
        newSet.add(riskId);
      }
      return newSet;
    });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [statusSummary, activeTab]);

  // Sample tasks
  const allTasks = [
    { id: 1, title: 'Match and approve qualified vendors', completed: true, date: 'Mar 12' },
    { id: 2, title: 'Match and approve qualified vendors', completed: true, date: 'Mar 15' },
    { id: 3, title: 'Match and approve qualified vendors', completed: true, date: 'Mar 25' },
    { id: 4, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
    { id: 5, title: 'Match and approve qualified vendors', completed: false, date: 'Mar 16' },
    { id: 6, title: 'Match and approve qualified vendors', completed: false, date: 'Mar 17' },
  ];

  const tasks = showCompleted ? allTasks : allTasks.filter(t => !t.completed);

  return (
    <div className="flex h-screen" style={{ background: '#FCFAF8' }}>
      {/* Left Sidebar */}
      <aside className="w-14 bg-[#FCFAF8] flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-4">
          {/* Logo Button */}
          <Button
            size="icon"
            className="w-10 h-10 rounded-full bg-[#0f4331] hover:bg-[#0a3426] text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path d="M5.70117 4.27148L5.84766 4.41699V5.51562C5.84766 8.5909 6.3 9.04003 9.37695 9.04004L10.4736 9.04297L10.6201 9.18945V9.97266L10.4736 10.1191H9.375C6.30012 10.1192 5.85063 10.571 5.85059 13.6475L5.84766 14.7441L5.70117 14.8906H4.91895L4.77246 14.7441V13.6465C4.77246 10.5712 4.32009 10.1221 1.24316 10.1221L0.146484 10.1191L0 9.97266V9.18945L0.146484 9.04297H1.24512C4.32012 9.04293 4.76953 8.59053 4.76953 5.51367L4.77246 4.41699L4.91895 4.27148H5.70117ZM12.126 0L12.2236 0.0976562V0.827148C12.2236 2.87145 12.4303 3.07713 14.4746 3.07715L15.2031 3.0791L15.3008 3.17676V3.88379L15.2031 3.98047H14.4736C12.4304 3.98048 12.2256 4.18814 12.2256 6.2334L12.2236 6.96289L12.126 7.05957H11.4189L11.3223 6.96289V6.23242C11.3223 4.18816 11.1147 3.98243 9.07031 3.98242L8.3418 3.98047L8.24414 3.88379V3.17676L8.3418 3.0791H9.07129C11.1147 3.0791 11.3203 2.87168 11.3203 0.826172L11.3223 0.0976562L11.4189 0H12.126Z" fill="white"/>
            </svg>
          </Button>

          {/* Layout Grid Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-gray-600 hover:bg-gray-100"
          >
            <LayoutGrid className="w-5 h-5" />
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-3">
          {/* Settings Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-gray-600 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* AS Label */}
          <span className="text-xs font-medium text-gray-600">AS</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-2">
        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden h-full flex">
          {/* Left Section - Tasks */}
          <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">
            {/* Back Button and Title */}
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-xl absolute"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center">
              <h1 className="text-base font-medium text-black leading-8">Weiss family ADU</h1>
            </div>

            {/* Tasks Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#737373]">Tasks</p>
                <button className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    id="show-completed"
                    checked={showCompleted}
                    onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                  />
                  <label htmlFor="show-completed" className="text-sm font-medium cursor-pointer text-[#0a0a0a]">
                    Show completed
                  </label>
                </button>
              </div>

              {/* Task Items */}
              <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-[#e5e5e5] rounded-xl flex gap-3 items-center p-4 hover:bg-[#fcfaf8] transition-colors cursor-pointer shadow-sm"
                  >
                    {task.completed ? (
                      <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                    )}
                    <p className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">{task.title}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#737373]" />
                      <span className="text-[13px] text-[#737373] whitespace-nowrap">{task.date}</span>
                    </div>
                  </div>
                ))}

                {/* Add task */}
                <div className="bg-white border border-[#e5e5e5] rounded-xl flex gap-3 items-center p-4 hover:bg-[#fcfaf8] transition-colors cursor-pointer shadow-sm">
                  <Plus className="w-4 h-4 text-[#737373]" />
                  <p className="flex-1 text-sm font-medium text-[#737373]">Add task</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Project Info */}
          <div className="w-[520px] border-l border-[#e5e5e5] bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-[#e5e5e5] flex items-center justify-between px-6 py-3 h-12">
              <div className="flex items-center gap-2">
                <p className="text-base font-medium text-black leading-8">Project info</p>
                <p className="text-sm text-[#737373]">Updated 13h ago</p>
              </div>
            </div>

            {/* Tabs and Content */}
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto px-6 pt-6 pb-12">
              {/* Tabs */}
              <div className="bg-[#fcfaf8] rounded-2xl flex items-center p-1 h-9">
                <button
                  onClick={() => setActiveTab('status')}
                  className={`flex-1 flex items-center justify-center gap-2 h-full px-2 py-1 rounded-xl transition-all ${
                    activeTab === 'status'
                      ? 'bg-white border border-transparent shadow-sm'
                      : ''
                  }`}
                >
                  <Loader className="w-4 h-4 text-[#0a0a0a]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">Status</span>
                </button>
                <button
                  onClick={() => setActiveTab('vendors')}
                  className={`flex-1 flex items-center justify-center gap-2 h-full px-2 py-1 rounded-xl transition-all ${
                    activeTab === 'vendors'
                      ? 'bg-white border border-transparent shadow-sm'
                      : ''
                  }`}
                >
                  <CircleAlert className="w-4 h-4 text-[#0a0a0a]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">Vendors</span>
                </button>
                <button
                  onClick={() => setActiveTab('risks')}
                  className={`flex-1 flex items-center justify-center gap-2 h-full px-2 py-1 rounded-xl transition-all ${
                    activeTab === 'risks'
                      ? 'bg-white border border-transparent shadow-sm'
                      : ''
                  }`}
                >
                  <Circle className="w-4 h-4 text-[#0a0a0a]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">Risks</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-1 flex items-center justify-center gap-2 h-full px-2 py-1 rounded-xl transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-white border border-transparent shadow-sm'
                      : ''
                  }`}
                >
                  <Bell className="w-4 h-4 text-[#0a0a0a]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">Notifications</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'status' && (
                <div className="flex flex-col gap-2">
                  {/* Opportunity */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <Building2 className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Opportunity</span>
                    </div>
                    <div className="flex items-center flex-1 gap-3 px-3 py-1">
                      <span className="text-sm font-medium text-[#0a0a0a]">Weiss family ADU</span>
                      <div className="flex items-center gap-3 ml-auto">
                        <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl">
                          <img src="/assets/Status/salesloft.png" alt="Salesloft" className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl">
                          <img src="/assets/Status/salesforce.png" alt="Salesforce" className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl">
                          <img src="/assets/Status/admin.png" alt="Admin" className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Health */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <Heart className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Health</span>
                    </div>
                    <div className="flex items-center flex-1 px-3 py-1">
                      <div className="bg-[#fff7e5] border border-[#d96302] px-2 py-0.5 rounded-lg">
                        <span className="text-xs font-semibold text-[#73290c]">65/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Estimated close */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <Calendar className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Estimated close</span>
                    </div>
                    <div className="flex items-center flex-1 px-3 py-1">
                      <span className="text-sm font-medium text-[#0a0a0a]">Mar 15, 2026</span>
                    </div>
                  </div>

                  {/* Contract value */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <DollarSign className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Contract value</span>
                    </div>
                    <div className="flex items-center flex-1 px-3 py-1">
                      <span className="text-sm font-medium text-[#0a0a0a]">$32,000</span>
                    </div>
                  </div>

                  {/* Last meeting */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <Clock className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Last meeting</span>
                    </div>
                    <div className="flex items-center flex-1 px-3 py-1">
                      <div className="bg-[#f8f4f0] px-3 py-1 rounded-xl">
                        <span className="text-sm font-medium text-[#0a0a0a]">Oct 2, 2025</span>
                      </div>
                    </div>
                  </div>

                  {/* Next call */}
                  <div className="flex items-center gap-4 h-9">
                    <div className="flex items-center gap-2 w-40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_1062_12854)">
                          <path d="M11.2433 12.5791L10.89 14.4024C10.8578 14.5718 10.7907 14.7326 10.6928 14.8746C10.595 15.0165 10.4685 15.1365 10.3216 15.2267C10.1747 15.317 10.0106 15.3756 9.83975 15.3987C9.6689 15.4219 9.49509 15.4091 9.32946 15.3612C7.49863 14.7955 5.82599 13.8084 4.44596 12.4789C3.15831 11.2612 2.15456 9.77493 1.50599 8.12562C0.786099 6.34102 0.496705 4.41194 0.661255 2.49466C0.678636 2.32365 0.731435 2.15813 0.81629 2.00864C0.901146 1.85915 1.0162 1.72897 1.15412 1.62638C1.29205 1.52379 1.44982 1.45105 1.6174 1.41278C1.78498 1.37451 1.95869 1.37155 2.12747 1.40409L3.95079 1.75742C4.24631 1.81168 4.51202 1.97154 4.69839 2.20721C4.88476 2.44288 4.97907 2.73828 4.96376 3.03834C4.92764 3.63676 4.95934 4.23734 5.05825 4.82863C5.09786 5.06201 5.06975 5.30186 4.97723 5.51975C4.88471 5.73764 4.73167 5.92444 4.53624 6.05803L3.61479 6.68032C4.18513 8.36957 5.20084 9.87356 6.55477 11.0336L7.47621 10.4113C7.67313 10.2799 7.90357 10.2077 8.14025 10.2033C8.37693 10.1989 8.60992 10.2624 8.81161 10.3863C9.32315 10.6989 9.86842 10.9527 10.437 11.1427C10.7242 11.2416 10.965 11.4425 11.1136 11.7074C11.2623 11.9722 11.3084 12.2824 11.2433 12.5791Z" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.0754 10.8439C14.5149 9.18156 15.1449 5.85642 13.4826 3.41694C11.8203 0.977473 8.49514 0.347458 6.05566 2.00977" stroke="#737373" strokeWidth="1.28436" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.94531 4.12158V7.0114H10.8719" stroke="#737373" strokeWidth="1.28436" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_1062_12854">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-sm text-[#737373]">Next call</span>
                    </div>
                    <div className="flex items-center flex-1 px-3 py-1">
                      <div className="bg-[#fef2f2] border border-[#dc2626] px-2 py-0.5 rounded-lg">
                        <span className="text-xs font-semibold text-[#7f1d1d]">Not scheduled</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-4 mt-2">
                    <div className="flex items-center gap-2 w-40 pt-1">
                      <DollarSign className="w-4 h-4 text-[#737373]" />
                      <span className="text-sm text-[#737373]">Status</span>
                    </div>
                    <div className="flex flex-1 px-3 py-1">
                      <textarea
                        ref={textareaRef}
                        value={statusSummary}
                        onChange={(e) => setStatusSummary(e.target.value)}
                        onInput={adjustTextareaHeight}
                        className="w-full text-sm text-[#0a0a0a] leading-relaxed resize-none overflow-hidden focus:outline-none"
                        placeholder="Add status summary..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vendors' && (
                <div className="space-y-6">
                  {/* Vendor Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#737373]">Vendor Progress</h3>
                      <button className="text-sm text-[#0a0a0a] hover:underline flex items-center gap-1">
                        Vendor Relationship
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Table */}
                    <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                      {/* Table Header */}
                      <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-2 px-4 py-3 bg-white border-b border-[#e5e5e5]">
                        <span className="text-xs font-medium text-[#737373]">Vendor</span>
                        <span className="text-xs font-medium text-[#737373]">Site visit</span>
                        <span className="text-xs font-medium text-[#737373]">Bid</span>
                        <span className="text-xs font-medium text-[#737373]">Contract</span>
                      </div>

                      {/* Table Rows */}
                      <div className="divide-y divide-[#e5e5e5]">
                        {/* Oakline Builders */}
                        <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-2 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                          <span className="text-sm font-medium text-[#0a0a0a] truncate">Oakline Builders</span>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                              <span className="text-xs font-semibold text-[#3a4a2b] whitespace-nowrap">Visited</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                              <span className="text-xs font-semibold text-[#3a4a2b] whitespace-nowrap">Submitted</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not accepted</span>
                            </div>
                          </div>
                        </div>

                        {/* LA Construction INC */}
                        <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-2 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                          <span className="text-sm font-medium text-[#0a0a0a] truncate">LA Construction INC</span>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                              <span className="text-xs font-semibold text-[#3a4a2b] whitespace-nowrap">Visited</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#fef2f2] border border-[#dc2626]">
                              <span className="text-xs font-semibold text-[#7f1d1d] whitespace-nowrap">Overdue</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not accepted</span>
                            </div>
                          </div>
                        </div>

                        {/* BetterBuilders */}
                        <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-2 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                          <span className="text-sm font-medium text-[#0a0a0a] truncate">BetterBuilders</span>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#eff6ff] border border-[#3b82f6]">
                              <span className="text-xs font-semibold text-[#1e40af] whitespace-nowrap">Scheduled</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not submitted</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not accepted</span>
                            </div>
                          </div>
                        </div>

                        {/* Urban Nest */}
                        <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-2 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                          <span className="text-sm font-medium text-[#0a0a0a] truncate">Urban Nest</span>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Requested</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not submitted</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                              <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Not accepted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-2">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-[#737373]">Risks</h3>
                    <span className="text-sm text-[#737373]">Tasks completed</span>
                  </div>

                  {/* Stage */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('stage')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('stage') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Stage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#e91e63] flex-shrink-0" />
                        <span className="text-sm text-[#e91e63]">Site visits completed (day 21 vs. 7)</span>
                      </div>
                      <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#fef2f2] border border-[#dc2626]">
                        <span className="text-xs font-semibold text-[#7f1d1d]">1/2</span>
                      </div>
                    </button>

                    {expandedRisks.has('stage') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        {/* Tasks */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Match and approve qualified vendors</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">3 days ago</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Match and approve qualified vendors</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">Tomorrow</span>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                            <Plus className="w-4 h-4 text-[#737373]" />
                            <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Decision readiness */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('decision')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('decision') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Decision readiness</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                        <span className="text-sm text-[#f59e0b]">Continued indecision; needs visuals</span>
                      </div>
                    </button>

                    {expandedRisks.has('decision') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Client is having difficulty making decisions without visual references. Providing mockups and design samples may help accelerate the decision-making process.
                        </p>
                        <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                          <Plus className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Financial readiness */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('financial')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('financial') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Financial readiness</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#76924f] flex-shrink-0" />
                        <span className="text-sm text-[#76924f]">Realistic budget; engaged with Renofi</span>
                      </div>
                    </button>

                    {expandedRisks.has('financial') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Client has established a realistic budget for the project scope and is actively working with Renofi to secure financing.
                        </p>
                        <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                          <Plus className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Stakeholder alignment */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('stakeholder')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('stakeholder') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Stakeholder alignment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#d97706] flex-shrink-0" />
                        <span className="text-sm text-[#d97706]">Only one party needed and involved</span>
                      </div>
                    </button>

                    {expandedRisks.has('stakeholder') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Single decision-maker simplifies the approval process and reduces potential delays.
                        </p>
                        <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                          <Plus className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Advisor-led momentum */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('advisor')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('advisor') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Advisor-led momentum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                        <span className="text-sm text-[#f59e0b]">Have not checked in 7+ days</span>
                      </div>
                    </button>

                    {expandedRisks.has('advisor') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Last contact with the client was over a week ago. Regular check-ins are important to maintain project momentum.
                        </p>
                        <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                          <Plus className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Homeowner engagement */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('homeowner')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('homeowner') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Homeowner engagement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#76924f] flex-shrink-0" />
                        <span className="text-sm text-[#76924f]">Responds enthusiastically and consistently</span>
                      </div>
                      <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#fef2f2] border border-[#dc2626]">
                        <span className="text-xs font-semibold text-[#7f1d1d]">0/2</span>
                      </div>
                    </button>

                    {expandedRisks.has('homeowner') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Homeowner has shown consistent interest and quick response times throughout the process.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Schedule follow-up call</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">in 5 days</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Send project update</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">in 7 days</span>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                            <Plus className="w-4 h-4 text-[#737373]" />
                            <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trust & value perception */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('trust')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('trust') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">Trust & value perception</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#76924f] flex-shrink-0" />
                        <span className="text-sm text-[#76924f]">Not shopping; very excited by the Realm offering</span>
                      </div>
                      <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                        <span className="text-xs font-semibold text-[#3a4a2b]">2/2</span>
                      </div>
                    </button>

                    {expandedRisks.has('trust') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          Client has demonstrated strong commitment to working exclusively with Realm and expressed high confidence.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Share client testimonials</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">7 days ago</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer">
                            <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Discuss value proposition</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Calendar className="w-4 h-4 text-[#737373]" />
                              <span className="text-[13px] text-[#737373] whitespace-nowrap">5 days ago</span>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                            <Plus className="w-4 h-4 text-[#737373]" />
                            <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* External constraints */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleRisk('external')}
                      className="w-full grid grid-cols-[200px_1fr_auto] gap-4 items-center text-left hover:bg-[#fcfaf8] transition-colors rounded-lg px-3 py-2 -mx-3"
                    >
                      <div className="flex items-center gap-2">
                        {expandedRisks.has('external') ? (
                          <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[#0a0a0a]">External constraints</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ban className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        <span className="text-sm text-[#737373]">Project is clearly feasible; no other blockers</span>
                      </div>
                    </button>

                    {expandedRisks.has('external') && (
                      <div className="pl-[216px] space-y-3">
                        <p className="text-sm text-[#737373] leading-relaxed">
                          No zoning, permitting, or regulatory issues have been identified. The project scope is well within feasibility parameters.
                        </p>
                        <button className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left">
                          <Plus className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="w-12 h-12 text-[#e5e5e5] mb-4" />
                  <p className="text-sm text-[#737373]">No notifications yet</p>
                  <p className="text-xs text-[#9a9ea8] mt-1">Notifications will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - same as variant-2 */}
      <aside className="w-14 bg-[#FCFAF8] flex flex-col items-center py-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-black hover:bg-gray-100"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#cb2a57] rounded-full text-[10px] font-semibold text-white flex items-center justify-center">
            3
          </span>
        </div>
      </aside>
    </div>
  );
}
