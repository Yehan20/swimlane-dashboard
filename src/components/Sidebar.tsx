'use client'

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiErrorWarningLine } from "react-icons/ri";
import { GrAppsRounded } from "react-icons/gr";
import { HiOutlineFolder } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { BsCalendar2Range } from "react-icons/bs";

import profileImage from '../assets/images/User-Profile.png';
import { MenuItem } from "@/types/types";



const menuItems: MenuItem[] = [
  {
    icon: <GrAppsRounded size={25} />, label: "Dashboard", active: false,
    path: '/',
  },
  {
    label: "Boards",
    path: '#',
    icon: <HiOutlineFolder size={25} />,
    subItems: [
      { label: "Create routes", icon: <FaChevronRight />, active: false },
      { label: "Development React App", icon: <FaChevronRight />, active: false },
      { label: "Sport XI Project", icon: <FaChevronRight />, active: true },
      { label: "Wordpress theme", icon: <FaChevronRight />, active: false },
    ],
    active: true,
  },
  {
    icon: <AiOutlineMessage size={25} />, label: "Messages", badge: 3, active: false,
    path: '/',
  },
  {
    icon: <BsCalendar2Range size={25} />, label: "Calendar", active: false,
    path: '/',
  },
  {
    icon: <LuUserRound size={25} />, label: "Team members", active: false,
    path: '/',
  },
];

type SidebarProps = {
  toggleMobileSidebar: () => void;
  isMobileOpen: boolean;
};


export default function Sidebar({ isMobileOpen, toggleMobileSidebar }: SidebarProps) {

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ Boards: true });

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };



  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64  py-4 lg:py-5 bg-white z-2 md:min-h-screen flex-col justify-between hidden md:flex">
        <div className="px-4 pt-[75px] border-r border-neutral-6">
       
          <div className=" flex items-center rounded-lg border-2 gap-3 py-2 border-neutral-7 px-3 ">
            <Image src={profileImage} height={50} width={50} alt='Profile' />
            <div className="">

              <p className="text-neutral-5 text-sm">Workspace</p>
              <p className="text-base">Root folder</p>


            </div>
            <button className="ml-auto"><FaChevronDown /></button>
          </div>

          <ul className="mt-6">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => item.subItems && toggleExpand(item.label)} // Added onClick for desktop
                >
                  <Link href={item.path} className={`flex hover:text-blue  rounded-lg p-2 w-full items-center ${item.active ? 'border-2 border-neutral-7 text-blue ' : ' text-neutral-4'}`}>


                    {item.icon as ReactNode}

                    <span
                      className={`ml-4  ${item.active ? 'text-blue ' : ''}`}
                    >
                      {item.label}
                    </span>


                    {item.badge && (
                      <span className="ml-auto bg-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      expanded[item.label] ? (
                        <FaChevronUp className="ml-auto" />
                      ) : (
                        <FaChevronDown className="ml-auto" />
                      )
                    )}

                  </Link>

                </div>
                {item.subItems && expanded[item.label] && (
                  <ul className="px-2 mt-4 rounded-lg  border-2 border-neutral-7">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="mb-1">


                        <Link href={'/'} className={`flex  hover:text-blue  text-sm rounded-lg py-1 w-full items-center ${subItem.active ? ' text-blue ' : 'text-neutral-4'}`}>
                          {subItem.icon as ReactNode}
                          <span
                            className={`ml-2 ${item.active ? "p-1 rounded" : ""}`}
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

        {/* Bottom button */}
        <div className="px-6  border-r border-neutral-6">
          <Link className="flex mb-6 text-neutral-4 items-center hover:text-blue gap-4 " href={'/'}><RiErrorWarningLine size={25} /> Support</Link>
          <button className="w-full bg-neutral-3  -mx-2 text-white py-2 px-2 rounded-lg flex items-center hover:opacity-80 cursor-pointer">
            <BiLogOut size={25} className="mr-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar start */}
      <div
        className={`w-[275px]  bg-white shadow top-0 bottom-0  flex flex-col h-screen  overflow-auto justify-between z-50 fixed transition-transform duration-150 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >

        {/* Mobile side bar top */}
        <div className="px-4 pt-5 border-r  border-neutral-6">
          <div className="w-full flex items-center">
            <h2 className="text-xl font-bold text-blue">Menu</h2>
          </div>
          <div className="mt-4 flex items-center rounded-lg border-2 border-neutral-7 p-2 gap-2">
            <Image src={profileImage} height={50} width={50} alt='Profile' />
            <div>
              <p className="text-neutral-5 text-sm">Workspace</p>
              <p className="text-base">Root folder</p>
            </div>
            <button className="ml-auto"><FaChevronDown /></button>
          </div>

          <ul className="mt-4">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => item.subItems && toggleExpand(item.label)}
                >
                  <Link
                    href={item.path}
                    className={`flex  hover:text-blue rounded-lg p-2 w-full items-center ${item.active ? 'border-2 border-neutral-7 text-blue' : 'text-neutral-4'}`}
                  >
                    {item.icon as ReactNode}
                    <span className="ml-3">{item.label}</span>

                    {item.badge && (
                      <span className="ml-auto bg-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      expanded[item.label] ? (
                        <FaChevronUp className="ml-auto" />
                      ) : (
                        <FaChevronDown className="ml-auto" />
                      )
                    )}
                  </Link>
                </div>

                {item.subItems && expanded[item.label] && (
                  <ul className="px-2 mt-4 rounded-lg border-2 border-neutral-7">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="mb-1">
                        <Link
                          href="/"
                          className={`flex text-sm hover:text-blue rounded-lg py-1 w-full items-center ${subItem.active ? 'text-blue' : ' text-neutral-4'}`}
                        >
                          {subItem.icon as ReactNode}
                          <span className="ml-2">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile bottom buttomns */}
        <div className="px-6 border-r border-neutral-6  mb-6">
          <Link className="flex text-neutral-4 items-center hover:text-blue gap-3 mb-3" href={'/'}>
            <RiErrorWarningLine size={25} /> Support
          </Link>
          <button className="w-full -mx-2 bg-neutral-3 text-white py-2 px-2 rounded-lg flex items-center hover:opacity-80 cursor-pointer">
            <BiLogOut size={25} className="mr-3" />
            Logout
          </button>
        </div>
      </div>


      {/* Overlay effect */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}


    </>
  );
}