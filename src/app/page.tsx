'use client'

import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image";

import { format } from "date-fns";


import placeholderImg from '../assets/images/User-Profile.png'

import { useTaskStore } from "@/providers/task-store-provider";
import Swimlane from "@/components/Swimlane";
import Spinner from "@/components/Spinner";


export default function Page() {

  // Data and methods from the store
  const tasks = useTaskStore(state => state.tasks)
  const fetchTasks = useTaskStore(state => state.fetchTasks)
  const searchQuery = useTaskStore(state => state.searchQuery)
  const loading = useTaskStore(state => state.loading)
  const lastUpdated = useTaskStore(state => state.lastUpdated)

  // state
  const [formatDate,setFormDate] = useState('');

  // Load the tasks
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //set formate date
  useEffect(() => {
    setFormDate(format(new Date(), 'PPpp'))
  }, [])

  // Filter tasks based on the search query when  user type
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Every re-render sort task so the dragged task will stay on top
  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const statuses = ["To Do", "In Progress", "Approved", "Reject"];

  return (

    <div className="flex flex-col h-full  pt-[70px] container m-0">

      {/* Home page header section */}
      <div className="bg-white pt-[155px] pb-4 px-6 md:pt-7 md:pb-6">
        <div className="flex items-center gap-5 mb-4">
          <h1 className="font-semibold text-2xl">Sport Xi Project </h1>
          <span className=" rounded bg-orange font-medium text-xs px-3 py-1">
            In progress
          </span>
        </div>
        <p className="text-neutral-5 mb-4">
          Event production
        </p>

        <div className="flex mb-4 gap-6 items-center">

          <p className="text-neutral-5">Assigned</p>
          <div className="flex">
            <span className="flex justify-center h-[25px] w-[25px] bg-black rounded-full border border-white   -mr-2">
              <Image className="object-contain" src={placeholderImg} alt="placeholder image" />
            </span>
            <span className="flex justify-center h-[25px] w-[25px] bg-black rounded-full border border-white   -mr-2">
              <Image className="object-contain" src={placeholderImg} alt="placeholder image" />
            </span>
            <span className="flex justify-center h-[25px] w-[25px] bg-black rounded-full border border-white   -mr-2">
              <Image className="object-contain" src={placeholderImg} alt="placeholder image" />
            </span>


            <span className="flex items-center justify-center  font-semibold h-[25px] w-[25px] bg-gray-200 rounded-full border border-white  p-2 -mr-2 text-[10px]">
              +2
            </span>


          </div>

          <button className="rounded-3xl cursor-pointer text-base hover:opacity-80 py-[6px] border-2 text-neutral-5 gap-2 px-4 border-neutral-7 flex items-center">
            Manage <FaPencil />
          </button>
        </div>

        <div className="hidden lg:block h-[1px] bg-[#E6E8EC]" />
        <p className="md:mt-4 text-neutral-5">
          Last updated on: {lastUpdated ?? formatDate}
        </p>
      </div>

      {/* Render tasks */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-[#E6E8EC] h-full">
          {statuses.map((status) => (
            <Swimlane
              key={status}
              status={status}
              tasks={sortedTasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      )}

    </div>
  );
}