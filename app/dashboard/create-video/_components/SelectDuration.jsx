import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function SelectDuration({ onUserSelect }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl text-primary ">Duration</h2>
      <p className="text-gray-400 text-sm mt-2">select duration of your video</p>
      <div className="my-3">
        <Select
          defaultValue="0.25 minutes"
          onValueChange={(value) => {
            value != "Custom Prompt" && onUserSelect("duration", value);
          }}
        >
          <SelectTrigger className="w-[200px] border-gray-400">
            <SelectValue placeholder="Select Duration " />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-gray-400 ">
          <SelectItem className="dark:hover:bg-neutral-700" value={"0.25 minutes"}>
              ~15 seconds (0.25 minutes)
            </SelectItem>
            <SelectItem className="dark:hover:bg-neutral-700" value={"0.5 minutes"}>
              ~30 seconds (0.5 minutes)
            </SelectItem>
            <SelectItem className="dark:hover:bg-neutral-700" value={"0.5 minutes"}>
              ~45 seconds (0.75 minutes)
            </SelectItem>
            <SelectItem className="dark:hover:bg-neutral-700" value={"1 minute"}>
              ~60 seconds (1 minute)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SelectDuration;
