import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Maximize2, Minimize2 } from "lucide-react";

interface VisualizationProps {
  algorithm?: string;
  currentStep?: number;
  isPlaying?: boolean;
  speed?: number;
  data?: any[];
  pointers?: Record<string, number>;
  highlightedIndices?: number[];
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  windowSum?: number;
  maxSum?: number;
  simulationState?: "init" | "first-window" | "sliding" | "complete";
  targetValue?: number;
}

const Visualization = ({
  algorithm = "sliding-window",
  currentStep = 0,
  isPlaying = false,
  speed = 1,
  data = [4, 2, 7, 1, 9, 5, 3, 8, 6],
  pointers = { left: 0, right: 2 },
  highlightedIndices = [],
  onFullscreen = () => {},
  isFullscreen = false,
  windowSum = 0,
  maxSum = 0,
  simulationState = "init",
  targetValue = 5,
}: VisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderArrayElement = (value: number, index: number) => {
    const isPointerLeft = pointers.left === index;
    const isPointerRight = pointers.right === index;
    const isHighlighted = highlightedIndices.includes(index);
    const isInWindow = index >= pointers.left && index <= pointers.right;

    return (
      <div className="relative" key={`element-${index}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isHighlighted ? 1.1 : 1,
            opacity: 1,
            backgroundColor: isInWindow ? "rgb(224, 242, 254)" : "white",
          }}
          transition={{ duration: 0.3 }}
          className={`
            flex items-center justify-center
            w-12 h-12 m-1 rounded-md border-2
            ${isHighlighted ? "border-yellow-400 bg-yellow-50" : "border-gray-300"}
            ${isInWindow ? "bg-sky-100" : ""}
            shadow-sm font-medium text-lg
          `}
        >
          {value}
        </motion.div>

        {/* Pointer indicators */}
        {isPointerLeft && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600"
          >
            Left
          </motion.div>
        )}
        {isPointerRight && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-600"
          >
            Right
          </motion.div>
        )}

        {/* Index numbers */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          {index}
        </div>
      </div>
    );
  };

  const renderTwoPointersVisualization = () => (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center justify-center">
        {data.map((value, index) => renderArrayElement(value, index))}
      </div>

      <div className="text-center bg-gray-50 p-4 rounded-lg w-full max-w-md">
        <h3 className="font-medium text-gray-700 mb-2">Current State</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-2 rounded border">
            <span className="text-blue-600 font-bold">Left:</span>{" "}
            {pointers.left}
          </div>
          <div className="bg-white p-2 rounded border">
            <span className="text-green-600 font-bold">Right:</span>{" "}
            {pointers.right}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSlidingWindowVisualization = () => (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center justify-center">
        {data.map((value, index) => renderArrayElement(value, index))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-gray-50 p-4 rounded-lg w-full max-w-md"
      >
        <h3 className="font-medium text-gray-700 mb-2">Algorithm State</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-2 rounded border">
            <span className="text-gray-600 font-bold">Window Size:</span>{" "}
            {pointers.right - pointers.left + 1}
          </div>
          <div className="bg-white p-2 rounded border">
            <span className="text-gray-600 font-bold">Current Step:</span>{" "}
            {currentStep}
          </div>
          <div className="bg-white p-2 rounded border">
            <span className="text-gray-600 font-bold">Window Sum:</span>{" "}
            {windowSum}
          </div>
          <div className="bg-white p-2 rounded border">
            <span className="text-gray-600 font-bold">Max Sum:</span> {maxSum}
          </div>
        </div>

        <div className="bg-white p-3 rounded border text-left">
          <span className="text-gray-600 font-bold">Current Operation:</span>{" "}
          {simulationState === "init" && "Initializing variables"}
          {simulationState === "first-window" &&
            "Calculating sum of first window"}
          {simulationState === "sliding" &&
            "Sliding window and updating max sum"}
          {simulationState === "complete" &&
            "Algorithm complete, returning result"}
        </div>
      </motion.div>
    </div>
  );

  return (
    <Card className="w-full h-full bg-white p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Algorithm Visualization
        </h2>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visual representation of the algorithm execution</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="icon" onClick={onFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 rounded-md p-4"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`visualization-${algorithm}-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            {algorithm === "sliding-window" &&
              renderSlidingWindowVisualization()}
            {algorithm === "two-pointers" && renderTwoPointersVisualization()}
            {algorithm === "binary-search" && (
              <div className="flex flex-col items-center space-y-8">
                <div className="flex items-center justify-center">
                  {data.map((value, index) => {
                    const isMid =
                      index ===
                      Math.floor((pointers.left + pointers.right) / 2);
                    const isPointerLeft = pointers.left === index;
                    const isPointerRight = pointers.right === index;
                    const isHighlighted = highlightedIndices.includes(index);
                    const isTarget = simulationState === "complete" && isMid;
                    const isTargetValue = value === targetValue;

                    return (
                      <div className="relative" key={`element-${index}`}>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{
                            scale: isHighlighted || isTarget ? 1.1 : 1,
                            opacity: 1,
                            backgroundColor: isTarget
                              ? "rgb(187, 247, 208)" // green for found target
                              : isMid
                                ? "rgb(254, 240, 138)"
                                : isTargetValue
                                  ? "rgb(254, 215, 170)" // light orange for target value
                                  : isPointerLeft || isPointerRight
                                    ? "rgb(224, 242, 254)"
                                    : "white",
                          }}
                          transition={{ duration: 0.3 }}
                          className={`
                            flex items-center justify-center
                            w-12 h-12 m-1 rounded-md border-2
                            ${
                              isTarget
                                ? "border-green-500 bg-green-50"
                                : isMid
                                  ? "border-yellow-400 bg-yellow-50"
                                  : isTargetValue
                                    ? "border-orange-400 bg-orange-50"
                                    : isPointerLeft || isPointerRight
                                      ? "border-blue-400 bg-blue-50"
                                      : "border-gray-300"
                            }
                            shadow-sm font-medium text-lg
                          `}
                        >
                          {value}
                        </motion.div>

                        {isPointerLeft && (
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600"
                          >
                            Left
                          </motion.div>
                        )}
                        {isPointerRight && (
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-600"
                          >
                            Right
                          </motion.div>
                        )}
                        {isMid && (
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-600"
                          >
                            Mid{isTarget ? " (Target Found)" : ""}
                          </motion.div>
                        )}

                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                          {index}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center bg-gray-50 p-4 rounded-lg w-full max-w-md">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Binary Search State
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-2 rounded border">
                      <span className="text-blue-600 font-bold">Left:</span>{" "}
                      {pointers.left}
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-yellow-600 font-bold">Mid:</span>{" "}
                      {Math.floor((pointers.left + pointers.right) / 2)}
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-green-600 font-bold">Right:</span>{" "}
                      {pointers.right}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border mb-4">
                    <span className="text-orange-600 font-bold">
                      Target Value:
                    </span>{" "}
                    {targetValue}
                  </div>

                  <div className="bg-white p-3 rounded border text-left">
                    <span className="text-gray-600 font-bold">
                      Current Operation:
                    </span>{" "}
                    {simulationState === "init" && "Initializing variables"}
                    {simulationState === "first-window" &&
                      "Calculating mid point"}
                    {simulationState === "sliding" && "Narrowing search range"}
                    {simulationState === "complete" && (
                      <span className="text-green-600 font-medium">
                        Target found at index{" "}
                        {Math.floor((pointers.left + pointers.right) / 2)}!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!["sliding-window", "two-pointers", "binary-search"].includes(
              algorithm,
            ) && (
              <div className="text-center text-gray-500">
                <p>Visualization for {algorithm} is not available yet.</p>
                <p className="text-sm mt-2">
                  Please select a different algorithm.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Step {currentStep} of algorithm execution
      </div>
    </Card>
  );
};

export default Visualization;
