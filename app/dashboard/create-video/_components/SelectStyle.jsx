"use client";
import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({ onUserSelect }) {
  const [selectedOption, setSelectedOption] = useState("Realistic Photography");
  const styleOptions = [
    {
      name: "Realistic Photography",
      image: "/realistic.png",
    },
    {
      name: "Digital Art",
      image: "/digitalArt.png",
    },
    {
      name: "Concept Art",
      image: "/concept-art.png",
    },
    {
      name: "Fantasy Illustration",
      image: "/fantasy-illustration-min.png",
    },
    {
      name: "Surrealist Art",
      image: "/surrealist-art-min.png",
    },
    {
      name: "Water Color Art",
      image: "/watercolor-min.png", // Retained
    },
    {
      name: "Cartoon Style",
      image: "/cartoon-min.png", // Retained
    },
    {
      name: "Comic Style",
      image: "/comic-art.png", // Retained
    },
    {
      name: "GTA Style",
      image: "/gta-min.png", // Retained
    },
    {
      name: "Abstract Art",
      image: "/abstract-art-min.png",
    },
    {
      name: "Character Design",
      image: "/character-design.png",
    },
    {
      name: "Nature Landscape",
      image: "/nature-landscape-min.png",
    },
  ];
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-primary ">Style</h2>
      <p className="text-gray-400 text-sm mt-2">Select your video style</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-5">
        {styleOptions.map((option, idx) => (
          <div
            key={idx}
            className={`relative hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl ${
              selectedOption === option.name ? "border-4 border-primary" : ""
            }`}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={500}
              className="h-48 md:h-56 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(option.name),
                  onUserSelect("imageStyle", option.name);
              }}
            />
            <h2
              className={`absolute p-1.5 bg-black/80 bottom-0 w-full text-center font-bold rounded-b-lg text-sm md:text-base ${
                selectedOption === option.name ? "text-primary" : "text-white"
              }`}
            >
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
