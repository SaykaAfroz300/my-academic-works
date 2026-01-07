/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // default user type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (userType === 'admin') {
      if (email === 'admin@mindwell.com' && password === 'ADMIN123') {
        console.log('Admin logged in');
        navigate('/Admin');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } else {
      // For therapist and patient login using backend
      try {
        console.log("Logging in with:", { userType, email, password}); // Log request data
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userType, email, password})
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Login failed.');
        } else {
          console.log(`${userType} logged in`, data.user);

          if (userType === 'therapist') {
            localStorage.setItem("userEmail", data.user.email); // ✅ Correct value from response
            navigate('/Consultdashboard');

          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(data.user));

          // Check for redirect path from location state
          const redirectPath = location.state?.from;

          if (redirectPath) {
            // Add showAttachments flag to redirect state if coming from consultant page with showAttachments
            if (redirectPath.startsWith('/consultant/')) {
              if (location.state?.showAttachments) {
                navigate(redirectPath, { state: { showAttachments: true } });
              } else {
                navigate(redirectPath, { state: { showAppointmentForm: true } });
              }
            } else {
              navigate(redirectPath);
            }
          } else {
            navigate('/dashboard');
          }
        }
      } 
    }catch (err) {
      console.error(err);
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border-t-4 border-blue-400">
          <h2 className="text-3xl font-bold text-center text-blue-700">Welcome Back</h2>
          <p className="text-center text-gray-600 text-sm mt-1">Log in to continue your wellness journey.</p>

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="userType">User</label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="therapist">Consultant</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600 font-semibold transition">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an Account? 
              <Link to="/Registration" className="ml-1 text-blue-500 hover:text-blue-600 font-semibold transition">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
