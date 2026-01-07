/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";
import video5 from "../assets/videos/video5.mp4";
import video6 from "../assets/videos/video6.mp4";
import videoThumbnail1 from "../assets/images/video1.jpg";
import videoThumbnail2 from "../assets/images/video2.jpg";
import videoThumbnail3 from "../assets/images/video3.jpg";
import videoThumbnail4 from "../assets/images/video4.jpg";
import videoThumbnail5 from "../assets/images/video5.jpg";
import videoThumbnail6 from "../assets/images/video6.jpg";

const firstRowVideos = [
  { id: 1, title: "Relaxing Nature", src: video1, thumbnail: videoThumbnail1 },
  { id: 6, title: "Underwater Relaxation and Stress Relief", src: video6, thumbnail: videoThumbnail6 },
  { id: 3, title: "Eye Relaxing", src: video3, thumbnail: videoThumbnail3 },
];

const secondRowVideos = [
  { id: 4, title: "Mindfulness Meditation", src: video4, thumbnail: videoThumbnail4 },
  { id: 2, title: "Theta Waves", src: video2, thumbnail: videoThumbnail2 },
  { id: 5, title: "Art Therapy | Relaxing Mandala Art", src: video5, thumbnail: videoThumbnail5 },
  
];

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="mt-8">
      {/* Clean, Left-Aligned Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        Videos
      </h2>

      {/* First Row Videos with Subtitle */}
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
        Relaxing & Stress-Relief Videos
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstRowVideos.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedVideo(video.src)}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{video.title}</p>
          </div>
        ))}
      </div>

      {/* Show video player for first row */}
      {selectedVideo && firstRowVideos.some((video) => video.src === selectedVideo) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-[90vw] max-w-4xl">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-white text-3xl font-bold hover:text-red-500 transition bg-gray-800 rounded-full shadow-md cursor-pointer z-50"
            >
              &times;
            </button>

            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Second Row Videos with Subtitle */}
      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-3">
        Focus & Meditation Videos
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {secondRowVideos.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedVideo(video.src)}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{video.title}</p>
          </div>
        ))}
      </div>

      {/* Show video player for second row */}
      {selectedVideo && secondRowVideos.some((video) => video.src === selectedVideo) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-[90vw] max-w-4xl">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-white text-3xl font-bold hover:text-red-500 transition bg-gray-800 rounded-full shadow-md cursor-pointer z-50"
            >
              &times;
            </button>

            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
