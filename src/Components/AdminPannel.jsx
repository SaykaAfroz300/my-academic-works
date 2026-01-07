import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserMd, FaCalendarAlt, FaTools, FaComments, FaPhone } from "react-icons/fa";

const AdminPannel = ({ setSelectedItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Users", icon: <FaUsers /> },
    { label: "Consultants", icon: <FaUserMd /> },
    { label: "Appointment Booking", icon: <FaCalendarAlt /> },
    { label: "Manage Resources", icon: <FaTools /> },
    { label: "View Reviews", icon: <FaComments /> },
    { label: "Helpline Messages", icon: <FaPhone /> }
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="w-1/4 bg-white shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Menu</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelectedItem(item.label)}
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-600 cursor-pointer transition-all"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 text-white py-2 rounded hover:text-gray-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminPannel;
