/* eslint-disable no-unused-vars */
import React from 'react';

const OptionsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Select an Option</h1>
      <ul className="space-y-4">
        <li>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Option 1
          </button>
        </li>
        <li>
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Option 2
          </button>
        </li>
        <li>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">
            Option 3
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OptionsPage;
