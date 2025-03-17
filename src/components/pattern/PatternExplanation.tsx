import React from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface PatternExplanationProps {
  title?: string;
  description?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  useCases?: string[];
  keyInsights?: string[];
}

const PatternExplanation = ({
  title = "Sliding Window Pattern",
  description = "The Sliding Window pattern is used to perform operations on a specific window size of an array or linked list. It's particularly useful when we need to handle arrays or lists in a continuous manner, by efficiently processing elements in a window that slides through the data structure.",
  timeComplexity = "O(n)",
  spaceComplexity = "O(1)",
  useCases = [
    "Finding subarrays of a specific size with the largest sum",
    "Finding the longest substring with k distinct characters",
    "Finding the smallest subarray with a sum greater than a given value",
  ],
  keyInsights = [
    "Reduces time complexity from O(n²) to O(n) for many problems",
    "Maintains a 'window' that expands or contracts based on conditions",
    "Avoids recalculating overlapping elements by tracking incremental changes",
    "Often combined with hash maps for character frequency problems",
  ],
}: PatternExplanationProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Complexity Analysis
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-40">
                    Time Complexity:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {timeComplexity}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-40">
                    Space Complexity:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {spaceComplexity}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                {useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Key Insights
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {keyInsights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              Visual Representation
            </h3>
            <div className="mt-2 h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 overflow-hidden">
              {title.toLowerCase().includes("sliding window") && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 mb-4">
                    {[4, 2, 7, 1, 9, 5, 3, 8, 6].map((value, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-md border-2 ${index >= 0 && index <= 2 ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Window slides through array to find optimal solution
                  </div>
                </div>
              )}

              {title.toLowerCase().includes("two pointers") && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-md border-2 ${index === 0 || index === 8 ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Two pointers approach array from opposite ends
                  </div>
                </div>
              )}

              {title.toLowerCase().includes("binary search") && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-md border-2 ${index === 4 ? "border-yellow-500 bg-yellow-100" : index === 0 || index === 8 ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Binary search divides array in half to find target
                    efficiently
                  </div>
                </div>
              )}

              {!title.toLowerCase().includes("sliding window") &&
                !title.toLowerCase().includes("two pointers") &&
                !title.toLowerCase().includes("binary search") && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Pattern visualization will appear here
                  </p>
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatternExplanation;
