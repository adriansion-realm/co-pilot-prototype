"use client";

import { useState } from 'react';
import TaskColumnV3 from './TaskColumnV3';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, ListFilter, ChevronDown } from 'lucide-react';

const taskData = {
  overdue: [
    { id: 1, title: 'Weiss family ADU', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'good' as const },
    { id: 2, title: 'Klaus family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'bad' as const },
    { id: 3, title: 'DuMont family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'good' as const },
    { id: 4, title: 'Abbington family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'good' as const },
  ],
  today: [
    { id: 5, title: 'Olafsson family bathroom', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'good' as const },
    { id: 6, title: 'Sinclair family living room', date: 'Mar 10', price: '$32,000', timeAgo: '8h ago', hasCall: false, health: 'good' as const },
    { id: 7, title: 'Asakawa family interior remodel', date: 'Mar 15', price: '$32,000', timeAgo: '10d ago', hasCall: true, health: 'good' as const },
    { id: 8, title: 'Sinclair family living room', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'medium' as const },
  ],
  later: [
    { id: 9, title: 'Feuerstein family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '1d ago', hasCall: true, health: 'good' as const },
    { id: 10, title: 'Van Derlun family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '1d ago', hasCall: true, health: 'good' as const },
    { id: 11, title: 'Cortez family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'good' as const },
    { id: 12, title: 'Petrov family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'medium' as const },
  ],
  noTasks: [
    { id: 13, title: 'Feuerstein family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'good' as const },
    { id: 14, title: 'Van Derlun family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: true, health: 'good' as const },
    { id: 15, title: 'Cortez family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'good' as const },
    { id: 16, title: 'Petrov family kitchen', date: 'Mar 15', price: '$32,000', timeAgo: '2d ago', hasCall: false, health: 'good' as const },
    { id: 17, title: 'Johnson family living room', date: 'Mar 14', price: '$25,500', timeAgo: '3d ago', hasCall: false, health: 'good' as const },
    { id: 18, title: 'Smith family bathroom', date: 'Mar 12', price: '$18,700', timeAgo: '5d ago', hasCall: false, health: 'good' as const },
    { id: 19, title: 'Lee family bedroom', date: 'Mar 10', price: '$22,300', timeAgo: '7d ago', hasCall: true, health: 'good' as const },
    { id: 20, title: 'Garcia family dining area', date: 'Mar 8', price: '$29,100', timeAgo: '9d ago', hasCall: false, health: 'medium' as const },
  ],
};

export default function TaskBoardV3() {
  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <div className="flex flex-col bg-white rounded-[20px] shadow-lg overflow-hidden h-full">
      {/* Top Bar */}
      <header className="px-6 py-6 flex items-center justify-between border-b border-[#f5f5f5]">
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="gap-2 rounded-xl h-9 px-4">
            <Plus className="w-4 h-4" />
            <span>Add task</span>
            <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-lg ml-1">⌘N</kbd>
          </Button>
          <Button variant="ghost" className="gap-2 rounded-xl h-9 px-4">
            <ListFilter className="w-4 h-4" />
            <span>Add filter</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-3 px-3 py-1.5 border border-[#e5e5e5] rounded-xl h-9 bg-white shadow-sm cursor-pointer hover:bg-accent">
            <span className="text-sm">last 7 days</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Task Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-3 px-6 pt-6 pb-0">
          <TaskColumnV3 title="Overdue" badgeColor="bg-[#cb2a57] text-white" count={taskData.overdue.length} tasks={taskData.overdue} showCompleted={showCompleted} />
          <TaskColumnV3 title="Today" badgeColor="bg-[#76924f] text-white" count={taskData.today.length} tasks={taskData.today} showCompleted={showCompleted} />
          <TaskColumnV3 title="Later" count={taskData.later.length} tasks={taskData.later} showCompleted={showCompleted} />
          <TaskColumnV3 title="No tasks" count={taskData.noTasks.length} tasks={taskData.noTasks} showCompleted={showCompleted} />
        </div>
      </div>
    </div>
  );
}
