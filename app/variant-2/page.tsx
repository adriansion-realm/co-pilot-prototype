import TaskBoard from '@/components/TaskBoard';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutGrid, Settings, Bell } from 'lucide-react';

export default function Variant2() {
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
        <TaskBoard />
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
