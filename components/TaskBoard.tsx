"use client";

import TaskColumn from './TaskColumn';
import { Button } from '@/components/ui/button';
import { Plus, ListFilter } from 'lucide-react';

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

export default function TaskBoard({ variant = 'drawer' }: { variant?: 'drawer' | 'fullpage' }) {
  return (
    <div className="flex flex-col bg-white rounded-[20px] shadow-lg overflow-hidden h-full">
      {/* Top Bar */}
      <header className="px-6 py-6 flex items-center border-b border-[#f5f5f5]">
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
      </header>

      {/* Task Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-3 px-6 pt-6 pb-0">
          <TaskColumn title="Overdue" badgeColor="bg-[#cb2a57] text-white" count={taskData.overdue.length} tasks={taskData.overdue} variant={variant} />
          <TaskColumn title="Today" badgeColor="bg-[#76924f] text-white" count={taskData.today.length} tasks={taskData.today} variant={variant} />
          <TaskColumn title="Later" count={taskData.later.length} tasks={taskData.later} variant={variant} />
          <TaskColumn title="No tasks" count={taskData.noTasks.length} tasks={taskData.noTasks} variant={variant} />
        </div>
      </div>
    </div>
  );
}
