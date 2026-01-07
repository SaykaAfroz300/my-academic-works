import React from 'react';

const HistorySection = ({ patientData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-6">Your History</h2>
      
      {/* Mood History */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Mood History</h3>
        {patientData.moodHistory.length > 0 ? (
          <div className="space-y-2">
            {patientData.moodHistory.map((mood, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24">{new Date(mood.date).toLocaleDateString()}</span>
                <div className="flex-1 flex items-center">
                  <div 
                    className={`h-4 rounded-full ${mood.value > 7 ? 'bg-green-500' : mood.value > 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${mood.value * 10}%` }}
                  ></div>
                  <span className="ml-2 font-medium">{mood.value}/10</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No mood history data available</p>
        )}
      </div>

      {/* Appointments History */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Past Appointments</h3>
        {patientData.pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {patientData.pastAppointments.map((appt, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">With: {appt.therapist}</p>
                <p>Date: {appt.date}</p>
                <p>Time: {appt.time}</p>
                {appt.notes && (
                  <div className="mt-2 bg-gray-50 p-3 rounded">
                    <p className="font-medium">Session Notes:</p>
                    <p className="text-gray-700">{appt.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past appointments</p>
        )}
      </div>

      {/* Session Notes */}
      <div>
        <h3 className="text-lg font-medium mb-4">Session Notes</h3>
        {patientData.sessionNotes.length > 0 ? (
          <div className="space-y-4">
            {patientData.sessionNotes.map((note, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">{note.title}</p>
                <p className="text-gray-600 text-sm">{new Date(note.date).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-700">{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No session notes available</p>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
