import TaskBoardV4 from '@/components/TaskBoardV4';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutGrid, Settings, Bell } from 'lucide-react';

export default function Variant4() {
  return (
    <div className="flex h-screen" style={{ background: '#FCFAF8' }}>
      {/* Left Sidebar */}
      <aside className="w-14 bg-[#FCFAF8] flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-4">
          {/* Add Button - Dark green circle with flourish */}
          <Button
            size="icon"
            className="w-10 h-10 rounded-full bg-[#0f4331] hover:bg-[#0a3426] text-white"
          >
            <Sparkles className="w-5 h-5 fill-current" />
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
        <TaskBoardV4 />
      </main>

      {/* Right Sidebar */}
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
