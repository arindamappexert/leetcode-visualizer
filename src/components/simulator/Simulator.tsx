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
  onBack = () => {},
}: SimulatorProps) => {
  const [code, setCode] = useState<string>(
    initialCode ||
      `function slidingWindow(arr, k) {\n  let maxSum = 0;\n  let windowSum = 0;\n  \n  // Calculate sum of first window\n  for (let i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  \n  maxSum = windowSum;\n  \n  // Slide window from left to right\n  for (let i = k; i < arr.length; i++) {\n    windowSum = windowSum - arr[i - k] + arr[i];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  \n  return maxSum;\n}`,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(10);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedExample, setSelectedExample] = useState<string>(
    examples[0]?.id || "",
  );
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

  // Get the current example data
  const currentExample =
    examples.find((ex) => ex.id === selectedExample) || examples[0];

  // Initialize simulation steps based on the algorithm
  useEffect(() => {
    if (patternId === "sliding-window") {
      // For sliding window, we need steps for:
      // 1. Initialization
      // 2. First window calculation (k steps)
      // 3. Sliding the window (array.length - k steps)
      // 4. Final result
      const k = 3; // Default window size
      const totalSimulationSteps = 2 + k + (currentExample.data.length - k) + 1;
      setTotalSteps(totalSimulationSteps);

      // Reset simulation state
      setSimulationState("init");
      setPointers({ left: 0, right: k - 1 });
      setWindowSum(0);
      setMaxSum(0);
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
    } else if (patternId === "binary-search") {
      // For binary search, we need steps for:
      // 1. Initialization
      // 2. Each iteration of the while loop (log n iterations in worst case)
      // 3. Final result
      const maxIterations =
        Math.ceil(Math.log2(currentExample.data.length)) + 1;
      const totalSimulationSteps = 1 + maxIterations + 1; // init + iterations + result
      setTotalSteps(totalSimulationSteps);

      // Reset simulation state
      setSimulationState("init");
      setPointers({ left: 0, right: currentExample.data.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
    }
  }, [patternId, currentExample, selectedExample]);

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
    pointers,
  ]);

  // Function to update the simulation state based on algorithm
  const updateSlidingWindowSimulation = (step: number) => {
    const data = currentExample.data;
    const k = 3; // Default window size

    if (step === 0) {
      // Initialization step
      setSimulationState("init");
      setPointers({ left: 0, right: k - 1 });
      setWindowSum(0);
      setMaxSum(0);
      setHighlightedIndices([]);
      setHighlightedCodeLines([1, 2]); // Variable initialization
    } else if (step >= 1 && step < 1 + k) {
      // First window calculation
      setSimulationState("first-window");
      const index = step - 1;
      setWindowSum((prev) => prev + data[index]);
      setHighlightedIndices([index]);
      setHighlightedCodeLines([5, 6]); // First window calculation loop
    } else if (step === 1 + k) {
      // Set maxSum after first window
      setMaxSum(windowSum);
      setHighlightedCodeLines([9]); // maxSum = windowSum
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
      }
    } else {
      // Final result
      setSimulationState("complete");
      setHighlightedCodeLines([17]); // Return statement
    }
  };

  // Function to update the binary search simulation state
  const updateBinarySearchSimulation = (step: number) => {
    const data = currentExample.data;
    const target = 5; // Default target value for visualization

    if (step === 0) {
      // Initialization step
      setSimulationState("init");
      setPointers({ left: 0, right: data.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([1, 2]); // Variable initialization
    } else if (step > 0 && step < totalSteps - 1) {
      // Binary search iterations
      setSimulationState("sliding"); // Reusing the sliding state for narrowing search range

      const mid = Math.floor((pointers.left + pointers.right) / 2);
      setHighlightedIndices([mid]);

      // Simulate the binary search logic
      if (data[mid] === target) {
        // Target found
        setHighlightedCodeLines([6, 7, 8]); // Target found condition
        if (step === totalSteps - 2) {
          setSimulationState("complete");
        }
      } else if (data[mid] < target) {
        // Search right half
        setHighlightedCodeLines([10, 11]);
        setPointers({ left: mid + 1, right: pointers.right });
      } else {
        // Search left half
        setHighlightedCodeLines([12, 13]);
        setPointers({ left: pointers.left, right: mid - 1 });
      }
    } else {
      // Final result
      setSimulationState("complete");
      const mid = Math.floor((pointers.left + pointers.right) / 2);
      setHighlightedIndices([mid]);
      setHighlightedCodeLines([8]); // Return statement for found target
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
      } else if (patternId === "binary-search") {
        updateBinarySearchSimulation(prevStep);
      }

      setSimulationComplete(false);
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
    } else if (patternId === "binary-search") {
      setSimulationState("init");
      setPointers({ left: 0, right: currentExample.data.length - 1 });
      setHighlightedIndices([]);
      setHighlightedCodeLines([0]); // Start with function declaration
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

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{patternName} Pattern Simulator</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs
            value={selectedExample}
            onValueChange={handleExampleChange}
            className="w-auto"
          >
            <TabsList>
              {examples.map((example) => (
                <TabsTrigger key={example.id} value={example.id}>
                  {example.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
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
              data={currentExample.data}
              pointers={pointers}
              highlightedIndices={highlightedIndices}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
              windowSum={windowSum}
              maxSum={maxSum}
              simulationState={simulationState}
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

        {/* Results summary */}
        <div className="mt-6">
          <ResultsSummary
            timeComplexity="O(n)"
            spaceComplexity="O(1)"
            insights={[
              `The ${patternName} pattern efficiently processes the array in a single pass.`,
              "This approach avoids nested loops, resulting in linear time complexity.",
              `For the ${currentExample.name} problem, we maintain a sliding window of size k.`,
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
