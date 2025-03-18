import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputPanelProps {
  algorithm: string;
  onInputChange: (input: number[]) => void;
  onTargetChange?: (target: number) => void;
  currentTarget?: number;
}

const InputPanel = ({
  algorithm,
  onInputChange,
  onTargetChange,
  currentTarget = 5,
}: InputPanelProps) => {
  const [inputString, setInputString] = useState<string>("");
  const [targetValue, setTargetValue] = useState<string>(
    currentTarget.toString(),
  );
  const [error, setError] = useState<string>("");

  const handleInputSubmit = () => {
    try {
      // Try to parse as JSON array
      const parsedInput = JSON.parse(inputString);
      if (
        Array.isArray(parsedInput) &&
        parsedInput.every((item) => typeof item === "number")
      ) {
        onInputChange(parsedInput);
        setError("");
      } else {
        setError("Input must be an array of numbers");
      }
    } catch (error) {
      setError("Invalid JSON format. Example: [1, 2, 3, 4, 5]");
    }
  };

  const handleTargetSubmit = () => {
    const target = parseInt(targetValue);
    if (!isNaN(target)) {
      onTargetChange && onTargetChange(target);
      setError("");
    } else {
      setError("Target must be a valid number");
    }
  };

  return (
    <Card className="p-4 bg-white">
      <h3 className="text-lg font-medium mb-4">Customize Input</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="array-input">Input Array</Label>
          <div className="flex mt-1">
            <Input
              id="array-input"
              placeholder="[1, 2, 3, 4, 5]"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button onClick={handleInputSubmit} size="sm">
              Apply
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter array in JSON format. Example: [1, 2, 3, 4, 5]
          </p>
        </div>

        {(algorithm === "two-pointers" || algorithm === "binary-search") && (
          <div>
            <Label htmlFor="target-input">
              {algorithm === "two-pointers" ? "Target Sum" : "Search Target"}
            </Label>
            <div className="flex mt-1">
              <Input
                id="target-input"
                placeholder="5"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="flex-1 mr-2"
                type="number"
              />
              <Button onClick={handleTargetSubmit} size="sm">
                Apply
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {algorithm === "two-pointers"
                ? "Enter the target sum to find"
                : "Enter the target value to search for"}
            </p>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </Card>
  );
};

export default InputPanel;
