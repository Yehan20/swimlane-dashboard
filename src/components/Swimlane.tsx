
import TaskCard from "@/components/TaskCard";


import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useTaskStore } from "@/providers/task-store-provider";
import { Task } from "@/types/types";
import { getStatusStyle } from "@/utils";

interface SwimlaneProps {
    status: string;
    tasks: Task[];
}

export default function Swimlane({ status, tasks }: SwimlaneProps) {

    const updateTaskStatus = useTaskStore(state => state.updateTaskStatus)

    // drop dragged task
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        // update store with the task and status
        updateTaskStatus(taskId, status);


    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };


    const { bg, text } = getStatusStyle(status);

    return (
        <div
            className={`
        border-r  border-neutral-6 
        h-full
        bg-[#F4F5F6]
        `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="py-3 px-4 flex justify-between mb-4  bg-white  ">
                <h2 className={`text-sm font-medium rounded-2xl px-6 py-[6px] min-w-[80px]  ${bg} ${text}`}>{status}</h2>
                <div className="flex gap-2">
                    <button className="cursor-pointer hover:opacity-80">
                        <FaPlus />
                    </button>
                    <button className="cursor-pointer hover:opacity-80">
                        <MdOutlineMoreHoriz />
                    </button>
                </div>
            </div>

            <div className="space-y-4  p-4">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}