/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Heading from "../Components/Heading";
import AdminPannel from "../Components/AdminPannel";
import UserList from "../Components/UserList";
import ConsultantList from "../Components/ConsultantList"
import AdminResources from "../Components/AdminResources"
const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedItem) {
      case "Users":
        return <div><UserList/></div>
      case "Consultants":
        return <div><ConsultantList/></div>;
      case "Appointment Booking":
        return <div>Appointments list and booking management.</div>;
      case "Manage Resources":
        return <div><AdminResources/></div>;
      case "View Reviews":
        return <div>User reviews and comments overview.</div>;
      case "Helpline Messages":
        return <div>Messages sent through helpline appear here.</div>;
      default:
        return <div>Welcome to the admin dashboard! Select an option from the menu.</div>;
    }
  };

  return (
    <>
      <Heading Headline={"Welcome to Admin Dashboard"} pagename={"Admin"} />
      <div className="mx-auto flex">
        <AdminPannel setSelectedItem={setSelectedItem} />
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            {selectedItem}
          </h1>
          <div className="bg-white p-4 rounded shadow">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Admin;