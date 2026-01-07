/* eslint-disable no-unused-vars */
import React from "react";
import game1 from "../assets/images/game1.jpg";
import game2 from "../assets/images/game2.jpg";
import game3 from "../assets/images/game3.jpg";
import game4 from "../assets/images/game4.jpg";
import game5 from "../assets/images/game5.jpg";
import game6 from "../assets/images/game6.jpg";

const relaxationGames = [
  { id: 1, title: "Silk – Interactive Generative Art", url: "http://weavesilk.com/", image: game1 },
  { id: 2, title: "Calm Piano Tiles", url: "https://www.primarygames.com/arcade/music/pianotiles/", image: game2 },
  { id: 3, title: "Color Therapy", url: "https://poki.com/en/g/color-therapy", image: game3 },
];

const puzzleGames = [
  { id: 4, title: "Sudoku", url: "https://sudoku.com/", image: game4 },
  { id: 5, title: "Bubble Shooter", url: "https://www.bubbleshooter.net/", image: game5 },
  { id: 6, title: "Wordle", url: "https://www.nytimes.com/games/wordle/index.html", image: game6 },
];

const GamesSection = () => {
  return (
    <section className="mt-8">
      {/* 🎮 Styled Main Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        Games
      </h2>

      {/* 🎯 Relaxation & Stress Relief Games */}
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
        Relaxation & Stress Relief Games
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relaxationGames.map((game) => (
          <a
            key={game.id}
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{game.title}</p>
          </a>
        ))}
      </div>

      {/* 🧩 Puzzle & Brain-Refreshing Games */}
      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-3">
        Puzzle & Brain-Refreshing Games
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzleGames.map((game) => (
          <a
            key={game.id}
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-medium">{game.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default GamesSection;
