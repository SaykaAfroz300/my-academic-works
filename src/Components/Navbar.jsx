/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "../assets/MindLogo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="py-4 z-50 bg-blue-300 bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="MindWell - Your Mental Wellness Companion"
              className="h-12 w-auto"
            />
            <p className="text-amber-100 font-bold font-serif text-lg">MindWell</p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex gap-10 items-center font-lato text-amber-100">
              <li>
                <Link to="/" className="hover:text-fuchsia-400 transition font-bold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-fuchsia-400 transition font-bold">
                  Take Assessment
                </Link>
              </li>
              <li>
              <Link to="/book-appointment" className="hover:text-fuchsia-400 transition font-bold">
                 Book Appointment</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-fuchsia-400 transition font-bold">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/MoodTracking" className="hover:text-fuchsia-400 transition font-bold">
                  Mood Tracking
                </Link>
              </li>
              <li>
                <Link to="/MoodEnhancement" className="hover:text-fuchsia-400 transition font-bold">
                  Mood Enhancement
                </Link>
              </li>

             
                <li>
                <Link to="/Feedback" className="hover:text-fuchsia-400 transition font-bold">


                  Feedback/Review
                </Link>
              </li>
              <li>
                <Link to="/Helpline" className="hover:text-fuchsia-400 transition font-bold">
                  Helpline
                </Link>

              </li>
            
              

            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-100 hover:text-fuchsia-400 transition font-bold"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? (
                <span className="text-2xl">&#10005;</span> // Close icon (X)
              ) : (
                <span className="text-2xl">&#9776;</span> // Hamburger menu (3 lines)
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/assessment" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                Take Assessment
              </Link>
            </li>
            <li>
              <Link to="/book-appointment" className="hover:text-fuchsia-400 transition font-bold">
                 Book Appointment</Link>
              </li>
            <li>
              <Link to="/resources" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                Resources
              </Link>
            </li>
            <li>
                <Link to="/MoodTracking" className="hover:text-fuchsia-400 transition font-bold">
                  Mood Tracking
                </Link>
              </li>
            <li>
            <Link to="/MoodEnhancement" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                  Mood Enhancement
            </Link>
            </li>

            <li>
              <Link to="/Feedback" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                Feedback/Review
              </Link>
            </li>
             <li>
              <Link to="/Helpline" className="block text-amber-100 font-bold hover:text-fuchsia-400 transition">
                Helpline
              </Link>
              </li>

            <li>
              <Link to="/about" className="hover:text-fuchsia-400 transition font-bold">
                  About Us
              </Link>
            </li>  
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
