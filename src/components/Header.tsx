
import searchIcon from '../assets/images/Search.png'
import bellIcon from '../assets/images/bell.png'
import settingsIcon from '../assets/images/Settings.png'
import profileIcon from '../assets/images/User profile.png'
import logo from '../assets/images/logo.png'
import Image from "next/image";



export default function Header() {


  return (
    <div className="bg-white border-b  z-3 border-[#E6E8EC] p-4 fixed w-full left-0 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={logo} alt="board app" />
        <h2 className="text-lg font-semibold text-gray-800">Board  <span className="text-blue-600">App</span></h2>
      </div>

      <div className="flex  gap-x-6">
        <button className="bg-blue-600 font-semibold text-white px-4 py-2 text-sm
         rounded-lg
        ">Create new board +</button>

        <div className="bg-[#F4F5F6] py-2 px-4 rounded-lg flex gap-1 items-center">
          <Image alt="search icon" src={searchIcon} />
          <input
            type="text"

            placeholder="Search tasks..."
          
            className="p-1 focus:outline-0 border-0 text-sm w-64"
          />
        </div>


        <div className="flex space-x-3 items-center">
          <button className="cursor-pointer hover:opacity-60">
            <Image alt="settings icon" src={settingsIcon} />
          </button>

          <button className="cursor-pointer hover:opacity-60">
            <Image alt="bell icon" src={bellIcon} />
          </button>

           <Image width={30} height={30} alt="profile" src={profileIcon} />

        </div>
      </div>
    </div>
  );
}