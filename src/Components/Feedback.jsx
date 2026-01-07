/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    category: "Website",
    message: "",
  });

  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch feedback on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/feedback");
        setReviews(response.data.feedback);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Submit a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.message.trim()) {
      alert("Feedback message cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/feedback", {
        name: feedback.name || "Anonymous",
        category: feedback.category,
        message: feedback.message
      });

      if (response.data.success) {
        // Refresh feedback list
        const feedbackResponse = await axios.get("http://localhost:5000/feedback");
        setReviews(feedbackResponse.data.feedback);
        setFeedback({ name: "", category: "Website", message: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a review
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        setLoading(true);
        // TODO: Add delete endpoint in backend
        // await axios.delete(`http://localhost:5000/feedback/${id}`);
        const feedbackResponse = await axios.get("http://localhost:5000/feedback");
        setReviews(feedbackResponse.data.feedback);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-500">Share Your Experience</h2>
        <p className="text-lg text-gray-600 mt-2">
          Your feedback helps us improve and provide better support.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name (Optional)"
            value={feedback.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="category"
            value={feedback.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50"
          >
            <option value="Website">Website Experience</option>
            <option value="Resources">Resources Feedback</option>
            <option value="Therapist">Therapist Review</option>
            <option value="Psychologist">Psychologist Review</option>
            <option value="Counselor">Counselor Review</option>
          </select>

          <textarea
            name="message"
            placeholder="Share your experience..."
            value={feedback.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="5"
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* Display Reviews */}
      <div className="max-w-3xl mx-auto mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">What People Are Saying</h3>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && reviews.length === 0 ? (
          <p className="text-gray-600">Loading feedback...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600">No feedback yet. Be the first to share your experience!</p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-blue-500">{review.name}</h4>
                <p className="text-sm text-gray-500">
                  {review.category} | {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2">{review.message}</p>
                
                <div className="mt-3">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Reviews Button */}
        {visibleReviews < reviews.length && (
          <button
            onClick={() => setVisibleReviews((prev) => prev + 5)}
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default Feedback;
