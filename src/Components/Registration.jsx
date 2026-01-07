/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Heading from './Heading';


const Registration = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    birthdate: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    documents: {
      educationalCertificates: null,
      resume: null,
      governmentID: null,
      consentForm: null,
      specializationCertificates: null,
      profilePhoto: null,
    },
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: { ...formData.documents, [name]: files[0] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Registering:", { userType, ...formData });

    const form = new FormData();
    form.append("userType", userType);
    for (const key in formData) {
      if (key !== "documents") {
        form.append(key, formData[key]);
      }
    }
    
    for (const key in formData.documents) {
      if (formData.documents[key]) {
        form.append(key, formData.documents[key]);
      }
    }

    // send data to server
    try {
      const res = await fetch("http://localhost:5000/registration", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while registering. Please try again.");
    }
  };

  // Patient Fields 
  const renderPatientFields = () => (
    <>
   
      <div>
        <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>
    </>
  );

  // Psychologist Fields (with file uploads)
  const renderPsychologistFields = () => (
    <>
      <div>
        <label className="block text-sm font-semibold text-gray-700">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Experience (Years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          required
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Document Upload Fields */}
      {[
        { label: 'Educational Certificates', name: 'educationalCertificates' },
        { label: 'Professional Resume / CV', name: 'resume' },
        { label: 'Government-issued ID', name: 'governmentID' },
        { label: 'Consent to Platform Policies', name: 'consentForm' },
        { label: 'Specialization Certificates', name: 'specializationCertificates' },
        { label: 'Profile Photo', name: 'profilePhoto' },
      ].map((doc) => (
        <div key={doc.name} className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700">{doc.label}</label>
          <input
            type="file"
            name={doc.name}
            onChange={handleFileChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
      ))}
    </>
  );

  return (
    <>
     <Heading Headline={"Let's Start Your Mental Health Journey with MindWell"} pagename={"Registration"}/>
     <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-blue-100">
        {!userType ? (
          <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md w-full">
            <h2 className="text-3xl font-bold text-blue-700">Register as</h2>
            <p className="text-gray-600 mt-2 mb-6">Please select your role to continue</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setUserType('patient')}
                className="w-1/2 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Patient
              </button>
              <button
                onClick={() => setUserType('therapist')}
                className="w-1/2 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Consultant
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl p-8 bg-white shadow-2xl rounded-lg">
            <h2 className="text-4xl font-bold text-blue-700 text-center mb-6">
              {userType === 'patient' ? 'Patient Registration' : 'Therapist Registration'}
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {userType === 'patient' ? renderPatientFields() : renderPsychologistFields()}

              <div className="col-span-2 text-center">
                <button type="submit" className="py-3 px-8 bg-blue-500 text-white rounded-lg">Create Account</button>
              </div>
            </form>
          </div>
        )}
      </div>
    
    </div>
  
    </>
  );
};

export default Registration;
