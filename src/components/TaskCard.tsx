
import profile from '../assets/images/Vector.png'
import placeholder from '../assets/images/placeholder.png'

import Image from "next/image";

import { MdOutlineMoreHoriz } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";
import { PiLinkSimple } from "react-icons/pi";
import { PiBell } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { BsCalendar2Range } from "react-icons/bs";

import { getCategoryStyle, getStatusStyle } from "@/utils";
import { Task } from '@/types/types';


interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {

    // when start to drag save the id
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("taskId", task.id);
    };

    return (
        <div
            className="bg-white overflow-hidden relative p-3 rounded-lg border-2 border-neutral-6 cursor-move"
            draggable
            onDragStart={handleDragStart}
        >

            {/* Colored stripe to show task status */}
            <div className={` h-[3px] rounded absolute top-0 w-full left-0 ${getStatusStyle(task.status).bg}`}></div>

            <div className="flex  justify-between  items-center gap-2 text-neutral-5">
                <div className="flex items-center gap-2">
                    <div className={`h-[10px] w-[10px] rounded  ${getCategoryStyle(task.category).bg}`} />
                    <p className="text-xs ">{task.category}</p>
                </div>

                <button>
                    <MdOutlineMoreHoriz />
                </button>
            </div>

            <h3 className="text-sm font-semibold my-2">{task.title}</h3>

            <div className="flex mb-3 items-center">
                {Array(task.collaborators).fill(task.collaborators).slice(0, 3).map((d, index) => {
                    return <span key={index} className="flex justify-center p-2  overflow-hidden bg-black rounded-full border border-white  -mr-2">
                        <Image width={8} height={8} className="object-contain" src={profile} alt="placeholder image" />
                    </span>
                })}

                {task.collaborators && task.collaborators > 3 &&
                    <span className="flex items-center justify-center font-semibold  h-[25px] w-[25px] bg-gray-200 rounded-full border border-white  p-2 -mr-2 text-[10px]">
                        +{task.collaborators - 3}
                    </span>
                }

                <div className="px-2 py-1 ml-4 flex items-center gap-1 rounded text-xs bg-neutral-7 text-neutral-5">
                    <RxLightningBolt />  {task.priority}
                </div>
            </div>

            {/* Conditioally render the image */}
            {task.thumbnail && <Image className="w-full rounded mb-3" src={placeholder} alt="Thumbnail" />}

            <hr className="border-neutral-6 border-1  mt-6 " />

            {/* Footer of the task */}
            <div className="flex  gap-y-2 mt-3 flex-wrap gap-4">
                <p className="flex font-medium gap-1 text-neutral-4 text-xs items-center">
                    <PiLinkSimple />
                    {task.collaborators}

                </p>

                <p className="flex font-medium gap-1 text-neutral-4 text-xs items-center">
                    <AiOutlineMessage />
                    {task.comments}

                </p>

                <p className="flex font-medium gap-1 text-neutral-4 text-xs items-center">
                    <BsCalendar2Range />
                    {task.dueDate}

                </p>

                {/* Conditionally render notification */}
                {task.notificationType && <p className="flex font-medium gap-1 text-blue text-xs items-center">
                    <PiBell />
                    {task.notificationType}

                </p>}

                {/* Conditionally render report */}
                {task.reports && <p className="flex font-medium gap-1 text-red text-xs items-center">
                    <RiErrorWarningLine />
                    {task.reports} Reports

                </p>}


            </div>

        </div>
    );
}