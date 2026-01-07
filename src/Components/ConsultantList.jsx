// ConsultantList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ConsultantList = () => {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch therapists data
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/therapists");
        setTherapists(res.data.therapists || []);
      } catch (err) {
        console.error("Failed to fetch therapists:", err);
      }
    };

    fetchTherapists();
  }, []);

  // Function to view therapist details
  const handleViewDetails = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Consultants</h2>
      {therapists.length === 0 ? (
        <p>No consultants found.</p>
      ) : (
        <ul className="space-y-4">
          {therapists.map((therapist) => (
            <li key={therapist._id} className="p-4 border rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{therapist.name}</h3>
                  <p className="text-sm text-gray-600">{therapist.email}</p>
                </div>
                <button
                  onClick={() => handleViewDetails(therapist)} // Open modal
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for displaying therapist details */}
      {isModalOpen && selectedTherapist && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">{selectedTherapist.name}</h3>
            <p className="text-lg mb-2"><strong>Email:</strong> {selectedTherapist.email}</p>
            <p className="text-lg mb-2"><strong>Specialization:</strong> {selectedTherapist.specialization}</p>
            <p className="text-lg mb-2"><strong>Phone:</strong> {selectedTherapist.phone}</p>
            {/* Add other therapist details here */}
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

export default ConsultantList;
