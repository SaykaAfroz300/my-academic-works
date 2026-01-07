import React, { useEffect, useState } from 'react';
import { Pencil, LogOut } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ConsultantDashboard = () => {
  const [consultant, setConsultant] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { id } = useParams(); // Assuming consultant id comes from URL like /dashboard/:id
  const [appointments, setAppointments] = useState([]);

  const email = localStorage.getItem("userEmail");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/consultant/appointments/${consultant._id}`);
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setConsultant(prev => ({ ...prev, appointments: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!email) {
      setError("No consultant email found. Please log in again.");
      return;
    }

    const fetchConsultantData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/consultant/profile?email=${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setConsultant(data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchConsultantData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateField = async (field) => {
    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      const res = await fetch('http://localhost:5000/consultant/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          updateData: { [field]: formData[field] },
        })
      });

      if (!res.ok) throw new Error('Update failed');

      const updated = await res.json();
      setConsultant(updated);
      setSuccessMsg(`${field} updated successfully.`);
      setEditField(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('email', email);
      formData.append('profilePhoto', file);

      fetch('http://localhost:5000/consultant/upload-photo', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          setConsultant(prev => ({ ...prev, documents: { ...prev.documents, profilePhoto: data.url } }));
          setSuccessMsg('Profile photo updated successfully');
        })
        .catch(err => setError('Failed to upload profile photo'));
    }
  };

  const renderProfile = () => {
    const profileImage = previewPhoto || consultant.documents?.profilePhoto || '/default-avatar.png';

    return (
      <div className="max-w-5xl mx-auto mt-0 p-12 bg-white shadow-xl rounded-xl">
        <div className="flex flex-col md:flex-row items-center gap-0">
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              alt={consultant.fullName}
              className="w-52 h-52 rounded-xl object-cover border-4 border-blue-200 shadow-md"
            />
            <input type="file" onChange={handlePhotoChange} className="mt-2" />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-blue-700">{consultant.fullName}</h1>
            <h2 className="text-xl text-gray-600 font-medium">{consultant.specialization}</h2>
            <p className="text-sm text-gray-600">Experience: {consultant.experience}</p>
            <p className="text-sm text-gray-600">License No: {consultant.licenseNumber}</p>
            <p className="text-gray-700 italic">
              "Passionate about guiding you toward better mental well-being."
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <p><strong>Schedule:</strong> {consultant.availability || 'N/A'}</p>
          <p><strong>Phone:</strong> {consultant.phone || '+880123456789'}</p>
          <p><strong>Email:</strong> {consultant.email}</p>
          <p><strong>Facebook:</strong> fb.com/{consultant.fullName?.split(" ")[1]?.toLowerCase() || 'therapist'}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Specializations</h3>
          <ul className="flex flex-wrap gap-2">
            {consultant.specializations?.map((item, index) => (
              <li key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm">
                {item}
              </li>
            )) || <li className="text-gray-500 text-sm">No specialization listed</li>}
          </ul>
        </div>

        {consultant.documents && Object.keys(consultant.documents).length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(consultant.documents).map(([key, url], index) => (
                key !== 'profilePhoto' && (
                  <img
                    key={index}
                    src={url}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md border"
                  />
                )
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEditableField = (label, fieldName) => (
    <div className="mb-4">
      <label className="block font-medium text-gray-700 mb-1">{label}</label>
      {editField === fieldName ? (
        <div className="flex gap-2">
          <input
            type="text"
            name={fieldName}
            value={formData[fieldName] || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => handleUpdateField(fieldName)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            Save
          </button>
          <button
            onClick={() => setEditField(null)}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span>{consultant[fieldName] || 'N/A'}</span>
          <button onClick={() => setEditField(fieldName)} className="text-blue-500 hover:text-blue-700">
            <Pencil size={16} />
          </button>
        </div>
      )}
    </div>
  );

  const renderUpdateProfile = () => (
    <div className="max-w-2xl mx-auto">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      {renderEditableField("Full Name", "fullName")}
      {renderEditableField("Phone Number", "phone")}
      {renderEditableField("Specialization", "specialization")}
      {renderEditableField("License Number", "licenseNumber")}
      {renderEditableField("Experience", "experience")}
    </div>
  );

  const renderAppointments = () => (
    <div>
      {consultant.appointments?.length > 0 ? (
        <ul className="space-y-3">
          {consultant.appointments
  ?.filter(app => app.status === 'pending')  // pending appointments
  .map((appointment) => (
    <div key={appointment._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
      <p><b>Patient:</b> {appointment.name}</p>
      <p><b>Email:</b> {appointment.email}</p>
      <p><b>Phone:</b> {appointment.phone}</p>
      <p><b>Branch:</b> {appointment.branch}</p>
      <p><b>Date:</b> {appointment.selectedDate} at {appointment.selectedTime}</p>
      <p><b>Fee:</b> {appointment.fee} Taka</p>
      <p><b>Issue:</b> {appointment.remarks || "Not Provided"}</p>
      <p><b>Status:</b> pending</p>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => handleAccept(appointment._id)} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Accept</button>
        <button onClick={() => handleReject(appointment._id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Reject</button>
      </div>
    </div>
))}
        </ul>
      ) : (
        <p>No appointment requests right now.</p>
      )}
    </div>
  );

  const handleAccept = async (appointmentId) => {
    try {
      const res = await fetch(`http://localhost:5000/consultant/appointments/accept/${appointmentId}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        window.alert('Accepted Successfully!');
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error('Error accepting appointment', error);
    }
  };
  
  const handleReject = async (appointmentId) => {
    try {
      const res = await fetch(`http://localhost:5000/consultant/appointments/reject/${appointmentId}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        window.alert('Rejected Successfully!');
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error('Error rejecting appointment', error);
    }
  };
  
  
  const renderPatientHistory = () => (
    <div>
      {consultant.appointments?.filter(app => app.status === 'accepted')?.length > 0 ? (
        <ul className="space-y-3">
          {consultant.appointments
            .filter(app => app.status === 'accepted')
            .map((appointment) => (
              <div key={appointment._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
                <p><b>Patient:</b> {appointment.name}</p>
                <p><b>Email:</b> {appointment.email}</p>
                <p><b>Phone:</b> {appointment.phone}</p>
                <p><b>Branch:</b> {appointment.branch}</p>
                <p><b>Date:</b> {appointment.selectedDate} at {appointment.selectedTime}</p>
                <p><b>Fee:</b> {appointment.fee} Taka</p>
                <p><b>Issue:</b> {appointment.remarks || "Not Provided"}</p>
              </div>
            ))}
        </ul>
      ) : (
        <p>No previous patient history available.</p>
      )}
    </div>
  );
  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!consultant && !error) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Consultant Dashboard</h1>
        
      </div>

      <div className="flex space-x-6">
      {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4 space-y-4">
          <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
            Profile
          </button>
          <button onClick={() => setActiveTab('update')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'update' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
            Update Info
          </button>
          <button onClick={() => setActiveTab('appointments')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
            Manage Appointments
          </button>
          <button onClick={() => setActiveTab('history')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
            View Patient History
          </button>
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white">
            Logout
          </button>
        </div>


        {/* Main Content */}
        <div className="flex-1 ml-6">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'update' && renderUpdateProfile()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'history' && renderPatientHistory()}
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
