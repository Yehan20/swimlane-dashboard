
'use client';

import searchIcon from '../assets/images/Search.png'
import bellIcon from '../assets/images/bell.png'
import settingsIcon from '../assets/images/Settings.png'
import profileIcon from '../assets/images/User profile.png'
import logo from '../assets/images/logo.png'

import Image from "next/image";

import { useTaskStore } from '@/providers/task-store-provider'
import { FaBars, FaPlus } from 'react-icons/fa';

type HeaderProps = {
  toggleSidebar: () => void;
};


export default function Header({ toggleSidebar }: HeaderProps) {
  // Store data
  const searchQuery = useTaskStore(state => state.searchQuery)
  const setSearchQuery = useTaskStore(state => state.setSearchQuery)

  return (
    <div className="bg-white border-b  z-3 border-neutral-6 px-4 py-3 fixed w-full left-0 flex-col flex md:flex-row justify-between items-center md:gap-0 gap-4">



      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src={logo} alt="board app" />
        <h2 className="text-lg font-semibold text-gray-800">Board  <span className="text-blue-600">App</span></h2>
      </div>

      {/* Show in screen size after md */}
      <div className="flex md:hidden space-x-3 items-center">
        <button className="cursor-pointer hover:opacity-60">
          <Image alt="settings icon" src={settingsIcon} />
        </button>

        <button className="cursor-pointer hover:opacity-60">
          <Image alt="bell icon" src={bellIcon} />
        </button>

        <Image width={30} height={30} alt="profile" src={profileIcon} />

      </div>

      {/* Search bar */}
      <div className="flex flex-col md:flex-row  gap-3">
        <button className="flex gap-2 items-center cursor-pointer  bg-blue font-semibold text-white px-4 py-[10px] text-xs
         rounded-md hover:opacity-80
        ">Create new board <FaPlus /></button>


        <div className="bg-neutral-7 py-[10px] px-4 rounded-lg flex gap-1 items-center">
          <Image alt="search icon" src={searchIcon} />
          <input
            type="text"

            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 focus:outline-0 border-0 text-sm w-64 placeholder:text-neutral-5"
          />
        </div>

        <div className="hidden md:flex space-x-3 items-center">
          <button className="cursor-pointer hover:opacity-60">
            <Image alt="settings icon" src={settingsIcon} />
          </button>

          <button className="cursor-pointer hover:opacity-60">
            <Image alt="bell icon" src={bellIcon} />
          </button>

          <Image width={30} height={30} alt="profile" src={profileIcon} />

        </div>
      </div>

      {/* Sidlebar toggle button */}
      <button onClick={toggleSidebar} className="md:hidden p-2 absolute right-3 top-2 cursor-pointer text-blue hover:text-black">
        <FaBars size={20} />
      </button>

    </div>
  );
}