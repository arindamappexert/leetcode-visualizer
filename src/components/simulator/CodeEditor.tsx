import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Code } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
  readOnly?: boolean;
  currentStep?: number;
  highlightedLines?: number[];
}

const CodeEditor = ({
  code = `function slidingWindow(arr, k) {\n  let maxSum = 0;\n  let windowSum = 0;\n  \n  // Calculate sum of first window\n  for (let i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  \n  maxSum = windowSum;\n  \n  // Slide window from left to right\n  for (let i = k; i < arr.length; i++) {\n    windowSum = windowSum - arr[i - k] + arr[i];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  \n  return maxSum;\n}`,
  language = "javascript",
  onCodeChange = () => {},
  onRun = () => {},
  onReset = () => {},
  isRunning = false,
  readOnly = false,
  currentStep = 0,
  highlightedLines = [],
}: CodeEditorProps) => {
  const [currentCode, setCurrentCode] = useState(code);
  const [activeTab, setActiveTab] = useState("code");

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCurrentCode(newCode);
    onCodeChange(newCode);
  };

  const handleReset = () => {
    setCurrentCode(code);
    onReset();
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden bg-background border-2 border-border">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Code Editor</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isRunning}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="sm"
            onClick={onRun}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Run
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="code"
        className="flex-1 flex flex-col"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="border-b px-4">
          <TabsList className="bg-transparent">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="flex-1 p-0 m-0 overflow-auto">
          <div className="relative h-full w-full">
            <div className="relative w-full h-full overflow-auto">
              <pre
                className="w-full h-full p-4 pl-12 font-mono text-sm bg-background"
                style={{ tabSize: 2, lineHeight: 1.5, minHeight: "400px" }}
              >
                {currentCode.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className={`relative ${highlightedLines.includes(i) ? "bg-yellow-100 dark:bg-yellow-900/30" : ""}`}
                  >
                    <span>{line}</span>
                  </div>
                ))}
              </pre>
              {!readOnly && !isRunning && (
                <textarea
                  className="absolute top-0 left-0 w-full h-full p-4 pl-12 font-mono text-sm resize-none opacity-0 focus:outline-none focus:ring-0"
                  value={currentCode}
                  onChange={handleCodeChange}
                  spellCheck="false"
                  style={{ tabSize: 2, lineHeight: 1.5 }}
                />
              )}
              <div className="absolute left-0 top-0 w-10 h-full border-r text-right pr-2 pt-4 text-muted-foreground font-mono text-xs">
                {currentCode.split("\n").map((_, i) => (
                  <div
                    key={i}
                    className={`leading-6 ${highlightedLines.includes(i) ? "font-bold text-primary" : ""}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="instructions"
          className="flex-1 p-4 m-0 overflow-auto"
        >
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3>Sliding Window Pattern</h3>
            <p>
              The Sliding Window pattern is used to perform operations on a
              specific window size of an array or linked list.
            </p>
            <h4>Instructions:</h4>
            <ol>
              <li>The function takes an array and a window size k as input</li>
              <li>
                It should find the maximum sum of any contiguous subarray of
                size k
              </li>
              <li>
                Use the sliding window technique to optimize the solution to
                O(n) time complexity
              </li>
            </ol>
            <h4>Example:</h4>
            <pre className="bg-muted p-2 rounded">
              Input: [2, 1, 5, 1, 3, 2], k=3 Output: 9 Explanation: Subarray
              with maximum sum is [5, 1, 3]
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CodeEditor;
