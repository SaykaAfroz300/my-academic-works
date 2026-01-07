/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import music1 from "../assets/music/music1.mp3";
import music2 from "../assets/music/music2.mp3";
import music3 from "../assets/music/music3.mp3";
import music4 from "../assets/music/music4.mp3";
import music5 from "../assets/music/music5.mp3";
import music6 from "../assets/music/music6.mp3";
import musicImg1 from "../assets/images/music1.jpg";
import musicImg2 from "../assets/images/music2.jpg";
import musicImg3 from "../assets/images/music3.jpg";
import musicImg4 from "../assets/images/music4.jpg";
import musicImg5 from "../assets/images/music5.jpg";
import musicImg6 from "../assets/images/music6.jpg";

const relaxingMusic = [
  { id: 1, title: "Calm Piano", src: music1, image: musicImg1 },
  { id: 2, title: "Upbeat Jazz", src: music2, image: musicImg2 },
  { id: 3, title: "Surah Ar Rahman | Relaxing Anxiety", src: music3, image: musicImg3 },
];

const focusMusic = [
  { id: 4, title: "40 Hz Binaural Beats for Intense Focus", src: music4, image: musicImg4 },
  { id: 5, title: "Tibetan Singing Bowl Sounds", src: music5, image: musicImg5 },
  { id: 6, title: "Earth Resonance Frequency for Relaxation", src: music6, image: musicImg6 },
];

const MusicSection = () => {
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <section className="mt-8">
      {/* 🎵 Styled Main Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        Music
      </h2>

      {/* 🎶 Relaxing & Stress-Relief Music */}
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
        Relaxing & Stress-Relief Music
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relaxingMusic.map((track) => (
          <div
            key={track.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedMusic(track.src)}
          >
            <img 
              src={track.image} 
              alt={track.title} 
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{track.title}</p>
          </div>
        ))}
      </div>

      {/* Show music player after first row */}
      {selectedMusic && relaxingMusic.some((track) => track.src === selectedMusic) && (
        <div className="mt-6 flex justify-center">
          <audio src={selectedMusic} controls autoPlay className="w-full max-w-md" />
        </div>
      )}

      {/* 🎧 Focus & Meditation Sounds */}
      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-3">
        Focus & Meditation Sounds
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {focusMusic.map((track) => (
          <div
            key={track.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedMusic(track.src)}
          >
            <img 
              src={track.image} 
              alt={track.title} 
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{track.title}</p>
          </div>
        ))}
      </div>

      {/* Show music player after second row */}
      {selectedMusic && focusMusic.some((track) => track.src === selectedMusic) && (
        <div className="mt-6 flex justify-center">
          <audio src={selectedMusic} controls autoPlay className="w-full max-w-md" />
        </div>
      )}
    </section>
  );
};

export default MusicSection;
