/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import axios from "axios";

const Helpline = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post("http://localhost:5000/helpline", formData);
      setSubmitStatus({
        success: true,
        message: response.data.message
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || "Failed to send message"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (

    <div className="flex flex-col min-h-screen bg-gray-100 p-8">

      {/* Title & Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reach Out for Help
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          We are here for you. If you are facing any mental health challenges
          or need immediate support, feel free to contact us. Our team is available 24/7.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Left Side - Map and Contact Info */}
        <div className="space-y-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.9468384448853!2d90.37221475761697!3d23.751170619656367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf529e5475ef%3A0x35e635d1b89fcd43!2zMTAg4Kan4Ka-4Kao4Kau4Kao4KeN4Kah4Ka_IOCmrOCnjeCmsOCmv-CmnCwg4Kai4Ka-4KaV4Ka-IDEyMDk!5e0!3m2!1sbn!2sbd!4v1741843526248!5m2!1sbn!2sbd"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <div>
            <h2 className="text-xl font-semibold">Address</h2>
            <p>📍 House #23, Road #10, Dhanmondi, Dhaka-1209, Bangladesh</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Call us</h2>
            <p>📞 +880 1111 1111</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>📧 mindwell@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Follow us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500">Twitter</a>
              <a href="#" className="text-blue-700">Facebook</a>
              <a href="#" className="text-blue-500">Instagram</a>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-3 border rounded-lg"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-3 border rounded-lg"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>

            {submitStatus && (
              <div className={`mt-4 p-3 rounded-lg ${submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Encouraging Message */}
            <div className="mt-10 text-center max-w-xl">
              <p className="text-xl font-semibold text-gray-700">
                Remember, you do not have to face it alone. We are just one call away.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Helpline;
