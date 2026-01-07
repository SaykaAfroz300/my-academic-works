import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data.users || []); // Adjust based on your backend response
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Function to open the modal and set the selected user
  const handleViewDetails = (user) => {
    setSelectedUser(user); // Set the user to be displayed in the modal
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null); // Reset selected user
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="p-4 border rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => handleViewDetails(user)} // Open modal with the user data
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for displaying user details */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">{selectedUser.name}</h3>
            <p className="text-lg mb-2"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="text-lg mb-2"><strong>Phone:</strong> {selectedUser.phone}</p>
            <p className="text-lg mb-2"><strong>Gender:</strong> {selectedUser.gender}</p>
            {/*<p className="text-lg mb-2"><strong>Age:</strong> {selectedUser.userType}</p>*/}

            {/* Add other user details as necessary */}
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default UserList;
