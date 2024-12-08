"use client";

import { useState } from "react";

export default function Banner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-20 w-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-6xl w-full space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
          UPGRADE YOUR CELLPHONE
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={`bg-yellow-400 text-black font-bold text-xl sm:text-2xl md:text-3xl py-3 px-6 rounded-full flex items-center justify-center h-14 sm:h-16 transition-transform duration-200 ${
              isHovered ? "scale-105" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="button"
          >
            20% OFF
          </button>
          <button className="flex gap-x-2 bg-transparent hover:bg-white/10 text-white border-2 border-white text-lg sm:text-xl md:text-2xl py-3 px-6 rounded-full h-14 sm:h-16 flex items-center justify-center transition-colors duration-200">
            <span className="italic">SHOP NOW</span>
            <span>PAY LATER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
