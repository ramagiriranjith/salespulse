import React from 'react'
import LNavbar from './LandingPage/LNavbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Inventory from '../components/POSolutions/Inventory'
import POSSolutions from '../components/POSolutions/POSSolutions'
export default function PosSystemPage() {
  return (
    <div className="w-full">
  {/* navbar */}
  <LNavbar />
  {/* navbar */}

  {/* hero */}
  <div
    className="w-full container mx-auto flex flex-col px-6 lg:px-0 relative"
    style={{
      backgroundImage: `url('/assets/pos-new.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '500px',
      color: 'white', // Ensure all text inside is white
    }}
  >
     <div className="absolute inset-0 bg-black opacity-70"></div>
    {/* <div className="absolute inset-0 bg-black opacity-15"></div> */}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 px-6">
      <h3 className="text-3xl lg:text-5xl font-bold text-white text-left">
        Streamlined POS Reporting
      </h3>

      <p className="text-gray-200 mt-4 text-left">
        Access your restuarant's sales, inventory, and reports with ease on any device.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link
          className=" text-white bg-blue-800 rounded-full px-5 py-3 transition active:scale-95"
          to="/login"
        >
          Get Started
        </Link>
      </div>
    </div>
  </div>
    {/* Invenotry */}
   <POSSolutions />
    {/* Invenotry */}
  {/* footer */}
  <Footer />
  {/* footer */}
</div>

  )
}
