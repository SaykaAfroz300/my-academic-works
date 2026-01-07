/* eslint-disable no-unused-vars */
import React from "react";
import MusicSection from "./MusicSection";
import VideoSection from "./VideoSection";
import GamesSection from "./GamesSection";

const MoodEnhancement = () => {
  return (
    <div className="p-6">
      {/* Page Title and Description */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mood Enhancement Activities</h1>
        <p className="text-lg text-gray-600 mt-2">
          Engage in activities to uplift your mood, including relaxing music, engaging videos, and fun games. 
          <br />
          You can explore <a href="#videos" className="text-blue-600 hover:underline">Relaxing videos</a>, 
          <a href="#music" className="text-blue-600 hover:underline"> Soothing music</a>, or 
          <a href="#games" className="text-blue-600 hover:underline"> Fun games</a> that will help refresh and relax your mind.
        </p>
      </div>

      {/* Enhancement Sections */}
      <div id="videos">
        <VideoSection />
      </div>
      <div id="music">
        <MusicSection />
      </div>
      <div id="games">
        <GamesSection />
      </div>
    </div>
  );
};

export default MoodEnhancement;
