/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/Hero.png'; 
import { FaArrowCircleRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[700px] md:h-[800px] flex items-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content - Text & Button */}
      <div className="container mx-auto px-6 relative z-10 items-center">
        <div className="max-w-lg text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to MindWell
          </h1>
          <p className="text-lg mb-6">
            Your mental health matters. Get insights and guidance to improve your well-being.
          </p>
          <Link to="/assessment">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              Check Your Mental Health Now <FaArrowCircleRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
