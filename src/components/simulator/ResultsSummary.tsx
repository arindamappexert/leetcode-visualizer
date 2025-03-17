import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Lightbulb, ArrowRight } from "lucide-react";

interface ResultsSummaryProps {
  timeComplexity?: string;
  spaceComplexity?: string;
  insights?: string[];
  patternName?: string;
  executionTime?: number;
  isComplete?: boolean;
}

const ResultsSummary = ({
  timeComplexity = "O(n)",
  spaceComplexity = "O(1)",
  insights = [
    "This algorithm uses a sliding window approach to efficiently process the array",
    "The time complexity is optimized by avoiding nested loops",
    "Consider edge cases like empty arrays or single elements",
  ],
  patternName = "Sliding Window",
  executionTime = 0.023,
  isComplete = true,
}: ResultsSummaryProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            {isComplete ? "Execution Complete" : "Execution in Progress"}
          </CardTitle>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className="px-3 py-1"
          >
            {isComplete ? "Completed" : "Running..."}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Time Complexity
              </p>
              <p className="font-semibold">{timeComplexity}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Space Complexity
              </p>
              <p className="font-semibold">{spaceComplexity}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Execution Time
              </p>
              <p className="font-semibold">{executionTime} ms</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold">Key Insights</h3>
          </div>
          <ul className="space-y-2 pl-7 list-disc">
            {insights.map((insight, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Pattern:</span> {patternName}
          </p>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Try another example <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResultsSummary;
