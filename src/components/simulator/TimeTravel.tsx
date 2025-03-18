import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { History, SkipBack, SkipForward } from "lucide-react";

interface TimeTravelProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  onReset: () => void;
}

const TimeTravel = ({
  currentStep = 0,
  totalSteps = 10,
  onStepChange = () => {},
  onReset = () => {},
}: TimeTravelProps) => {
  const handleSliderChange = (value: number[]) => {
    onStepChange(value[0]);
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <div className="w-full bg-muted/30 border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Time Travel</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleStepBackward}
          disabled={currentStep <= 0}
        >
          <SkipBack className="h-3 w-3" />
        </Button>

        <div className="flex-1">
          <Slider
            value={[currentStep]}
            min={0}
            max={totalSteps}
            step={1}
            onValueChange={handleSliderChange}
            className="cursor-pointer"
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleStepForward}
          disabled={currentStep >= totalSteps}
        >
          <SkipForward className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex justify-end mt-2">
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs">
          Reset to Start
        </Button>
      </div>
    </div>
  );
};

export default TimeTravel;
