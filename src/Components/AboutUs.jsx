import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Blue Background */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-5xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Minds, Transforming Lives
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            At <strong>MindWell</strong>, we believe mental wellness is the foundation of a fulfilling life. Our expert-led platform offers guidance, self-care tools, and a compassionate community to support your journey.
          </motion.p>
        </div>
      </section>

      {/* About Section - Layered Layout */}
      <section className="relative max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image with Overlay Effect */}
        <div className="relative">
          <motion.div 
            className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <img 
              src="src/assets/about.jpg"
              alt="Mental Wellness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-grey bg-opacity-30"></div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="text-gray-800">
          <h3 className="text-4xl font-bold text-blue-600 mb-6">
            Your Mental Well-being, Our Priority
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            We understand the complexities of mental health and are here to provide
            tailored support. From professional therapy to AI-powered self-help tools, 
            we are dedicated to helping you thrive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Certified Therapists",
              "Mood & Habit Tracking",
              "Guided Mental Wellness Programs",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <span className="text-blue-600 text-2xl">✔</span>
                <p className="text-lg font-semibold">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values - Feature Cards */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-12">Our Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Compassion",
              description: "Creating a safe, supportive space for personal growth.",
              icon: "❤️",
            },
            {
              title: "Confidentiality",
              description: "Your privacy is our top priority—always secure & protected.",
              icon: "🔒",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h4 className="text-2xl font-semibold text-blue-600">{value.title}</h4>
              <p className="text-gray-600 mt-3">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h3 className="text-3xl font-semibold mb-4">
          Ready to Start Your Journey?
        </h3>
        <p className="text-lg mb-6">
          Take control of your mental wellness today with expert guidance and AI-powered tools.
        </p>
        <a
          href="/contact"
          className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
