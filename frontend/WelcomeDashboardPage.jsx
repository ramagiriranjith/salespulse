
import React, { useContext } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import AppBar from '../components/AppBar'
import { NavbarContext } from '../contexts/NavbarContext'

export default function WelcomeDashboardPage() {

  const [isNavbarCollapsed] = useContext(NavbarContext)
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className='flex'>
      <Navbar />
      <div className={isNavbarCollapsed ? `w-full ml-[5.5rem]` : `w-full ml-[5.5rem] md:ml-50`}>



        <Outlet />
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">

          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Welcome, <span className="text-orange-400">Admin!</span>
          </h1>
          <p className="text-lg text-black-600 mt-4">{formattedDate}</p>

        </div>


      </div>
    </div>
  )
}
