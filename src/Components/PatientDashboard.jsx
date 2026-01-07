/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MoodTracking from './MoodTracking';
import BookAppointment from './BookAppointment';


const PatientDashboard = () => {
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    upcomingAppointments: [], // Appointments are stored here
    moodHistory: [],
  });


  // Fetch appointments from backend API on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // For demo, using fixed userId; replace with actual user ID or auth context
        const userId = "64a7f0c2b1e4f2a1b2c3d4e5";
        const response = await fetch(`/api/appointments/${userId}`);
        if (!response.ok) {
          console.error('Failed to fetch appointments');
          return;
        }
        const appointments = await response.json();
        setPatientData(prev => ({
          ...prev,
          upcomingAppointments: appointments,
        }));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };


    fetchAppointments();
  }, []);


  // Remove localStorage usage for appointments


  const handleAddAppointment = (appointment) => {
    setPatientData(prev => ({
      ...prev,
      upcomingAppointments: [...prev.upcomingAppointments, { ...appointment, sessionNotes: '', sessionNoteDate: null }]
    }));
  };


  const handleDeleteAppointment = async (index) => {
    const appointmentToDelete = patientData.upcomingAppointments[index];
    if (!appointmentToDelete || !appointmentToDelete._id) {
      console.error('Invalid appointment to delete');
      return;
    }
    try {
      const response = await fetch(`/api/appointments/${appointmentToDelete._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.error('Failed to delete appointment');
        return;
      }
      setPatientData(prev => {
        const newAppointments = [...prev.upcomingAppointments];
        newAppointments.splice(index, 1);
        return {
          ...prev,
          upcomingAppointments: newAppointments
        };
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };


  // --- Function to handle session note changes ---
  const handleSessionNoteChange = (index, note) => {
    setPatientData(prev => {
      const newAppointments = [...prev.upcomingAppointments];
      // Update the specific appointment object at the given index
      newAppointments[index] = {
        ...newAppointments[index],
        sessionNotes: note, // Set the sessionNotes property
        sessionNoteDate: new Date().toISOString() // Add/update the timestamp
      };
      return {
        ...prev,
        upcomingAppointments: newAppointments // Update the appointments array in the state
      };
    });
  };


  const handleMoodUpdate = (moodData) => {
    setPatientData(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, moodData]
    }));
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Username Display */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600">{patientData.name}</h1>
        </div>


        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Appointments</h2>
          {/* --- Check if there are any appointments --- */}
          {patientData.upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {/* --- Map over each appointment --- */}
              {patientData.upcomingAppointments.map((appt, index) => (
                <div key={appt._id || index} className="border-b pb-4 flex flex-col space-y-2">
                  {/* Appointment Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">With: {appt.therapist}</p>
                      <p>Date: {appt.date}</p>
                      <p>Time: {appt.time}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAppointment(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>


                  {/* --- Session Notes Section for THIS appointment --- */}
                  <div>
                    {/* --- Label for Session Notes --- */}
                    <label htmlFor={`sessionNote-${index}`} className="block font-semibold mb-1">
                      Session Notes:
                    </label>
                    {/* --- Textarea for entering/displaying notes --- */}
                    <textarea
                      id={`sessionNote-${index}`}
                      // Display existing notes or an empty string if none exist yet
                      value={appt.sessionNotes || ''}
                      // Call the handler function when the text changes
                      onChange={(e) => handleSessionNoteChange(index, e.target.value)}
                      rows={3}
                      className="w-full border rounded p-2"
                      placeholder="Enter session notes here..."
                    />
                    {/* --- Display timestamp if notes have been saved --- */}
                    {appt.sessionNoteDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {new Date(appt.sessionNoteDate).toLocaleString()}
                      </p>
                    )}
                  </div>
                  {/* --- End of Session Notes Section --- */}


                </div>
              ))}
            </div>
          ) : (
            // --- Message shown if there are NO appointments ---
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>


        {/* Mood Tracking Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Mood Tracking</h2>
          <MoodTracking onMoodUpdate={handleMoodUpdate} />
          {patientData.moodHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Mood History</h3>
              <div className="flex space-x-2 overflow-x-auto py-2">
                {patientData.moodHistory.map((mood, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    style={{ minWidth: '60px' }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                        ${mood.value > 7 ? 'bg-green-500' :
                          mood.value > 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    >
                      {mood.value}
                    </div>
                    <span className="text-xs mt-1">{new Date(mood.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Book Appointment Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Book an Appointment</h2>
          <BookAppointment onBook={handleAddAppointment} />
        </div>
      </div>
    </div>
  );
};


export default PatientDashboard;





