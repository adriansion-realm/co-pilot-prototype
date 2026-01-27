import TaskCardV4 from './TaskCardV4';

interface Task {
  id: number;
  title: string;
  date: string;
  price: string;
  timeAgo: string;
  hasCall: boolean;
  health: 'good' | 'medium' | 'bad';
}

interface TaskColumnProps {
  title: string;
  badgeColor?: string;
  count: number;
  tasks: Task[];
  showCompleted: boolean;
}

export default function TaskColumnV4({ title, badgeColor, count, tasks, showCompleted }: TaskColumnProps) {
  const getBadgeStyles = () => {
    if (title === 'Overdue') return 'bg-[#cb2a57] text-white';
    if (title === 'Today') return 'bg-[#76924f] text-white';
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <div className="flex-shrink-0 w-[420px] min-w-[420px] max-w-[500px]">
      <div className="bg-[#fcfaf8] rounded-t-[28px] rounded-b-none px-2 pt-3 pb-0 h-full flex flex-col">
        {/* Column Header */}
        <div className="flex items-center gap-2 px-2 mb-2">
          <div className={`h-6 px-2 rounded-full text-xs font-semibold flex items-center justify-center ${getBadgeStyles()}`}>
            {count}
          </div>
          <h2 className="text-lg font-bold text-black tracking-tight">{title}</h2>
        </div>

        {/* Task Cards */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          {tasks.map((task) => (
            <TaskCardV4 key={task.id} task={task} columnName={title} taskCount={count} showCompleted={showCompleted} />
          ))}
        </div>
      </div>
    </div>
  );
}
