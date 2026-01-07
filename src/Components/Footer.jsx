/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Logo from "../assets/MindLogo.jpg"; 

const Footer = () => {
  return (
    <footer className="bg-blue-300 text-white py-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <img src={Logo} alt="MindWell Logo" className="h-16 mb-4" />
            <p className="text-amber-50">Your mental health companion.</p>

            {/* Location Section */}
            <div className="mt-4 flex items-center gap-2">
              <IoLocationSharp size={24}  />
              <h2 className="text-lg font-semibold text-amber-50">Our Location</h2>
            </div>
            <p className="text-amber-50">House #23, Road #10, Dhanmondi, Dhaka-1209, Bangladesh</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-amber-50">Quick Links</h2>
            <ul className="space-y-2 text-amber-50">
              <li><Link to="/" className="hover:text-fuchsia-400 transition font-bold">Home</Link></li>
              <li><Link to="/self-assessment" className="hover:text-fuchsia-400 transition font-bold">Self Assessment</Link></li>
              <li><Link to="/appointment" className="hover:text-fuchsia-400 transition font-bold">Book Appointment</Link></li>
              <li><Link to="/resources" className="hover:text-fuchsia-400 transition font-bold">Resources</Link></li>
              <li><Link to="/shop" className="hover:text-fuchsia-400 transition font-bold">Mood Enhancer</Link></li>
              <li><Link to="/contact" className="hover:text-fuchsia-400 transition font-bold">Feedback/Review</Link></li>
              <li><Link to ="/AboutUs " className="hover:text-fuchsia-400 transition font-bold">About Us</Link></li>
              <li><Link to ="/AppointmentForm " className="hover:text-fuchsia-400 transition font-bold">AppointmentForm</Link></li>
              
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-amber-50">Contact Us</h2>
            <p className="text-amber-50">Email: mindwell@gmail.com</p>
            <p className="text-amber-50 mb-4">Phone: +880 1111 1111</p>

            <div className="flex space-x-4 text-amber-50">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition font-bold">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition font-bold">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition font-bold">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition font-bold">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white text-sm">
          © {new Date().getFullYear()} MindWell. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
