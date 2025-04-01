import React from "react";
import LNavbar from "./LNavbar";
import { Link } from "react-router-dom";
import {
  IconChefHat,
  IconDeviceIpadHorizontal,
  IconDeviceTablet,
  IconLayout,
} from "@tabler/icons-react";
import Logo from "../../assets/logo.png";
import { subscriptionPrice } from "../../config/config";
import SectionTitle from "../../common/SectionTitle";
import Testimonials from "../../components/Testimonials/Testimonials";
import Inventory from "../../components/POSolutions/Inventory";
import About from "../../components/About";
import Footer from "../../components/Footer";
export default function LadingPage() {
  return (
    <div className="w-full">
      {/* navbar */}
      <LNavbar />
      {/* navbar */}

      {/* hero */}
      <div
        className="w-full container mx-auto flex flex-col items-center justify-center px-6 lg:px-0"
        style={{
          backgroundImage: `url('/assets/hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '600px',
          color: 'white', // Ensure all text inside is white
        }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-15"></div> */}
        <h3 className="text-3xl lg:text-5xl font-bold text-center text-white">
          Empower Your Business with Real Time Insights
        </h3>

        <p className="text-gray-200 mt-8 text-center">
          Integrate POS data into dashboards for optimized sales and inventory managed across devices
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Link
            className="hover:bg-restro-green-dark bg-restro-green text-lg text-white rounded-full px-5 py-3 transition active:scale-95"
            to="/login"
          >
            Get Started
          </Link>
        </div>
      </div>


      {/* hero */}
      {/* About */}
      <About />
      {/* About */}

      {/* inventory */}
      <Inventory />


      {/* inventory */}

      {/* Users */}
      <Testimonials />
      {/* Users */}


      {/* features */}

      {/* features */}






      {/* footer */}
      <Footer />
      {/* footer */}
    </div>
  );
}
