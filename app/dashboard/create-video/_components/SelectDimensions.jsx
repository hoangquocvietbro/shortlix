import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

function SelectDimensions({ onUserSelect }) {
  const [selectedDimensions, setSelectedDimensions] = useState({ width: 720, height: 1280 });

  const handleDimensionChange = (width, height) => {
    setSelectedDimensions({ width, height });
    onUserSelect("dimensions", { width, height });
  };

  return (
    <div className="mt-5">
      <label
        htmlFor="dimensions"
        className="block mb-2 text-sm font-medium text-neutral-400 dark:text-neutral-300"
      >
        Select Dimensions
      </label>
      <Select
        onValueChange={(value) => {
          const [width, height] = value.split("x").map(Number);
          handleDimensionChange(width, height);
        }}
        value={`${selectedDimensions.width}x${selectedDimensions.height}`}
      >
        <SelectTrigger className="w-full dark:border-primary dark:bg-neutral-900">
          <SelectValue placeholder="Select dimensions" />
        </SelectTrigger>
        <SelectContent className="dark:border-primary dark:bg-neutral-900">
          <SelectItem value="720x1280">720x1280 (Vertical)</SelectItem>
          <SelectItem value="1080x1920">1080x1920 (Vertical)</SelectItem>
          <SelectItem value="1280x720">1280x720 (Horizontal)</SelectItem>
          <SelectItem value="1920x1080">1920x1080 (Horizontal)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDimensions;
