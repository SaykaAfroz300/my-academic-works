/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MoodTracking = () => {
  const [mood, setMood] = useState(5);
  const [distraction, setDistraction] = useState(5);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [entries, setEntries] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState(5);

  // Fetch recent mood tracking entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/moodtracking');
      setEntries(response.data);
    } catch (err) {
      setError('Failed to fetch mood tracking data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let combinedResult = '';

    if (mood <= 3 && distraction >= 7) {
      combinedResult = "Feeling low and highly distracted. Engaging in calming and focus-enhancing activities might help.";
    } else if (mood <= 3) {
      combinedResult = "Feeling low. Consider some calming activities to uplift your mood.";
    } else if (distraction >= 7) {
      combinedResult = "Feeling quite distracted. Engaging with stress-relief content might improve your focus.";
    } else if (mood <= 7 || distraction <= 7) {
      combinedResult = "Feeling okay but could benefit from some mood-enhancing or focus activities.";
    } else {
      combinedResult = "Great mood and highly focused! Keep it up, but feel free to explore more uplifting content.";
    }

    setResult(combinedResult);
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/moodtracking', {
        mood: Number(mood),
        distraction: Number(distraction),
        result: combinedResult,
        // userId can be added here if user authentication is implemented
      });

      if (response.status === 201) {
        setSuccessMessage('Mood tracking data saved successfully');
        // Refresh entries list
        fetchEntries();
        // Reset form
        setMood(5);
        setDistraction(5);
        setResult('');
      } else {
        setError('Failed to save mood tracking data');
      }
    } catch (error) {
      setError('Error sending mood tracking data');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 w-full flex flex-col items-center py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 md:p-12 mb-8">
        {/* Page Title & Description */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Track Your Daily Mood </h2>
          <p className="text-lg text-gray-700 mt-3">
            Log your daily mood and distraction levels to gain insights into your well-being. 
            By signing in, you can track your mood trends weekly or monthly and identify patterns that can help you improve your mental well-being.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Rating Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Mood Level (0 - Worst, 10 - Best)
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full accent-blue-500 h-2 rounded-lg"
              disabled={loading}
            />
            <p className="text-center text-blue-600 font-semibold mt-2">Mood: {mood}</p>
          </div>

          {/* Distraction Rating Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Distraction Level (0 - Focused, 10 - Very Distracted)
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={distraction}
              onChange={(e) => setDistraction(e.target.value)}
              className="w-full accent-blue-400 h-2 rounded-lg"
              disabled={loading}
            />
            <p className="text-center text-blue-600 font-semibold mt-2">Distraction: {distraction}</p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get Results"}
          </button>
        </form>

        {/* Results Section */}
        {error && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg shadow">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg shadow">
            {successMessage}
          </div>
        )}
      </div>

      {/* Display recent mood tracking entries */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 md:p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Mood Tracking Entries</h3>
        {loading && entries.length === 0 ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p>No mood tracking entries found.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {entries.slice(0, visibleEntries).map((entry) => (
              <li key={entry._id} className="border border-gray-300 rounded-lg p-4">
                <p><strong>Date:</strong> {new Date(entry.recordedAt).toLocaleString()}</p>
                <p><strong>Mood:</strong> {entry.mood}</p>
                <p><strong>Distraction:</strong> {entry.distraction}</p>
                <p><strong>Result:</strong> {entry.result}</p>
              </li>
            ))}
          </ul>
        )}
        {visibleEntries < entries.length && (
          <button
            onClick={() => setVisibleEntries((prev) => prev + 5)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default MoodTracking;
