import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Play, Pause, Settings } from "lucide-react";
import CodeEditor from "./CodeEditor";
import Visualization from "./Visualization";
import PlaybackControls from "./PlaybackControls";
import ResultsSummary from "./ResultsSummary";
import LogTracer from "./LogTracer";
import TimeTravel from "./TimeTravel";
import InputPanel from "./InputPanel";
import InputControls from "./InputControls";

interface SimulatorProps {
  patternId?: string;
  patternName?: string;
  initialCode?: string;
  examples?: Array<{
    id: string;
    name: string;
    description: string;
    data: number[];
  }>;
  problems?: Array<{
    id: string;
    title: string;
    difficulty: string;
    description: string;
    url: string;
    solutionCode?: string;
  }>;
  onBack?: () => void;
}

const Simulator = ({
  patternId = "sliding-window",
  patternName = "Sliding Window",
  initialCode,
  examples = [
    {
      id: "max-sum-subarray",
      name: "Maximum Sum Subarray",
      description: "Find the maximum sum of any contiguous subarray of size k",
      data: [2, 1, 5, 1, 3, 2],
    },
    {
      id: "fruits-into-baskets",
      name: "Fruits into Baskets",
      description:
        "Find the length of the longest subarray with at most 2 distinct elements",
      data: [1, 2, 1, 3, 2, 2, 1, 2],
    },
  ],
  problems = [],
  onBack = () => {},
}: SimulatorProps) => {
  // Default solution codes for common patterns if not provided
  const defaultSolutions = {
    "sliding-window": `function maxSumSubarray(arr, k) {\n  let maxSum = 0;\n  let windowSum = 0;\n  \n  // Calculate sum of first window\n  for (let i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  \n  maxSum = windowSum;\n  \n  // Slide window from left to right\n  for (let i = k; i < arr.length; i++) {\n    windowSum = windowSum - arr[i - k] + arr[i];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  \n  return maxSum;\n}`,
    "two-pointers": `function twoSum(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left < right) {\n    const currentSum = arr[left] + arr[right];\n    \n    if (currentSum === target) {\n      return [left, right];\n    }\n    \n    if (currentSum < target) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n  \n  return [-1, -1]; // No pair found\n}`,
    "binary-search": `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid; // Target found\n    }\n    \n    if (arr[mid] < target) {\n      left = mid + 1; // Search in the right half\n    } else {\n      right = mid - 1; // Search in the left half\n    }\n  }\n  \n  return -1; // Target not found\n}`,
    // Additional Two Pointers solutions
    "two-pointers-remove-duplicates": `function removeDuplicates(arr) {\n  if (arr.length === 0) return 0;\n  \n  let nextNonDuplicate = 1;\n  \n  for (let i = 1; i < arr.length; i++) {\n    if (arr[nextNonDuplicate - 1] !== arr[i]) {\n      arr[nextNonDuplicate] = arr[i];\n      nextNonDuplicate++;\n    }\n  }\n  \n  return nextNonDuplicate; // Length of array without duplicates\n}`,
    "two-pointers-square-sorted-array": `function sortedSquares(nums) {\n  const n = nums.length;\n  const result = new Array(n);\n  \n  let left = 0;\n  let right = n - 1;\n  let highestSquareIdx = n - 1;\n  \n  while (left <= right) {\n    const leftSquare = nums[left] * nums[left];\n    const rightSquare = nums[right] * nums[right];\n    \n    if (leftSquare > rightSquare) {\n      result[highestSquareIdx] = leftSquare;\n      left++;\n    } else {\n      result[highestSquareIdx] = rightSquare;\n      right--;\n    }\n    highestSquareIdx--;\n  }\n  \n  return result;\n}`,
    "two-pointers-3sum": `function threeSum(nums) {\n  const result = [];\n  \n  // Sort the array to handle duplicates and use two pointers approach\n  nums.sort((a, b) => a - b);\n  \n  for (let i = 0; i < nums.length - 2; i++) {\n    // Skip duplicates for the first element\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    \n    let left = i + 1;\n    let right = nums.length - 1;\n    \n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      \n      if (sum === 0) {\n        // Found a triplet\n        result.push([nums[i], nums[left], nums[right]]);\n        \n        // Skip duplicates\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        \n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  \n  return result;\n}`,
  };

  // Find the first problem with a solution code, or use default
  const firstProblemWithSolution = problems.find((p) => p.solutionCode);

  const [code, setCode] = useState<string>(
    firstProblemWithSolution?.solutionCode ||
      defaultSolutions[patternId] ||
      initialCode ||
      defaultSolutions["sliding-window"],
  );

  const [selectedProblem, setSelectedProblem] = useState<string>(
    firstProblemWithSolution?.id || (problems.length > 0 ? problems[0].id : ""),
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(10);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedExample, setSelectedExample] = useState<string>(
    examples[0]?.id || "",
  );
  const [customInput, setCustomInput] = useState<string>("");
  const [customTarget, setCustomTarget] = useState<string>("5");
  const [customData, setCustomData] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);
  const [pointers, setPointers] = useState<Record<string, number>>({
    left: 0,
    right: 2,
  });
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [highlightedCodeLines, setHighlightedCodeLines] = useState<number[]>(
    [],
  );
  const [windowSum, setWindowSum] = useState<number>(0);
  const [maxSum, setMaxSum] = useState<number>(0);
  const [simulationState, setSimulationState] = useState<
    "init" | "first-window" | "sliding" | "complete"
  >("init");
  const [logs, setLogs] = useState<
    Array<{
      step: number;
      message: string;
      variables: Record<string, any>;
      timestamp: Date;
    }>
  >([]);

  // Get the current example data
  const currentExample =
    examples.find((ex) => ex.id === selectedExample) || examples[0];

  // Use custom data if available, otherwise use example data
  const displayData = customData.length > 0 ? customData : currentExample.data;

  // Parse custom input if provided
  useEffect(() => {
    if (customInput.trim()) {
      try {
        // Try to parse as JSON array
        const parsedInput = JSON.parse(customInput);
        if (Array.isArray(parsedInput)) {
          // Create a custom example with the parsed input
          const customExample = {
            id: "custom-input",
            name: "Custom Input",
            description: "User-provided custom input data",
            data: parsedInput,
          };

          // Add or update the custom example in the examples array
          const existingCustomIndex = examples.findIndex(
            (ex) => ex.id === "custom-input",
          );
          if (existingCustomIndex >= 0) {
            examples[existingCustomIndex] = customExample;
          } else {
            examples.push(customExample);
          }

          // Select the custom example
          setSelectedExample("custom-input");
        }
      } catch (error) {
        console.error("Failed to parse custom input:", error);
      }
    }
  }, [customInput]);

  // Initialize simulation steps based on the algorithm
  useEffect(() => {
    // Reset logs when algorithm or example changes
    setLogs([]);

    if (patternId === "sliding-window") {
      // For sliding window, we need steps for:
      // 1. Initialization
      // 2. First window calculation (k steps)
      // 3. Sliding the window (array.length - k steps)
      // 4. Final result
      const k = 3; // Default window size for sliding window
      const totalSimulationSteps = 2 + k + (displayData.length - k) + 1;
      setTotalSteps(totalSimulationSteps);

      // Reset simulation state
      setSimulationState("init");
      setPointers({ left: 0, right: k - 1 });
      setWindowSum(0);
      setMaxSum(0);
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
    } else if (patternId === "two-pointers") {
      // For two pointers, we need steps for:
      // 1. Initialization
      // 2. Each iteration of the while loop
      // 3. Final result
      const maxIterations = Math.ceil(displayData.length / 2) + 1;
      const totalSimulationSteps = 1 + maxIterations + 1; // init + iterations + result
      setTotalSteps(totalSimulationSteps);

      // Reset simulation state
      setSimulationState("init");
      setPointers({ left: 0, right: displayData.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
    } else if (patternId === "binary-search") {
      // For binary search, we need steps for:
      // 1. Initialization
      // 2. Each iteration of the while loop (log n iterations in worst case)
      // 3. Final result
      const maxIterations = Math.ceil(Math.log2(displayData.length)) + 1;
      const totalSimulationSteps = 1 + maxIterations + 1; // init + iterations + result
      setTotalSteps(totalSimulationSteps);

      // Reset simulation state
      setSimulationState("init");
      setPointers({ left: 0, right: displayData.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
    }
  }, [patternId, currentExample, selectedExample, displayData]);

  // Simulation timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < totalSteps) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep >= totalSteps) {
            setIsPlaying(false);
            setSimulationComplete(true);
            return totalSteps;
          }
          return nextStep;
        });

        // Update simulation state based on the algorithm
        if (patternId === "sliding-window") {
          updateSlidingWindowSimulation(currentStep);
        } else if (patternId === "two-pointers") {
          updateTwoPointersSimulation(currentStep);
        } else if (patternId === "binary-search") {
          updateBinarySearchSimulation(currentStep);
        }
      }, 1000 / playbackSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    isPlaying,
    currentStep,
    totalSteps,
    playbackSpeed,
    patternId,
    currentExample,
    displayData,
    pointers,
  ]);

  // Function to add a log entry
  const addLogEntry = (
    step: number,
    message: string,
    variables: Record<string, any>,
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        step,
        message,
        variables,
        timestamp: new Date(),
      },
    ]);
  };

  // Function to update the simulation state based on algorithm
  const updateSlidingWindowSimulation = (step: number) => {
    const data = displayData;
    const k = 3; // Default window size

    if (step === 0) {
      // Initialization step
      setSimulationState("init");
      setPointers({ left: 0, right: k - 1 });
      setWindowSum(0);
      setMaxSum(0);
      setHighlightedIndices([]);
      setHighlightedCodeLines([1, 2]); // Variable initialization
      addLogEntry(step, "Initializing variables", { windowSum: 0, maxSum: 0 });
    } else if (step >= 1 && step < 1 + k) {
      // First window calculation
      setSimulationState("first-window");
      const index = step - 1;
      setWindowSum((prev) => prev + data[index]);
      setHighlightedIndices([index]);
      setHighlightedCodeLines([5, 6]); // First window calculation loop
      addLogEntry(step, `Adding element at index ${index} to first window`, {
        index,
        value: data[index],
        windowSum: windowSum + data[index],
      });
    } else if (step === 1 + k) {
      // Set maxSum after first window
      setMaxSum(windowSum);
      setHighlightedCodeLines([9]); // maxSum = windowSum
      addLogEntry(
        step,
        "Setting maxSum to windowSum after first window calculation",
        {
          windowSum,
          maxSum: windowSum,
        },
      );
    } else if (step > 1 + k && step < 1 + k + (data.length - k) + 1) {
      // Sliding the window
      setSimulationState("sliding");
      const slideIndex = step - (1 + k);
      const newLeft = slideIndex;
      const newRight = newLeft + k - 1;

      if (newRight < data.length) {
        // Update window sum by removing leftmost element and adding rightmost
        const newWindowSum = windowSum - data[newLeft - 1] + data[newRight];
        setWindowSum(newWindowSum);
        setMaxSum(Math.max(maxSum, newWindowSum));
        setPointers({ left: newLeft, right: newRight });
        setHighlightedIndices([newLeft - 1, newRight]);
        setHighlightedCodeLines([12, 13, 14]); // Sliding window loop
        addLogEntry(
          step,
          `Sliding window: removing element at index ${newLeft - 1} and adding element at index ${newRight}`,
          {
            removedIndex: newLeft - 1,
            removedValue: data[newLeft - 1],
            addedIndex: newRight,
            addedValue: data[newRight],
            newWindowSum,
            newMaxSum: Math.max(maxSum, newWindowSum),
            pointers: { left: newLeft, right: newRight },
          },
        );
      }
    } else {
      // Final result
      setSimulationState("complete");
      setHighlightedCodeLines([17]); // Return statement
      addLogEntry(step, "Algorithm complete, returning result", {
        result: maxSum,
      });
    }
  };

  // Function to update the two pointers simulation state
  const updateTwoPointersSimulation = (step: number) => {
    const data = displayData;
    const target = parseInt(customTarget) || 9; // Default target sum for two pointers

    if (step === 0) {
      // Initialization step
      setSimulationState("init");
      setPointers({ left: 0, right: data.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([1, 2]); // Variable initialization
      addLogEntry(step, "Initializing two pointers", {
        left: 0,
        right: data.length - 1,
        target,
      });
    } else if (step > 0 && step < totalSteps - 1) {
      // Two pointers iterations
      setSimulationState("sliding"); // Reusing the sliding state for moving pointers

      const left = pointers.left;
      const right = pointers.right;
      const currentSum = data[left] + data[right];

      setHighlightedIndices([left, right]);
      addLogEntry(step, "Checking current pair", {
        left,
        right,
        leftValue: data[left],
        rightValue: data[right],
        currentSum,
        target,
      });

      // Simulate the two pointers logic
      if (currentSum === target) {
        // Target sum found
        setHighlightedCodeLines([6, 7, 8]); // Target found condition
        addLogEntry(step, "Target sum found", {
          left,
          right,
          leftValue: data[left],
          rightValue: data[right],
          currentSum,
          target,
        });
        if (step === totalSteps - 2) {
          setSimulationState("complete");
        }
      } else if (currentSum < target) {
        // Move left pointer
        setHighlightedCodeLines([10, 11]);
        setPointers({ left: left + 1, right });
        addLogEntry(
          step,
          "Current sum is less than target, moving left pointer",
          {
            left,
            right,
            currentSum,
            target,
            newLeft: left + 1,
          },
        );
      } else {
        // Move right pointer
        setHighlightedCodeLines([12, 13]);
        setPointers({ left, right: right - 1 });
        addLogEntry(
          step,
          "Current sum is greater than target, moving right pointer",
          {
            left,
            right,
            currentSum,
            target,
            newRight: right - 1,
          },
        );
      }
    } else {
      // Final result
      setSimulationState("complete");
      const left = pointers.left;
      const right = pointers.right;
      const currentSum = data[left] + data[right];
      const found = currentSum === target;

      setHighlightedIndices([left, right]);
      setHighlightedCodeLines(found ? [8] : [16]); // Return statement
      addLogEntry(step, "Two pointers algorithm complete", {
        result: found ? [left, right] : [-1, -1],
        found,
      });
    }
  };

  const updateBinarySearchSimulation = (step: number) => {
    const data = displayData;
    const target = parseInt(customTarget) || 5; // Use custom target or default

    if (step === 0) {
      // Initialization step
      setSimulationState("init");
      setPointers({ left: 0, right: data.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([1, 2]); // Variable initialization
      addLogEntry(step, "Initializing binary search", {
        left: 0,
        right: data.length - 1,
        target: target, // Use custom target value
      });
    } else if (step > 0 && step < totalSteps - 1) {
      // Binary search iterations
      setSimulationState("sliding"); // Reusing the sliding state for narrowing search range

      const mid = Math.floor((pointers.left + pointers.right) / 2);
      setHighlightedIndices([mid]);
      addLogEntry(step, "Calculating mid point", {
        left: pointers.left,
        right: pointers.right,
        mid,
        midValue: data[mid],
      });

      // Simulate the binary search logic
      if (data[mid] === target) {
        // Target found
        setHighlightedCodeLines([6, 7, 8]); // Target found condition
        addLogEntry(step, "Target found", {
          mid,
          value: data[mid],
          target: target,
        });
        if (step === totalSteps - 2) {
          setSimulationState("complete");
        }
      } else if (data[mid] < target) {
        // Search right half
        setHighlightedCodeLines([10, 11]);
        setPointers({ left: mid + 1, right: pointers.right });
        addLogEntry(
          step,
          "Target is greater than mid value, searching right half",
          {
            mid,
            midValue: data[mid],
            target: target,
            newLeft: mid + 1,
            newRight: pointers.right,
          },
        );
      } else {
        // Search left half
        setHighlightedCodeLines([12, 13]);
        setPointers({ left: pointers.left, right: mid - 1 });
        addLogEntry(
          step,
          "Target is less than mid value, searching left half",
          {
            mid,
            midValue: data[mid],
            target: target,
            newLeft: pointers.left,
            newRight: mid - 1,
          },
        );
      }
    } else {
      // Final result
      setSimulationState("complete");
      const mid = Math.floor((pointers.left + pointers.right) / 2);
      setHighlightedIndices([mid]);
      setHighlightedCodeLines([8]); // Return statement for found target
      addLogEntry(step, "Binary search complete", {
        result: mid,
        found: data[mid] === target,
      });
    }
  };

  const handlePlay = () => {
    if (currentStep >= totalSteps) {
      // Reset if we're at the end
      setCurrentStep(0);
      setPointers({ left: 0, right: 2 });
      setHighlightedIndices([]);
      setSimulationComplete(false);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Update simulation state based on the algorithm
      if (patternId === "sliding-window") {
        updateSlidingWindowSimulation(nextStep);
      } else if (patternId === "two-pointers") {
        updateTwoPointersSimulation(nextStep);
      } else if (patternId === "binary-search") {
        updateBinarySearchSimulation(nextStep);
      }

      if (nextStep >= totalSteps) {
        setSimulationComplete(true);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // Update simulation state based on the algorithm
      if (patternId === "sliding-window") {
        updateSlidingWindowSimulation(prevStep);
      } else if (patternId === "two-pointers") {
        updateTwoPointersSimulation(prevStep);
      } else if (patternId === "binary-search") {
        updateBinarySearchSimulation(prevStep);
      }

      setSimulationComplete(false);
    }
  };

  const handleTimeTravelChange = (step: number) => {
    setCurrentStep(step);
    setSimulationComplete(step >= totalSteps);

    // Update simulation state based on the algorithm
    if (patternId === "sliding-window") {
      updateSlidingWindowSimulation(step);
    } else if (patternId === "two-pointers") {
      updateTwoPointersSimulation(step);
    } else if (patternId === "binary-search") {
      updateBinarySearchSimulation(step);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSimulationComplete(false);

    // Reset algorithm-specific state
    if (patternId === "sliding-window") {
      setSimulationState("init");
      setPointers({ left: 0, right: 2 });
      setWindowSum(0);
      setMaxSum(0);
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
      setLogs([]);
    } else if (patternId === "two-pointers") {
      setSimulationState("init");
      setPointers({ left: 0, right: displayData.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
      setLogs([]);
    } else if (patternId === "binary-search") {
      setSimulationState("init");
      setPointers({ left: 0, right: displayData.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
      setLogs([]);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleRunCode = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handleReset();
      handlePlay();
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleExampleChange = (exampleId: string) => {
    setSelectedExample(exampleId);
    handleReset();
  };

  const handleProblemChange = (problemId: string) => {
    setSelectedProblem(problemId);

    // Update code to the solution of the selected problem
    const problem = problems.find((p) => p.id === problemId);
    if (problem?.solutionCode) {
      setCode(problem.solutionCode);
    } else {
      // If no solution code is available, use the default solution for the pattern
      setCode(defaultSolutions[patternId] || "");
    }

    handleReset();
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Simple back button */}
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="mb-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Problem and Example selectors */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {problems.length > 0 && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Problem:</label>
              <select
                value={selectedProblem}
                onChange={(e) => handleProblemChange(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {problems.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.title} ({problem.difficulty})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Example Data:</label>
            <select
              value={selectedExample}
              onChange={(e) => handleExampleChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {examples.map((example) => (
                <option key={example.id} value={example.id}>
                  {example.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left panel - Code Editor */}
          <motion.div
            layout
            className={`flex flex-col ${isFullscreen ? "hidden" : ""}`}
          >
            <CodeEditor
              code={code}
              language="javascript"
              onCodeChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleReset}
              isRunning={isPlaying}
              currentStep={currentStep}
              highlightedLines={highlightedCodeLines}
            />
          </motion.div>

          {/* Right panel - Visualization */}
          <motion.div
            layout
            className={`flex flex-col ${isFullscreen ? "col-span-2" : ""}`}
          >
            <Visualization
              algorithm={patternId}
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={playbackSpeed}
              data={displayData}
              pointers={pointers}
              highlightedIndices={highlightedIndices}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
              windowSum={windowSum}
              maxSum={maxSum}
              simulationState={simulationState}
              targetValue={parseInt(customTarget) || 5}
            />
          </motion.div>
        </div>

        {/* Playback controls */}
        <div className="mt-6">
          <PlaybackControls
            onPlay={handlePlay}
            onPause={handlePause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={totalSteps}
            speed={playbackSpeed}
          />
        </div>

        {/* Time travel */}
        <div className="mt-4">
          <TimeTravel
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepChange={handleTimeTravelChange}
            onReset={handleReset}
          />
        </div>

        {/* Log tracer */}
        <div className="mt-6">
          <LogTracer logs={logs} currentStep={currentStep} />
        </div>

        {/* Input controls */}
        <div className="mt-6">
          <InputControls
            algorithm={patternId}
            initialData={displayData}
            onDataChange={(newData) => {
              setCustomData(newData);
              handleReset();
            }}
            onTargetChange={(newTarget) => {
              setCustomTarget(newTarget.toString());
              handleReset();
            }}
            currentTarget={parseInt(customTarget) || 5}
          />
        </div>

        {/* Results summary */}
        <div className="mt-6">
          <ResultsSummary
            timeComplexity={patternId === "binary-search" ? "O(log n)" : "O(n)"}
            spaceComplexity="O(1)"
            insights={[
              `The ${patternName} pattern efficiently processes the array in a single pass.`,
              patternId === "binary-search"
                ? "This approach divides the search space in half with each step, resulting in logarithmic time complexity."
                : "This approach avoids nested loops, resulting in linear time complexity.",
              patternId === "sliding-window"
                ? `For the ${currentExample.name} problem, we maintain a sliding window of size k.`
                : patternId === "two-pointers"
                  ? `For the ${currentExample.name} problem, we use two pointers moving toward each other.`
                  : `For the ${currentExample.name} problem, we repeatedly divide the search space in half.`,
            ]}
            patternName={patternName}
            executionTime={0.023}
            isComplete={simulationComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Simulator;
