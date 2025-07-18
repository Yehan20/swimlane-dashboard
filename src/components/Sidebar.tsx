'use client'

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiErrorWarningLine } from "react-icons/ri";
import { GrAppsRounded } from "react-icons/gr";
import { HiOutlineFolder } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { BsCalendar2Range } from "react-icons/bs";

import profileImage from '../assets/images/User profile.png';
import { MenuItem } from "@/types/types";



const menuItems: MenuItem[] = [
  { icon: <GrAppsRounded />, label: "Dashboard", active: false,
    path:'/',
   },
  {
    label: "Boards",
    path:'#',
    icon: <HiOutlineFolder />,
    subItems: [
      { label: "Create routes", icon: <FaChevronRight />, active: false },
      { label: "Development React App", icon: <FaChevronRight />, active: false },
      { label: "Sport XI Project", icon: <FaChevronRight />, active: true },
      { label: "Wordpress theme", icon: <FaChevronRight />, active: false },
    ],
    active: true,
  },
  { icon: <AiOutlineMessage />, label: "Messages", badge: 3, active: false ,
    path:'/',
  },
  { icon: <BsCalendar2Range />, label: "Calendar", active: false ,
    path:'/',
  },
  { icon: <LuUserRound />, label: "Team members", active: false,
    path:'/',
   },
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ Boards: true });

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 py-2 bg-white z-2 md:min-h-screen flex-col justify-between hidden sm:flex">
        <div className="px-4 pt-3 border-r border-[#E6E8EC]">
          <div className="h-16 w-full flex items-center">
            <h2 className="text-xl font-bold text-[#007BFF]">Board App</h2>
          </div>
          <div className="mt-4 flex items-center rounded-lg border-2 border-neutral-7 p-2 justify-between">
            <Image src={profileImage} height={50} width={50} alt='Profile' />
            <div className="">

              <p className="text-neutral-5 text-sm">Workspace</p>
              <p className="text-base">Root folder</p>


            </div>
            <button><FaChevronDown /></button>
          </div>

          <ul className="mt-12">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => item.subItems && toggleExpand(item.label)} // Added onClick for desktop
                >
                  <Link href={item.path} className={`flex text-neutral-4 hover:text-blue  rounded-lg p-2 w-full items-center ${item.active ? 'border-2 border-neutral-7 text-blue ' : ''}`}>
                    {item.icon as ReactNode}
                    <span
                      className={`ml-2`}
                    >
                      {item.label}
                    </span>


                    {item.badge && (
                      <span className="ml-auto bg-[#FF5733] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      expanded[item.label] ? (
                        <FaChevronDown className="ml-auto" />
                      ) : (
                        <FaChevronRight className="ml-auto" />
                      )
                    )}

                  </Link>

                </div>
                {item.subItems && expanded[item.label] && (
                  <ul className="px-2 mt-4 rounded-lg  border-2 border-neutral-7">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="mb-1">
                        {/* <div
                          className={`flex items-center cursor-pointer ${subItem.active ? "font-bold text-white bg-[#007BFF] p-1 rounded" : "text-gray-700"}`}
                        >
                          <span>{subItem.label}</span>
                        </div> */}


                        <Link href={'/'} className={`flex text-neutral-4  text-sm rounded-lg py-1 w-full items-center ${subItem.active ? ' text-blue ' : ''}`}>
                          {subItem.icon as ReactNode}
                          <span
                            className={`ml-2 ${item.active ? "p-1 rounded" : "text-gray-700"}`}
                          >
                            {subItem.label}
                          </span></Link>

                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

        </div>

        <div className="px-6  border-r border-[#E6E8EC]">
          <Link className="flex text-neutral-4 items-center hover:text-blue gap-2 " href={'/'}><RiErrorWarningLine/> Support</Link>
          <button className="w-full bg-[#333333] mt-3 text-white py-2 px-2 rounded-lg flex items-center hover:opacity-80 cursor-pointer">
            <BiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`w-64 bg-white shadow h-screen flex-col justify-between z-50 fixed transition-transform duration-150 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} sm:hidden`}
      >
        <button
          aria-label="close sidebar"
          className="h-10 w-10 bg-gray-200 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-gray-700"
          onClick={toggleMobileSidebar}
        >
          {/* <FaTimes className="text-xl" /> */}
        </button>
        <div className="px-8">
          <div className="h-16 w-full flex items-center">
            <h2 className="text-xl font-bold text-[#007BFF]">Board App</h2>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">workspace: Root folder</p>
          </div>
          <ul className="mt-12">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => item.subItems && toggleExpand(item.label)}
                >
                  <Link href={'/'} className="flex items-center gap-2">
                    {item.icon as ReactNode}
                    <span
                      className={`ml-2 ${item.active ? "font-bold text-white bg-[#007BFF] p-1 rounded" : "text-gray-700"}`}
                    >
                      {item.label}
                    </span>
                  </Link>

                  {item.badge && (
                    <span className="ml-auto bg-[#FF5733] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.badge}
                    </span>
                  )}
                  {item.subItems && (
                    expanded[item.label] ? (
                      <FaChevronDown className="ml-2 text-gray-700" />
                    ) : (
                      <FaChevronRight className="ml-2 text-gray-700" />
                    )
                  )}
                </div>
                {item.subItems && expanded[item.label] && (
                  <ul className="ml-6 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="mb-2">
                        <div
                          className={`flex items-center cursor-pointer ${subItem.active ? "font-bold text-white bg-[#007BFF] p-1 rounded" : "text-gray-700"}`}
                        >
                          <span>{subItem.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 mt-8">
          <button className="w-full bg-[#333333] text-white py-2 rounded-lg flex items-center justify-center">
            <BiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 sm:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Mobile Toggle Button */}
      <button
        aria-label="toggle sidebar"
        className="h-10 w-10 bg-gray-200 fixed right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-[#007BFF] sm:hidden"
        onClick={toggleMobileSidebar}
      >
        <FaBars className="text-xl text-gray-700" />
      </button>
    </>
  );
}