"use client";

import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  PanelRightClose,
  Clock,
  Building2,
  Layers,
  ExternalLink,
  Heart,
  Calendar,
  DollarSign,
  Phone,
  PhoneOff,
  ListChecks,
  Loader,
  CircleAlert,
  Check,
  Plus,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Ban,
  User,
  TrendingUp,
  Search,
  X
} from 'lucide-react';

interface ProjectDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnName: string;
  taskCount: number;
  project: {
    title: string;
    status: string;
    health: number;
    estimatedClose: string;
    contractValue: string;
    lastMeeting: string;
    hasCall: boolean;
  };
}

export default function ProjectDrawer({ open, onOpenChange, columnName, taskCount, project }: ProjectDrawerProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState<'tasks' | 'status' | 'risks'>('tasks');
  const [statusSummary, setStatusSummary] = useState(
    `• Nedu and Kishaya completed a detailed project planning call on January 14, 2026, clarifying scope, priorities, and budget constraints; the main blocker is aligning the project scope with Nedu's $100K target budget, as initial estimates were significantly higher.

• No contractors have been matched or site visits scheduled yet; vendor matching is the immediate next step, with Kishaya aiming to introduce contractor options within the next week.

• Nedu is scheduled to meet with a finance partner on January 15, 2026, to explore funding options, which may influence project phasing and scope decisions.`
  );
  const [expandedRisks, setExpandedRisks] = useState<Set<string>>(new Set(['stage']));
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedRiskForTask, setSelectedRiskForTask] = useState('');
  const [taskFormData, setTaskFormData] = useState({
    opportunity: '',
    owner: 'Ben Moody',
    risk: 'No risks',
    title: '',
    dueDate: '',
    reasoning: ''
  });
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

  const openAddTaskModal = (risk?: string) => {
    setTaskFormData({
      opportunity: project.title,
      owner: 'Ben Moody',
      risk: risk || 'No risks',
      title: '',
      dueDate: '',
      reasoning: ''
    });
    setAddTaskModalOpen(true);
  };

  const openTaskDetailModal = (task: any) => {
    setSelectedTask(task);
    setTaskDetailModalOpen(true);
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

  useEffect(() => {
    // Initial height adjustment on mount
    adjustTextareaHeight();
  }, []);

  // Different task sets with varying complexity
  const taskSets = {
    few: [
      { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: 'Jan 22' },
      { id: 2, title: 'Call homeowner to review bid and plans', completed: false, date: 'Jan 10' },
      { id: 3, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
      { id: 4, title: 'Follow up to schedule contractor site visits after closing', completed: false, date: 'Feb 12' },
    ],
    medium: [
      { id: 1, title: 'Follow up with Gary on site visits and first bid', completed: true, date: 'Jan 25' },
      { id: 2, title: 'Clarify project ownership and update internal records', completed: true, date: 'Jan 28' },
      { id: 3, title: 'Provide clear bid comparison and contractor recommendation to Olga', completed: false, date: 'Jan 15' },
      { id: 4, title: 'Review and finalize project scope with stakeholders', completed: false, date: 'Today' },
      { id: 5, title: 'Reschedule meeting with Olga to review bids and next steps', completed: false, date: 'Feb 2' },
      { id: 6, title: 'Confirm outcome with Gary/Kerry regarding project award', completed: false, date: 'Feb 5' },
      { id: 7, title: 'Schedule kick-off meeting with selected contractor', completed: false, date: 'Feb 15' },
    ],
    many: [
      { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: 'Jan 22' },
      { id: 2, title: 'Follow up with Gary on site visits and first bid', completed: true, date: 'Jan 25' },
      { id: 3, title: 'Clarify project ownership and update internal records', completed: true, date: 'Jan 28' },
      { id: 4, title: 'Review contractor proposals and timeline', completed: true, date: 'Jan 29' },
      { id: 5, title: 'Call homeowner to review bid and plans', completed: false, date: 'Jan 10' },
      { id: 6, title: 'Provide clear bid comparison and contractor recommendation to Olga', completed: false, date: 'Jan 15' },
      { id: 7, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
      { id: 8, title: 'Review and finalize project scope with stakeholders', completed: false, date: 'Today' },
      { id: 9, title: 'Reschedule meeting with Olga to review bids and next steps', completed: false, date: 'Feb 2' },
      { id: 10, title: 'Confirm outcome with Gary/Kerry regarding project award', completed: false, date: 'Feb 5' },
      { id: 11, title: 'Follow up with Gary after his reply about reviewing bids', completed: false, date: 'Feb 8' },
      { id: 12, title: 'Follow up to schedule contractor site visits after closing', completed: false, date: 'Feb 12' },
      { id: 13, title: 'Schedule kick-off meeting with selected contractor', completed: false, date: 'Feb 15' },
      { id: 14, title: 'Prepare project documentation for internal review', completed: false, date: 'Feb 18' },
    ],
  };

  // Use project title to determine which task set to show
  const getTaskSet = () => {
    const hash = project.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const options = ['few', 'medium', 'many'] as const;
    return taskSets[options[hash % 3]];
  };

  const allTasksForProject = getTaskSet();
  const tasks = showCompleted ? allTasksForProject : allTasksForProject.filter(task => !task.completed);

  const getTaskCount = () => {
    if (columnName === 'Overdue') {
      // Count tasks that are not completed and have past dates (Jan dates)
      return tasks.filter(task => !task.completed && task.date.startsWith('Jan')).length;
    }
    if (columnName === 'Today') {
      return tasks.filter(task => task.date === 'Today').length;
    }
    if (columnName === 'Later') {
      // Count tasks that are not completed and have future dates (Feb dates)
      return tasks.filter(task => !task.completed && task.date.startsWith('Feb')).length;
    }
    return 0;
  };

  const getBadgeText = () => {
    if (columnName === 'No tasks') return '0 Tasks';
    const count = getTaskCount();
    return `${count} ${columnName}`;
  };

  const getBadgeStyles = () => {
    if (columnName === 'Overdue') return 'bg-[#fef2f2] border border-[#dc2626] text-[#7f1d1d]';
    if (columnName === 'Today') return 'bg-[#f3f7ec] border border-[#76924f] text-[#3a4a2b]';
    return 'bg-[#f5f5f5] border border-[#e5e5e5] text-[#737373]';
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[740px] sm:max-w-[740px] p-0 border-l border-[#e5e5e5] bg-white [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center border-b border-[#e5e5e5] px-6 py-2">
          <div className="flex items-center flex-1 gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => onOpenChange(false)}>
              <PanelRightClose className="w-4 h-4" />
            </Button>
            <div className="w-px h-4 bg-[#e5e5e5]" />
            <p className="text-sm font-medium text-[#0a0a0a]">Project info</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#737373]" />
            <p className="text-sm text-[#737373]">Updated 13h ago</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 overflow-y-auto h-[calc(100vh-56px)]">
          <div className="space-y-6 pb-12">
            {/* Project Details */}
            <div className="space-y-2">
              {/* Opportunity */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Building2 className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Opportunity</span>
                </div>
                <div className="flex items-center flex-1 gap-3 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">{project.title}</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl bg-white border border-[#e5e5e5]">
                      <img src="/assets/Status/salesloft.png" alt="Salesloft" className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl bg-white border border-[#e5e5e5]">
                      <img src="/assets/Status/salesforce.png" alt="Salesforce" className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-xl bg-white border border-[#e5e5e5]">
                      <img src="/assets/Status/admin.png" alt="Admin" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* KOC Deck */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Layers className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">KOC Deck</span>
                </div>
                <div className="flex items-center flex-1 gap-1 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">{project.status}</span>
                  <ExternalLink className="w-4 h-4 text-[#0a0a0a]" />
                </div>
              </div>

              {/* Health */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Heart className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Health</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  <div className="bg-[#fff7e5] border border-[#d96302] px-1.5 rounded-lg h-5 flex items-center justify-center">
                    <span className="text-xs font-semibold text-[#73290c]">{project.health}/100</span>
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
                  <span className="text-sm font-medium text-[#0a0a0a]">{project.estimatedClose}</span>
                </div>
              </div>

              {/* Contract value */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <DollarSign className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Contract value</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">{project.contractValue}</span>
                </div>
              </div>

              {/* Last meeting */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Clock className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Last meeting</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">{project.lastMeeting}</span>
                </div>
              </div>

              {/* Next call */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  {project.hasCall ? (
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
                  ) : (
                    <PhoneOff className="w-4 h-4 text-[#737373]" />
                  )}
                  <span className="text-sm text-[#737373]">Next call</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  {project.hasCall ? (
                    <span className="text-sm font-medium text-[#0a0a0a]">Scheduled</span>
                  ) : (
                    <div className="bg-[#fef2f2] border border-[#dc2626] px-1.5 rounded-lg h-5 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#7f1d1d]">Not scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-[#e5e5e5]" />

            {/* Tabs */}
            <div className="bg-[#fcfaf8] p-1 rounded-2xl flex items-center gap-0">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center justify-center gap-2 px-2 py-1 flex-1 h-8 ${activeTab === 'tasks' ? 'bg-white rounded-xl shadow-sm' : ''}`}
              >
                <ListChecks className="w-4 h-4" />
                <span className="text-sm font-medium">3 Tasks</span>
                <div className={`px-1.5 rounded-lg h-5 flex items-center justify-center ${getBadgeStyles()}`}>
                  <span className="text-xs font-semibold">{getBadgeText()}</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`flex items-center justify-center gap-2 px-2 py-1 flex-1 h-8 ${activeTab === 'status' ? 'bg-white rounded-xl shadow-sm' : ''}`}
              >
                <Loader className="w-4 h-4" />
                <span className="text-sm font-medium">Status</span>
              </button>
              <button
                onClick={() => setActiveTab('risks')}
                className={`flex items-center justify-center gap-2 px-2 py-1 flex-1 h-8 ${activeTab === 'risks' ? 'bg-white rounded-xl shadow-sm' : ''}`}
              >
                <CircleAlert className="w-4 h-4" />
                <span className="text-sm font-medium">Risks</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'tasks' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#737373]">Tasks</span>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="show-completed"
                      checked={showCompleted}
                      onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                    />
                    <label htmlFor="show-completed" className="text-sm font-medium cursor-pointer">
                      Show completed
                    </label>
                  </div>
                </div>

                {/* Task Items */}
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => openTaskDetailModal(task)}
                      className="flex items-center gap-3 p-4 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                    >
                      {task.completed ? (
                        <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full shadow-sm" />
                      )}
                      <span className="flex-1 text-sm font-medium text-[#0a0a0a]">{task.title}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#737373]" />
                        <span className="text-[13px] text-[#737373] w-11">{task.date}</span>
                      </div>
                    </div>
                  ))}

                  {/* Add task */}
                  <button
                    onClick={() => openAddTaskModal()}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[#e5e5e5] bg-white shadow-sm cursor-pointer hover:bg-[#fcfaf8] w-full text-left"
                  >
                    <Plus className="w-4 h-4 text-[#737373]" />
                    <span className="flex-1 text-sm font-medium text-[#737373]">Add task</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'status' && (
              <div className="space-y-6">
                {/* Status Summary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#737373]">Status Summary</h3>
                  <textarea
                    ref={textareaRef}
                    value={statusSummary}
                    onChange={(e) => setStatusSummary(e.target.value)}
                    onInput={adjustTextareaHeight}
                    className="w-full text-sm text-[#0a0a0a] leading-relaxed p-3 border border-[#e5e5e5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent resize-none overflow-hidden"
                    placeholder="Add status summary..."
                  />
                </div>

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
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-white border-b border-[#e5e5e5]">
                      <span className="text-xs font-medium text-[#737373]">Vendor</span>
                      <span className="text-xs font-medium text-[#737373]">Site visit</span>
                      <span className="text-xs font-medium text-[#737373]">Bid</span>
                      <span className="text-xs font-medium text-[#737373]">Contract</span>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-[#e5e5e5]">
                      {/* Oakline Builders */}
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                        <span className="text-sm font-medium text-[#0a0a0a]">Oakline Builders</span>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                            <span className="text-xs font-semibold text-[#3a4a2b]">Visited</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                            <span className="text-xs font-semibold text-[#3a4a2b]">Submitted</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not accepted</span>
                          </div>
                        </div>
                      </div>

                      {/* LA Construction INC */}
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                        <span className="text-sm font-medium text-[#0a0a0a]">LA Construction INC</span>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f3f7ec] border border-[#76924f]">
                            <span className="text-xs font-semibold text-[#3a4a2b]">Visited</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#fef2f2] border border-[#dc2626]">
                            <span className="text-xs font-semibold text-[#7f1d1d]">Overdue</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not accepted</span>
                          </div>
                        </div>
                      </div>

                      {/* BetterBuilders */}
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                        <span className="text-sm font-medium text-[#0a0a0a]">BetterBuilders</span>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#eff6ff] border border-[#3b82f6]">
                            <span className="text-xs font-semibold text-[#1e40af]">Scheduled</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not submitted</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not accepted</span>
                          </div>
                        </div>
                      </div>

                      {/* Urban Nest */}
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-white hover:bg-[#fcfaf8]">
                        <span className="text-sm font-medium text-[#0a0a0a]">Urban Nest</span>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Requested</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not submitted</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="px-1.5 rounded-lg h-5 flex items-center justify-center bg-[#f5f5f5] border border-[#e5e5e5]">
                            <span className="text-xs font-semibold text-[#737373]">Not accepted</span>
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
                        <div
                          onClick={() => openTaskDetailModal({ id: 1, title: 'Match and approve qualified vendors', completed: true, date: 'Mar 15' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Match and approve qualified vendors</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Mar 15</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 2, title: 'Match and approve qualified vendors', completed: false, date: 'Mar 15' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full shadow-sm flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Match and approve qualified vendors</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Mar 15</span>
                          </div>
                        </div>

                        <button
                          onClick={() => openAddTaskModal('Stage')}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                        >
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
                      <button
                        onClick={() => openAddTaskModal('Decision readiness')}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                      >
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
                        Client has established a realistic budget for the project scope and is actively working with Renofi to secure financing. Financial planning is on track.
                      </p>
                      <button
                        onClick={() => openAddTaskModal('Financial readiness')}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                      >
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
                        Single decision-maker simplifies the approval process and reduces potential delays from conflicting stakeholder opinions.
                      </p>
                      <button
                        onClick={() => openAddTaskModal('Stakeholder alignment')}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                      >
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
                        Last contact with the client was over a week ago. Regular check-ins are important to maintain project momentum and ensure client engagement remains high.
                      </p>
                      <button
                        onClick={() => openAddTaskModal('Advisor-led momentum')}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                      >
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
                        Homeowner has shown consistent interest and quick response times throughout the process. Communication has been positive and proactive.
                      </p>

                      {/* Tasks */}
                      <div className="space-y-2">
                        <div
                          onClick={() => openTaskDetailModal({ id: 3, title: 'Schedule follow-up call to discuss timeline', completed: false, date: 'Feb 1' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full shadow-sm flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Schedule follow-up call to discuss timeline</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Feb 1</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 4, title: 'Send project update and next steps', completed: false, date: 'Feb 3' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full shadow-sm flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Send project update and next steps</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Feb 3</span>
                          </div>
                        </div>

                        <button
                          onClick={() => openAddTaskModal('Homeowner engagement')}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                        >
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
                        Client has demonstrated strong commitment to working exclusively with Realm and expressed high confidence in our approach and service quality.
                      </p>

                      {/* Tasks */}
                      <div className="space-y-2">
                        <div
                          onClick={() => openTaskDetailModal({ id: 5, title: 'Share client testimonials and case studies', completed: true, date: 'Jan 20' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Share client testimonials and case studies</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Jan 20</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 6, title: 'Discuss value proposition and service benefits', completed: true, date: 'Jan 22' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] shadow-sm bg-white hover:bg-[#f8f4f0] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a]">Discuss value proposition and service benefits</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373]">Jan 22</span>
                          </div>
                        </div>

                        <button
                          onClick={() => openAddTaskModal('Trust & value perception')}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                        >
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
                        No zoning, permitting, or regulatory issues have been identified. The project scope is well within feasibility parameters with no external blockers anticipated.
                      </p>
                      <button
                        onClick={() => openAddTaskModal('External constraints')}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] bg-white shadow-sm w-full hover:bg-[#fcfaf8] text-left"
                      >
                        <Plus className="w-4 h-4 text-[#737373]" />
                        <span className="text-sm font-medium text-[#737373]">New Risk task</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>

      {/* Add Task Modal */}
      <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
        <DialogContent className="max-w-[672px] max-h-[768px] sm:max-h-[80vh] p-0 flex flex-col">
          {/* Fixed Header */}
          <div className="p-6 pb-0 bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#0a0a0a]">Add task</DialogTitle>
            </DialogHeader>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 py-6">
            <div className="space-y-4">
              {/* Select Opportunity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">
                  Select Opportunity<span className="text-[#dc2626]">*</span>
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                  <input
                    type="text"
                    value={taskFormData.opportunity}
                    onChange={(e) => setTaskFormData({ ...taskFormData, opportunity: e.target.value })}
                    placeholder="Search and select opportunity..."
                    className="w-full pl-10 pr-3 py-2 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Owner */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">
                  Owner<span className="text-[#dc2626]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={taskFormData.owner}
                    onChange={(e) => setTaskFormData({ ...taskFormData, owner: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e5e5e5] rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                  >
                    <option>Ben Moody</option>
                    <option>Other User</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              {/* Risks */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">Risks</label>
                <div className="relative">
                  <select
                    value={taskFormData.risk}
                    onChange={(e) => setTaskFormData({ ...taskFormData, risk: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e5e5e5] rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                  >
                    <option>No risks</option>
                    <option>Stage</option>
                    <option>Decision readiness</option>
                    <option>Financial readiness</option>
                    <option>Stakeholder alignment</option>
                    <option>Advisor-led momentum</option>
                    <option>Homeowner engagement</option>
                    <option>Trust & value perception</option>
                    <option>External constraints</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
                </div>
              </div>

              {/* Task title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">
                  Task title<span className="text-[#dc2626]">*</span>
                </label>
                <input
                  type="text"
                  value={taskFormData.title}
                  onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                />
              </div>

              {/* Due date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">
                  Due date<span className="text-[#dc2626]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                  <input
                    type="date"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                    placeholder="Pick a due date"
                    className="w-full pl-10 pr-3 py-2 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Reasoning */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0a0a0a]">Reasoning</label>
                <textarea
                  value={taskFormData.reasoning}
                  onChange={(e) => setTaskFormData({ ...taskFormData, reasoning: e.target.value })}
                  placeholder="Explain the reasoning behind the task..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-[#e5e5e5] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0f4331] focus:border-transparent"
                />
                <p className="text-xs text-[#737373]">{taskFormData.reasoning.length}/500 characters</p>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="p-6 pt-0 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAddTaskModalOpen(false)}
                className="flex-1 bg-white border border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#fcfaf8] rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle task creation
                  setAddTaskModalOpen(false);
                }}
                className="flex-1 bg-[#0f4331] hover:bg-[#0a3426] text-white rounded-xl"
              >
                Add task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Detail Modal */}
      <Dialog open={taskDetailModalOpen} onOpenChange={setTaskDetailModalOpen}>
        <DialogContent className="max-w-[672px] max-h-[768px] sm:max-h-[80vh] p-0 flex flex-col">
          {/* Fixed Header */}
          <div className="p-6 pb-0 bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#0a0a0a]">
                {selectedTask?.title || 'Task Details'}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Scrollable Content - Skeleton Placeholders */}
          <div className="overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {/* Skeleton: Large text block */}
              <div className="space-y-3">
                <div className="h-4 bg-[#f8f4f0] rounded w-3/4"></div>
                <div className="h-4 bg-[#f8f4f0] rounded w-full"></div>
                <div className="h-4 bg-[#f8f4f0] rounded w-5/6"></div>
              </div>

              {/* Skeleton: Info boxes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-[#f8f4f0] rounded-xl"></div>
                <div className="h-20 bg-[#f8f4f0] rounded-xl"></div>
              </div>

              {/* Skeleton: Medium text block */}
              <div className="space-y-2">
                <div className="h-3 bg-[#f8f4f0] rounded w-1/4"></div>
                <div className="h-16 bg-[#f8f4f0] rounded-xl w-full"></div>
              </div>

              {/* Skeleton: List items */}
              <div className="space-y-3">
                <div className="h-12 bg-[#f8f4f0] rounded-xl"></div>
                <div className="h-12 bg-[#f8f4f0] rounded-xl"></div>
                <div className="h-12 bg-[#f8f4f0] rounded-xl"></div>
              </div>

              {/* Skeleton: Additional content block */}
              <div className="space-y-2">
                <div className="h-4 bg-[#f8f4f0] rounded w-2/3"></div>
                <div className="h-4 bg-[#f8f4f0] rounded w-full"></div>
                <div className="h-4 bg-[#f8f4f0] rounded w-4/5"></div>
              </div>

              {/* Skeleton: Small info cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-[#f8f4f0] rounded-xl"></div>
                <div className="h-16 bg-[#f8f4f0] rounded-xl"></div>
                <div className="h-16 bg-[#f8f4f0] rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="p-6 pt-0 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setTaskDetailModalOpen(false)}
                className="flex-1 bg-white border border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#fcfaf8] rounded-xl"
              >
                Skip
              </Button>
              <Button
                onClick={() => {
                  // Handle task completion
                  setTaskDetailModalOpen(false);
                }}
                className="flex-1 bg-[#0f4331] hover:bg-[#0a3426] text-white rounded-xl"
              >
                Complete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
