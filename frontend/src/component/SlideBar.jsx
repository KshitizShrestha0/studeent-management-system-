import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import {
    FaBars,
    FaHome,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaCog
} from "react-icons/fa";
const SlideBar = () => {

    const [open, setOpen] = useState(true);
    return (
        <div className='flex '>
            <div className={`bg-gradient-to-br from-[#0B3D91] via-[#3F3B96] to-[#B7193F] text-white h-screen p-5 pt-8 duration-200`}>
                <div className='flex item-center gap-4'>
                    <div className='flex justify-start'>
                        <button onClick={() => setOpen(!open)}>
                            <FaBars size={24} />
                        </button>
                    </div>
                    {open && <h1 className={`text-2xl font-bold duration-300`}>Let's Learn</h1>}

                </div>


                <ul className='mt-10 space-y-4'>
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-4 hover:bg-gradient-to-r
    hover:from-blue-800 hover:via-purple-700 hover:to-red-700
    p-2 rounded cursor-pointer transition-all duration-300"
                        >
                            <FaHome size={24} />
                            {open && "Home"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/show-student"
                            className="flex items-center gap-4 hover:bg-gradient-to-r
    hover:from-blue-800 hover:via-purple-700 hover:to-red-700
    p-2 rounded cursor-pointer transition-all duration-300"
                        >
                            <FaUserGraduate size={24} />
                            {open && "student"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/show-teacher"
                            className="flex items-center gap-4 hover:bg-gradient-to-r
    hover:from-blue-800 hover:via-purple-700 hover:to-red-700
    p-2 rounded cursor-pointer transition-all duration-300"
                        >
                            <FaChalkboardTeacher size={24} />
                            {open && "teacher"}
                        </Link>
                    </li>
                    <li className='flex items-center gap-4 hover:bg-gradient-to-r hover:from-blue-800 hover:via-purple-700 hover:to-red-700 p-2 rounded cursor-pointer transition-all duration-300'>
                        <FaCog size={24} />
                        {open && "setting"}
                    </li>
                </ul>

            </div>
            <main className="flex-1  p-6 bg-gray-100 h-screen  overflow-y-auto min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}

export default SlideBar