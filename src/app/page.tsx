'use client'

import { useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image";

import placeholderImg from '../assets/images/User profile.png'

import { useTaskStore } from "@/providers/task-store-provider";
import TaskList from "@/components/TaskList";


export default function Home() {

  const tasks = useTaskStore(state => state.tasks)
  const fetchTasks = useTaskStore(state => state.fetchTasks)
  const searchQuery = useTaskStore(state => state.searchQuery)



  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const statuses = ["To Do", "In Progress", "Approved", "Reject"];

  return (

    <div className="flex flex-col h-full  pt-[70px] container m-0">

      <div className="bg-white p-6">
        <div className="flex items-center gap-5 mb-4">
          <h1 className="font-semibold text-2xl">Sport Xi Project </h1>
          <span className=" rounded bg-orange font-medium text-xs px-3 py-1">
            In progress
          </span>
        </div>
        <p className="text-neutral-5 mb-4">
          Event production
        </p>
        <div className="flex mb-4 gap-4 items-center">

          <p className="text-neutral-5">assigned</p>
          <div className="flex">
            <span className="flex h-[25px] w-[25px] bg-black rounded-full border border-white  p-2 -mr-2">
              <Image src={placeholderImg} alt="placeholder image" />
            </span>
            <span className="flex h-[25px] w-[25px] bg-black rounded-full border border-white  p-2 -mr-2">
              <Image src={placeholderImg} alt="placeholder image" />
            </span>
            <span className="flex h-[25px] w-[25px] bg-black rounded-full border border-white  p-2 -mr-2">
              <Image src={placeholderImg} alt="placeholder image" />
            </span>


            <span className="flex items-center  h-[25px] w-[25px] bg-gray-200 rounded-full border border-white  p-2 -mr-2 text-[10px]">
              +2
            </span>


          </div>

          <button className="rounded-3xl cursor-pointer text-xs  hover:opacity-80 py-2 border-2 text-neutral-5 gap-2 px-4 border-neutral-7 flex items-center">
            Manage <FaPencil />
          </button>
        </div>

        <div className="h-[1px] bg-[#E6E8EC]" />
        <p className="mt-4 text-neutral-5">
          Last updated on: 04 April, 2022
        </p>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-4   border-t  border-[#E6E8EC] h-full">
        {statuses.map((status) => (
          <TaskList
            key={status}
            status={status}
            tasks={sortedTasks.filter((task) => task.status === status)}
          />
        ))}
      </div>

    </div>
  );
}