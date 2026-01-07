/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom"; 
import MentalHealthImage from "../assets/HomeImage1.png"; 
import TherapistImage1 from "../assets/consultant_img/consultant1.jpg";
import TherapistImage2 from "../assets/consultant_img/consultant2.jpg";
import TherapistImage3 from "../assets/consultant_img/consultant3.jpg";
import TherapistImage4 from "../assets/consultant_img/consultant4.jpg";
import Hero from "../Components/Hero";

const Home = () => {
  console.log("Home component is rendering");

  return (
    <>
      <Hero/>

      {/* Mental Health Section */}
      <section className="py-12 bg-gradient-to-r from-blue-200 to-blue-100">
        <div className="container mx-auto flex items-center space-x-12">
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Mental Health Awareness
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Mental health is essential for overall well-being, affecting our thoughts, emotions, and behaviors. It&rsquo;s important to take care of your mental health just as much as your physical health. Early recognition, support, and treatment can make a significant difference in living a balanced life.
            </p>
            <p className="text-lg text-gray-700">
              Seeking professional help and building coping mechanisms can help you improve your emotional well-being. Remember, you&rsquo;re never alone. Taking action toward better mental health starts today.
            </p>
          </div>
          <div className="flex-1">
            <img
              src={MentalHealthImage} 
              alt="Mental Health"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mood Enhancement Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Enhance Your Mood with Music
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Music has the power to enhance your mood and help you relax. Listen to calming tunes and explore different types of music that uplift your spirit.
          </p>

          {/* Music Player */}
          <div className="flex justify-center space-x-4 mb-8">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
              Play Music
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
              Explore Playlist
            </button>
          </div>

          <div className="text-center mt-6">
            <Link to="/mood-enhancement">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Therapist Section */}
      <section className="py-12 bg-gradient-to-r from-blue-200 to-blue-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Need Professional Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our certified therapists are available to help guide you on your mental health journey. Whether you&rsquo;re struggling with anxiety, stress, or depression, our experts are here to assist you.
          </p>
        </div>

        {/* Displaying 4 therapists manually */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Therapist 1 */}
          <div className="p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
            <img
              src={TherapistImage1} 
              alt="Dr. John Doe"
              className="w-48 h-48 object-cover rounded-full border mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Dr. John Doe</h3>
            <p className="text-gray-600">Psychologist</p>
            <p className="text-gray-500">Available: Mon-Fri, 9AM-5PM</p>
          </div>

          {/* Therapist 2 */}
          <div className="p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
            <img
              src={TherapistImage2} 
              alt="Dr. June Smith"
              className="w-48 h-48 object-cover rounded-full border mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Dr. June Smith</h3>
            <p className="text-gray-600">Therapist</p>
            <p className="text-gray-500">Available: Mon-Fri, 10AM-6PM</p>
          </div>

          {/* Therapist 3 */}
          <div className="p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
            <img
              src={TherapistImage3} 
              alt="Dr. Alexa Brown"
              className="w-48 h-48 object-cover rounded-full border mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Dr. Alexa Brown</h3>
            <p className="text-gray-600">Counselor</p>
            <p className="text-gray-500">Available: Mon-Fri, 8AM-4PM</p>
          </div>

          {/* Therapist 4 */}
          <div className="p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
            <img
              src={TherapistImage4} 
              alt="Dr. Michael Johnson"
              className="w-48 h-48 object-cover rounded-full border mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Dr. Michael Johnson</h3>
            <p className="text-gray-600">Clinical Psychologist</p>
            <p className="text-gray-500">Available: Mon-Fri, 7AM-3PM</p>
          </div>
        </div>

        {/* Button to go to the full book appointment page */}
        <div className="text-center mt-6">
          <Link to="/book-appointment">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700">
              View All Therapists
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
