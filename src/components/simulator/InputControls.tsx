import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputControlsProps {
  algorithm: string;
  initialData: number[];
  onDataChange: (newData: number[]) => void;
  onTargetChange?: (target: number) => void;
  currentTarget?: number;
}

const InputControls = ({
  algorithm,
  initialData,
  onDataChange,
  onTargetChange,
  currentTarget = 5,
}: InputControlsProps) => {
  const [inputString, setInputString] = useState<string>(
    initialData.join(", "),
  );
  const [targetValue, setTargetValue] = useState<string>(
    currentTarget.toString(),
  );
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetValue(e.target.value);
  };

  const handleApply = () => {
    try {
      // Parse the input string into an array of numbers
      const newData = inputString
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")
        .map((item) => {
          const num = Number(item);
          if (isNaN(num)) {
            throw new Error(`Invalid number: ${item}`);
          }
          return num;
        });

      if (newData.length === 0) {
        setError("Please enter at least one number");
        return;
      }

      // Clear any previous errors
      setError("");

      // Update the data
      onDataChange(newData);

      // Update target if applicable
      if (onTargetChange && targetValue) {
        const newTarget = Number(targetValue);
        if (!isNaN(newTarget)) {
          onTargetChange(newTarget);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
    }
  };

  return (
    <Card className="p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-3">Customize Input Data</h3>

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="array-input"
            className="block text-sm font-medium mb-1"
          >
            Array Elements (comma-separated)
          </Label>
          <div className="flex space-x-2">
            <Input
              id="array-input"
              value={inputString}
              onChange={handleInputChange}
              placeholder="e.g. 1, 2, 3, 4, 5"
              className="flex-1"
            />
          </div>
        </div>

        {(algorithm === "binary-search" || algorithm === "two-pointers") && (
          <div>
            <Label
              htmlFor="target-input"
              className="block text-sm font-medium mb-1"
            >
              Target Value
            </Label>
            <Input
              id="target-input"
              value={targetValue}
              onChange={handleTargetChange}
              type="number"
              className="w-full"
            />
          </div>
        )}

        {algorithm === "sliding-window" && (
          <div className="text-sm text-gray-500">
            <p>
              For sliding window, a window size of 3 will be used by default.
            </p>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleApply} className="w-full">
          Apply Changes
        </Button>
      </div>
    </Card>
  );
};

export default InputControls;
