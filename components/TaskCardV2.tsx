'use client';

import { useState } from 'react';
import { Calendar, DollarSign, Clock, PhoneOff, Heart, ChevronDown, ChevronRight, Check, Plus } from 'lucide-react';
import ProjectDrawer from './ProjectDrawer';

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
}

export default function TaskCardV2({ task, columnName, taskCount }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Sample tasks - different sets based on project title
  const getTaskSet = () => {
    const hash = task.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const taskSets = [
      [
        { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: 'Jan 22' },
        { id: 2, title: 'Call homeowner to review bid and plans', completed: false, date: 'Jan 10' },
        { id: 3, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
      ],
      [
        { id: 1, title: 'Follow up with Gary on site visits and first bid', completed: true, date: 'Jan 25' },
        { id: 2, title: 'Clarify project ownership and update internal records', completed: true, date: 'Jan 28' },
        { id: 3, title: 'Provide clear bid comparison and contractor recommendation', completed: true, date: 'Jan 15' },
        { id: 4, title: 'Review and finalize project scope with stakeholders', completed: false, date: 'Today' },
        { id: 5, title: 'Reschedule meeting to review bids and next steps', completed: false, date: 'Feb 2' },
        { id: 6, title: 'Confirm outcome regarding project award', completed: false, date: 'Feb 5' },
      ],
      [
        { id: 1, title: 'Send recap email for [1/22] call', completed: true, date: 'Jan 22' },
        { id: 2, title: 'Follow up with Gary on site visits and first bid', completed: true, date: 'Jan 25' },
        { id: 3, title: 'Clarify project ownership and update internal records', completed: true, date: 'Jan 28' },
        { id: 4, title: 'Call homeowner to review bid and plans', completed: false, date: 'Jan 10' },
        { id: 5, title: 'Provide clear bid comparison and contractor recommendation', completed: false, date: 'Jan 15' },
        { id: 6, title: 'Match and approve qualified vendors', completed: false, date: 'Today' },
      ],
    ];
    return taskSets[hash % 3];
  };

  const tasks = getTaskSet();

  return (
    <>
      <div className="bg-white rounded-[20px] border border-[#eeeff1] px-4 pt-3 pb-4 transition-colors flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          {/* Title with Chevron */}
          <div
            className="flex items-center cursor-pointer"
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

          {/* Card Footer - All chips in one row */}
          <div className="flex items-center gap-2">
            {/* 1. Estimated Close Date */}
            <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
              <Calendar className="w-4 h-4 text-[#5e626e]" />
              <span className="text-[13px] font-medium text-[#5e626e]">{task.date}</span>
            </div>

            {/* 2. Contract Value */}
            <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
              <DollarSign className="w-4 h-4 text-[#5e626e]" />
              <span className="text-[13px] font-medium text-[#5e626e]">{task.price}</span>
            </div>

            {/* 3. Last Contact */}
            <div className="flex items-center gap-1.5 border border-[#eeeff1] rounded-full px-2 py-2 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer">
              <Clock className="w-4 h-4 text-[#5e626e]" />
              <span className="text-[13px] font-medium text-[#5e626e]">{task.timeAgo}</span>
            </div>

            {/* 4. Upcoming Call (Icon Only) */}
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

            {/* 5. Project Health */}
            <div className={`flex items-center justify-center border rounded-full w-8 h-8 hover:bg-[#FCFAF8] active:bg-[#F8F4F0] transition-colors cursor-pointer ${getHealthColor()}`}>
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>

        {/* Expanded Task List */}
        {expanded && (
          <div className="flex flex-col gap-2">
            {tasks.map((taskItem) => (
              <div
                key={taskItem.id}
                className="bg-white border border-[#e5e5e5] flex gap-3 items-center p-4 rounded-xl shadow-sm hover:bg-[#f8f4f0] transition-colors cursor-pointer"
              >
                {taskItem.completed ? (
                  <div className="w-4 h-4 bg-[#76924f] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 bg-white border border-[#e5e5e5] rounded-full shadow-sm flex-shrink-0" />
                )}
                <p className="flex-1 text-sm font-medium text-[#0a0a0a] overflow-hidden text-ellipsis">{taskItem.title}</p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#737373]" />
                  <span className="text-[13px] text-[#737373]">{taskItem.date}</span>
                </div>
              </div>
            ))}

            {/* Add task button */}
            <div className="bg-white border border-[#e5e5e5] flex gap-3 items-center p-4 rounded-xl shadow-sm hover:bg-[#fcfaf8] transition-colors cursor-pointer">
              <Plus className="w-4 h-4 text-[#737373]" />
              <p className="flex-1 text-sm font-medium text-[#737373]">Add task</p>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
}
