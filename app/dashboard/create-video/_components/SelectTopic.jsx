"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic({ onHandleInputChange }) {
  const options = [
    "Custom Prompt",
    "Random AI Prompt",
    "Scary Story",
    "Historical Facts",
    "Bed Time Story",
    "Motivational",
    "Adventure Story",
    "Science Fiction",
    "Fantasy Tale",
    "Romantic Story",
    "Mystery Thriller",
    "Fable",
    "Humorous Anecdote",
    "Superhero Tale",
    "Ghost Story",
    "Slice of Life",
    "Travel Narrative",
    "Personal Growth",
  ];
  const [selectedOption, setSelectedOption] = useState("Random AI Prompt");
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-gray-400 text-sm mt-2">what is the topic of your video</p>
      <div className="my-3">
        <Select
          defaultValue="Random AI Prompt"
          onValueChange={(value) => {
            setSelectedOption(value);
            value !== "Custom Prompt" && onHandleInputChange("topic", value);
          }}
        >
          <SelectTrigger className="w-[180px] border-gray-400">
            <SelectValue placeholder="Content Topic" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-gray-400">
            {options.map((option, index) => (
              <SelectItem
                className="dark:hover:bg-neutral-700"
                key={index}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedOption === "Custom Prompt" && (
          <Textarea
            placeholder="write prompt on which you want to generate video"
            className="mt-5 border-gray-400"
            onChange={(e) => onHandleInputChange("topic", e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export default SelectTopic;
