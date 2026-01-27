'use client';

import { useState } from 'react';
import { Calendar, DollarSign, Clock, PhoneOff, Heart, ChevronDown, ChevronRight, Check, Plus, Search, Layers2, ArrowUpRight, Info, Loader, CircleAlert, ExternalLink, ListChecks, User, TrendingUp, Zap, Shield, Ban, Building2, ArrowLeft } from 'lucide-react';
import ProjectDrawer from './ProjectDrawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Task {
  id: number;
  title: string;
  date: string;
  price: string;
  timeAgo: string;
  hasCall: boolean;
  health: 'good' | 'medium' | 'bad';
}

interface TaskCardProps {
  task: Task;
  columnName: string;
  taskCount: number;
  showCompleted: boolean;
}

export default function TaskCardV4({ task, columnName, taskCount, showCompleted }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [statusRisksModalOpen, setStatusRisksModalOpen] = useState(false);
  const [statusRisksTab, setStatusRisksTab] = useState<'status' | 'risks'>('status');
  const [statusRisksView, setStatusRisksView] = useState<'view' | 'addTask'>('view');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [expandedRisks, setExpandedRisks] = useState<Set<string>>(new Set());
  const [taskFormData, setTaskFormData] = useState({
    opportunity: '',
    owner: 'Ben Moody',
    risk: 'No risks',
    title: '',
    dueDate: '',
    reasoning: ''
  });

  const getHealthColor = () => {
    if (task.health === 'good') return 'text-[#76924f] border-[#d9eab8]';
    if (task.health === 'medium') return 'text-[#f59e0b] border-[#fef3c7]';
    return 'text-[#cb2a57] border-[#fecaca]';
  };

  const getHealthScore = () => {
    if (task.health === 'good') return 85;
    if (task.health === 'medium') return 65;
    return 40;
  };

  const openAddTaskModal = () => {
    setTaskFormData({
      opportunity: task.title,
      owner: 'Ben Moody',
      risk: 'No risks',
      title: '',
      dueDate: '',
      reasoning: ''
    });
    setAddTaskModalOpen(true);
  };

  const openTaskDetailModal = (taskItem: any) => {
    setSelectedTask(taskItem);
    setTaskDetailModalOpen(true);
  };

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

  // Sample tasks - different sets based on column type
  const getTaskSet = () => {
    const taskSets = {
      overdue: [
        { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: '5 days ago' },
        { id: 2, title: 'Call homeowner to review bid and plans', completed: false, date: '17 days ago' },
        { id: 3, title: 'Provide clear bid comparison and contractor recommendation', completed: false, date: '12 days ago' },
        { id: 4, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
        { id: 5, title: 'Follow up to schedule contractor site visits after closing', completed: false, date: 'in 16 days' },
      ],
      today: [
        { id: 1, title: 'Follow up with Gary on site visits and first bid', completed: true, date: '2 days ago' },
        { id: 2, title: 'Clarify project ownership and update internal records', completed: true, date: 'Yesterday' },
        { id: 3, title: 'Review and finalize project scope with stakeholders', completed: false, date: 'Today' },
        { id: 4, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
        { id: 5, title: 'Reschedule meeting with client to review bids and next steps', completed: false, date: 'in 6 days' },
        { id: 6, title: 'Schedule kick-off meeting with selected contractor', completed: false, date: 'in 19 days' },
      ],
      later: [
        { id: 1, title: 'Send recap email for last call', completed: true, date: '5 days ago' },
        { id: 2, title: 'Review contractor proposals and timeline', completed: true, date: 'Yesterday' },
        { id: 3, title: 'Reschedule meeting with client to review bids and next steps', completed: false, date: 'in 6 days' },
        { id: 4, title: 'Confirm outcome with client regarding project award', completed: false, date: 'in 9 days' },
        { id: 5, title: 'Follow up after client reply about reviewing bids', completed: false, date: 'in 12 days' },
        { id: 6, title: 'Follow up to schedule contractor site visits', completed: false, date: 'in 16 days' },
        { id: 7, title: 'Schedule kick-off meeting with selected contractor', completed: false, date: 'in 19 days' },
      ],
      noTasks: [
        { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: '5 days ago' },
        { id: 2, title: 'Follow up with Gary on site visits and first bid', completed: true, date: '2 days ago' },
        { id: 3, title: 'Clarify project ownership and update internal records', completed: true, date: 'Yesterday' },
        { id: 4, title: 'Review contractor proposals and timeline', completed: true, date: 'Yesterday' },
      ],
    };

    if (columnName === 'Overdue') return taskSets.overdue;
    if (columnName === 'Today') return taskSets.today;
    if (columnName === 'Later') return taskSets.later;
    return taskSets.noTasks;
  };

  const allTasks = getTaskSet();
  const tasks = showCompleted ? allTasks : allTasks.filter(t => !t.completed);

  return (
    <TooltipProvider>
      <div
        className="bg-white rounded-[20px] border border-[#eeeff1] px-4 pt-3 pb-4 transition-colors flex flex-col gap-6 hover:bg-[#F8F4F0]"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          {/* Title with Chevron and Icon Buttons */}
          <div className="flex items-center gap-1">
            <div
              className="flex items-center cursor-pointer flex-1"
              onClick={() => setExpanded(!expanded)}
            >
              <button className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-[#FCFAF8] transition-colors">
                {expanded ? (
                  <ChevronDown className="w-4 h-4 text-[#9a9ea8]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#9a9ea8]" />
                )}
              </button>
              <h3 className="text-base font-medium text-black leading-8 flex-1">{task.title}</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Layers2 action
                }}
                className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-[#FCFAF8] transition-colors"
              >
                <Layers2 className="w-4 h-4 text-[#9a9ea8]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // ArrowUpRight action
                }}
                className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-[#FCFAF8] transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 text-[#9a9ea8]" />
              </button>
            </div>
          </div>

          {/* Card Footer - All chips in one row */}
          <div className="flex items-center gap-2">
            {/* 1. Estimated Close Date */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
                  <Calendar className="w-4 h-4 text-[#5e626e]" />
                  <span className="text-[13px] font-medium text-[#5e626e]">{task.date}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated Close Date</p>
              </TooltipContent>
            </Tooltip>

            {/* 2. Contract Value */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
                  <DollarSign className="w-4 h-4 text-[#5e626e]" />
                  <span className="text-[13px] font-medium text-[#5e626e]">{task.price}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contract Value</p>
              </TooltipContent>
            </Tooltip>

            {/* 3. Last Contact */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
                  <Clock className="w-4 h-4 text-[#5e626e]" />
                  <span className="text-[13px] font-medium text-[#5e626e]">{task.timeAgo}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Last contact</p>
              </TooltipContent>
            </Tooltip>

            {/* 4. Upcoming Call (Icon Only) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center justify-center border rounded-full w-8 h-8 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer ${task.hasCall ? 'border-[#eeeff1]' : 'border-[#fecaca]'}`}>
              {task.hasCall ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_1062_12854)">
                    <path d="M11.2433 12.5791L10.89 14.4024C10.8578 14.5718 10.7907 14.7326 10.6928 14.8746C10.595 15.0165 10.4685 15.1365 10.3216 15.2267C10.1747 15.317 10.0106 15.3756 9.83975 15.3987C9.6689 15.4219 9.49509 15.4091 9.32946 15.3612C7.49863 14.7955 5.82599 13.8084 4.44596 12.4789C3.15831 11.2612 2.15456 9.77493 1.50599 8.12562C0.786099 6.34102 0.496705 4.41194 0.661255 2.49466C0.678636 2.32365 0.731435 2.15813 0.81629 2.00864C0.901146 1.85915 1.0162 1.72897 1.15412 1.62638C1.29205 1.52379 1.44982 1.45105 1.6174 1.41278C1.78498 1.37451 1.95869 1.37155 2.12747 1.40409L3.95079 1.75742C4.24631 1.81168 4.51202 1.97154 4.69839 2.20721C4.88476 2.44288 4.97907 2.73828 4.96376 3.03834C4.92764 3.63676 4.95934 4.23734 5.05825 4.82863C5.09786 5.06201 5.06975 5.30186 4.97723 5.51975C4.88471 5.73764 4.73167 5.92444 4.53624 6.05803L3.61479 6.68032C4.18513 8.36957 5.20084 9.87356 6.55477 11.0336L7.47621 10.4113C7.67313 10.2799 7.90357 10.2077 8.14025 10.2033C8.37693 10.1989 8.60992 10.2624 8.81161 10.3863C9.32315 10.6989 9.86842 10.9527 10.437 11.1427C10.7242 11.2416 10.965 11.4425 11.1136 11.7074C11.2623 11.9722 11.3084 12.2824 11.2433 12.5791Z" stroke="#5E626E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.0754 10.8439C14.5149 9.18156 15.1449 5.85642 13.4826 3.41694C11.8203 0.977473 8.49514 0.347458 6.05566 2.00977" stroke="#5E626E" strokeWidth="1.28436" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.94531 4.12158V7.0114H10.8719" stroke="#5E626E" strokeWidth="1.28436" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1062_12854">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <PhoneOff className="w-4 h-4 text-[#cb2a57]" />
              )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{task.hasCall ? 'Mar 15, 2025 10:00AM' : 'No upcoming call scheduled'}</p>
              </TooltipContent>
            </Tooltip>

            {/* 5. Project Health */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center justify-center border rounded-full w-8 h-8 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer ${getHealthColor()}`}>
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Health {getHealthScore()}/100</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Expanded Task List */}
        {expanded && (
          <div className="flex flex-col gap-2">
            {/* View project status & risks */}
            <div
              onClick={() => setStatusRisksModalOpen(true)}
              className="flex gap-3 items-center p-4 h-[52px] rounded-xl hover:bg-[#fcfaf8] transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#737373] flex-shrink-0" />
              <p className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">View project status & risks</p>
              <ArrowUpRight className="w-4 h-4 text-[#9a9ea8] flex-shrink-0" />
            </div>

            {tasks.map((taskItem) => (
              <div
                key={taskItem.id}
                onClick={() => openTaskDetailModal(taskItem)}
                className="border border-[#e5e5e5] flex gap-3 items-center p-4 rounded-xl hover:bg-[#fcfaf8] transition-colors cursor-pointer"
              >
                {taskItem.completed ? (
                  <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                )}
                <p className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">{taskItem.title}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#737373]" />
                  <span className="text-[13px] text-[#737373] whitespace-nowrap">{taskItem.date}</span>
                </div>
              </div>
            ))}

            {/* Add task button */}
            <div
              onClick={openAddTaskModal}
              className="border border-[#e5e5e5] flex gap-3 items-center p-4 rounded-xl hover:bg-[#fcfaf8] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#737373]" />
              <p className="flex-1 text-sm font-medium text-[#737373]">Add task</p>
            </div>
          </div>
        )}
      </div>

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

      {/* Status & Risks Modal */}
      <Dialog open={statusRisksModalOpen} onOpenChange={(open) => {
        setStatusRisksModalOpen(open);
        if (!open) setStatusRisksView('view');
      }}>
        <DialogContent className="max-w-[960px] max-h-[85vh] p-0 flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="p-6 pb-0 -mb-2 bg-white">
            <DialogHeader className="flex flex-row items-center gap-3">
              {statusRisksView === 'addTask' && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setStatusRisksView('view')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#e5e5e5] flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <DialogTitle className="text-xl font-semibold text-[#0a0a0a]">
                {statusRisksView === 'view' ? 'Project Status & Risks' : 'Add task'}
              </DialogTitle>
            </DialogHeader>

            {/* Tabs - only show in view mode */}
            {statusRisksView === 'view' && (
              <div className="bg-[#fcfaf8] p-1 rounded-2xl flex items-center gap-0 mt-4">
                <button
                  onClick={() => setStatusRisksTab('status')}
                  className={`flex items-center justify-center gap-2 px-2 py-1 flex-1 h-8 ${statusRisksTab === 'status' ? 'bg-white rounded-xl shadow-sm' : ''}`}
                >
                  <Loader className="w-4 h-4" />
                  <span className="text-sm font-medium">Status</span>
                </button>
                <button
                  onClick={() => setStatusRisksTab('risks')}
                  className={`flex items-center justify-center gap-2 px-2 py-1 flex-1 h-8 ${statusRisksTab === 'risks' ? 'bg-white rounded-xl shadow-sm' : ''}`}
                >
                  <CircleAlert className="w-4 h-4" />
                  <span className="text-sm font-medium">Risks</span>
                </button>
              </div>
            )}
          </div>

          {statusRisksView === 'view' ? (
            /* Scrollable Content */
            <div className="overflow-y-auto flex-1">
            <div className="p-6 pt-3">
              {/* Project Details - conditional based on tab */}
              <div className="space-y-1 mb-4">
              {/* Opportunity - shown in both tabs */}
              <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Building2 className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Opportunity</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">{task.title}</span>
                </div>
              </div>

              {/* Health - only shown in Risks tab */}
              {statusRisksTab === 'risks' && (
                <div className="flex items-center gap-4 h-9">
                  <div className="flex items-center gap-2 w-40">
                    <Heart className="w-4 h-4 text-[#737373]" />
                    <span className="text-sm text-[#737373]">Health</span>
                  </div>
                  <div className="flex items-center flex-1 px-3 py-1">
                    <div className="bg-[#fff7e5] border border-[#d96302] px-1.5 rounded-lg h-5 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#73290c]">{getHealthScore()}/100</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Last meeting - only shown in Status tab */}
              {statusRisksTab === 'status' && (
                <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  <Clock className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Last meeting</span>
                </div>
                <div className="flex items-center flex-1 px-3 py-1">
                  <span className="text-sm font-medium text-[#0a0a0a]">Oct 2, 2025</span>
                </div>
              </div>
              )}

              {/* Next call - only shown in Status tab */}
              {statusRisksTab === 'status' && (
                <div className="flex items-center gap-4 h-9">
                <div className="flex items-center gap-2 w-40">
                  {task.hasCall ? (
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
                  {task.hasCall ? (
                    <span className="text-sm font-medium text-[#0a0a0a]">Scheduled</span>
                  ) : (
                    <div className="bg-[#fef2f2] border border-[#dc2626] px-1.5 rounded-lg h-5 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#7f1d1d]">Not scheduled</span>
                    </div>
                  )}
                </div>
              </div>
              )}
            </div>

            {/* Tab Content */}
            <div>
            {statusRisksTab === 'status' && (
              <div className="space-y-6">
                {/* Divider */}
                <div className="h-px bg-[#e5e5e5]" />

                {/* Status Summary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#737373]">Status Summary</h3>
                  <div className="w-full text-sm text-[#0a0a0a] leading-relaxed p-3 border border-[#e5e5e5] rounded-xl bg-white">
                    • Nedu and Kishaya completed a detailed project planning call on January 14, 2026, clarifying scope, priorities, and budget constraints; the main blocker is aligning the project scope with Nedu's $100K target budget, as initial estimates were significantly higher.
                    <br /><br />
                    • No contractors have been matched or site visits scheduled yet; vendor matching is the immediate next step, with Kishaya aiming to introduce contractor options within the next week.
                    <br /><br />
                    • Nedu is scheduled to meet with a finance partner on January 15, 2026, to explore funding options, which may influence project phasing and scope decisions.
                  </div>
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

            {statusRisksTab === 'risks' && (
              <div className="space-y-2">
                {/* Divider */}
                <div className="h-px bg-[#e5e5e5] mb-6" />

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
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
                          onClick={() => openTaskDetailModal({ id: 1, title: 'Match and approve qualified vendors', completed: true, date: '3 days ago' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Match and approve qualified vendors</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">3 days ago</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 2, title: 'Match and approve qualified vendors', completed: false, date: 'Tomorrow' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Match and approve qualified vendors</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">Tomorrow</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setTaskFormData({
                              opportunity: task.title,
                              owner: 'Ben Moody',
                              risk: 'No risks',
                              title: '',
                              dueDate: '',
                              reasoning: ''
                            });
                            setStatusRisksView('addTask');
                          }}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                        onClick={() => {
                          setTaskFormData({
                            opportunity: task.title,
                            owner: 'Ben Moody',
                            risk: 'No risks',
                            title: '',
                            dueDate: '',
                            reasoning: ''
                          });
                          setStatusRisksView('addTask');
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                        onClick={() => {
                          setTaskFormData({
                            opportunity: task.title,
                            owner: 'Ben Moody',
                            risk: 'No risks',
                            title: '',
                            dueDate: '',
                            reasoning: ''
                          });
                          setStatusRisksView('addTask');
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                        onClick={() => {
                          setTaskFormData({
                            opportunity: task.title,
                            owner: 'Ben Moody',
                            risk: 'No risks',
                            title: '',
                            dueDate: '',
                            reasoning: ''
                          });
                          setStatusRisksView('addTask');
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                        onClick={() => {
                          setTaskFormData({
                            opportunity: task.title,
                            owner: 'Ben Moody',
                            risk: 'No risks',
                            title: '',
                            dueDate: '',
                            reasoning: ''
                          });
                          setStatusRisksView('addTask');
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                          onClick={() => openTaskDetailModal({ id: 3, title: 'Schedule follow-up call to discuss timeline', completed: false, date: 'in 5 days' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Schedule follow-up call to discuss timeline</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">in 5 days</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 4, title: 'Send project update and next steps', completed: false, date: 'in 7 days' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full flex-shrink-0" />
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Send project update and next steps</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">in 7 days</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setTaskFormData({
                              opportunity: task.title,
                              owner: 'Ben Moody',
                              risk: 'No risks',
                              title: '',
                              dueDate: '',
                              reasoning: ''
                            });
                            setStatusRisksView('addTask');
                          }}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                          onClick={() => openTaskDetailModal({ id: 5, title: 'Share client testimonials and case studies', completed: true, date: '7 days ago' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Share client testimonials and case studies</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">7 days ago</span>
                          </div>
                        </div>

                        <div
                          onClick={() => openTaskDetailModal({ id: 6, title: 'Discuss value proposition and service benefits', completed: true, date: '5 days ago' })}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fcfaf8] transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#0a0a0a] truncate">Discuss value proposition and service benefits</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Calendar className="w-4 h-4 text-[#737373]" />
                            <span className="text-[13px] text-[#737373] whitespace-nowrap">5 days ago</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setTaskFormData({
                              opportunity: task.title,
                              owner: 'Ben Moody',
                              risk: 'No risks',
                              title: '',
                              dueDate: '',
                              reasoning: ''
                            });
                            setStatusRisksView('addTask');
                          }}
                          className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
                        onClick={() => {
                          setTaskFormData({
                            opportunity: task.title,
                            owner: 'Ben Moody',
                            risk: 'No risks',
                            title: '',
                            dueDate: '',
                            reasoning: ''
                          });
                          setStatusRisksView('addTask');
                        }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e5] w-full hover:bg-[#fcfaf8] text-left"
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
          </div>
          ) : (
            /* Add Task Form */
            <div className="overflow-y-auto flex-1 px-6 py-6">
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
          )}

          {/* Fixed Footer - Only show for Add Task view */}
          {statusRisksView === 'addTask' && (
            <div className="p-6 pt-0 bg-white border-t border-[#e5e5e5]">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStatusRisksView('view')}
                  className="flex-1 bg-white border border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#fcfaf8] rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Handle task creation
                    setStatusRisksView('view');
                  }}
                  className="flex-1 bg-[#0f4331] hover:bg-[#0a3426] text-white rounded-xl"
                >
                  Add task
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ProjectDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        columnName={columnName}
        taskCount={taskCount}
        project={{
          title: task.title,
          status: 'Open',
          health: getHealthScore(),
          estimatedClose: task.date + ', 2026',
          contractValue: task.price,
          lastMeeting: 'Oct 2, 2025',
          hasCall: task.hasCall,
        }}
      />
    </TooltipProvider>
  );
}
