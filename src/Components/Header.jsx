import React from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
  return (
    <div className="bg-blue-500 py-2">
      <div className="container mx-auto flex justify-between items-center px-4 text-white">
        <div className="flex gap-5">
          {/* Email Section */}
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline size={20} />
            <p className="text-sm">Email Us: mindwell@gmail.com</p>
          </div>

          {/* Phone Section */}
          <div className="flex items-center gap-2">
            <IoCall size={20} />
            <p className="text-sm">Phone: +880111111111</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm hover:text-gray-300 transition">
          {/* Login/Registration Link */}
          <Link to="/LogIn"> Login/Registration</Link>
            <BsPerson size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
