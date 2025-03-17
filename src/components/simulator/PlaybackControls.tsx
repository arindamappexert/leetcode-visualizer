import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Rewind,
  FastForward,
} from "lucide-react";

interface PlaybackControlsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onReset?: () => void;
  onSpeedChange?: (speed: number) => void;
  isPlaying?: boolean;
  currentStep?: number;
  totalSteps?: number;
  speed?: number;
}

const PlaybackControls = ({
  onPlay = () => {},
  onPause = () => {},
  onStepForward = () => {},
  onStepBackward = () => {},
  onReset = () => {},
  onSpeedChange = () => {},
  isPlaying = false,
  currentStep = 0,
  totalSteps = 10,
  speed = 1,
}: PlaybackControlsProps) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(speed);

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0];
    setPlaybackSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  const speedLabels = {
    0.5: "0.5x",
    1: "1x",
    1.5: "1.5x",
    2: "2x",
  };

  return (
    <div className="w-full bg-background border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Progress indicator */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onReset}
                  aria-label="Reset"
                >
                  <Rewind className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onStepBackward}
                  disabled={currentStep <= 0}
                  aria-label="Step backward"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step backward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10"
                  onClick={isPlaying ? onPause : onPlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Pause" : "Play"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onStepForward}
                  disabled={currentStep >= totalSteps}
                  aria-label="Step forward"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step forward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onSpeedChange(2)}
                  aria-label="Fast forward"
                >
                  <FastForward className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fast forward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Speed control */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Playback Speed</span>
            <span className="text-sm font-medium">
              {speedLabels[playbackSpeed as keyof typeof speedLabels] ||
                `${playbackSpeed}x`}
            </span>
          </div>
          <Slider
            defaultValue={[playbackSpeed]}
            max={2}
            min={0.5}
            step={0.5}
            onValueChange={handleSpeedChange}
            aria-label="Playback speed"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
