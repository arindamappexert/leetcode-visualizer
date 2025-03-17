import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatternHeader from "@/components/pattern/PatternHeader";
import PatternExplanation from "@/components/pattern/PatternExplanation";
import ExampleProblems from "@/components/pattern/ExampleProblems";
import Simulator from "@/components/simulator/Simulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Mock data for patterns
const patternData = {
  "sliding-window": {
    name: "Sliding Window",
    category: "Array",
    difficulty: "Medium",
    description:
      "A pattern used to process sequential data by maintaining a window of elements.",
    explanation: {
      title: "Sliding Window Pattern",
      description:
        "The Sliding Window pattern is used to perform operations on a specific window size of an array or linked list. It's particularly useful when we need to handle arrays or lists in a continuous manner, by efficiently processing elements in a window that slides through the data structure.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      useCases: [
        "Finding subarrays of a specific size with the largest sum",
        "Finding the longest substring with k distinct characters",
        "Finding the smallest subarray with a sum greater than a given value",
      ],
      keyInsights: [
        "Reduces time complexity from O(n²) to O(n) for many problems",
        "Maintains a 'window' that expands or contracts based on conditions",
        "Avoids recalculating overlapping elements by tracking incremental changes",
        "Often combined with hash maps for character frequency problems",
      ],
    },
    problems: [
      {
        id: "1",
        title: "Maximum Subarray",
        difficulty: "Easy",
        description: "Find the contiguous subarray with the largest sum.",
        url: "https://leetcode.com/problems/maximum-subarray/",
      },
      {
        id: "2",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description:
          "Find the length of the longest substring without repeating characters.",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      },
      {
        id: "3",
        title: "Minimum Size Subarray Sum",
        difficulty: "Medium",
        description:
          "Find the minimum length subarray with a sum greater than or equal to a target value.",
        url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      },
    ],
    examples: [
      {
        id: "max-sum-subarray",
        name: "Maximum Sum Subarray",
        description:
          "Find the maximum sum of any contiguous subarray of size k",
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
    initialCode: `function slidingWindow(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  maxSum = windowSum;
  
  // Slide window from left to right
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,
  },
  "two-pointers": {
    name: "Two Pointers",
    category: "Array",
    difficulty: "Easy",
    description:
      "A technique that uses two pointers to solve problems with less time complexity.",
    explanation: {
      title: "Two Pointers Pattern",
      description:
        "The Two Pointers pattern uses two pointers to iterate through the data structure in a single pass. The pointers can move toward each other, in the same direction at different speeds, or start at different positions.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      useCases: [
        "Finding a pair of elements that sum to a target",
        "Reversing an array or string in-place",
        "Removing duplicates from a sorted array",
        "Finding triplets that sum to zero",
      ],
      keyInsights: [
        "Eliminates the need for nested loops in many scenarios",
        "Particularly useful for sorted arrays or linked lists",
        "Can be used to solve problems with O(1) space complexity",
        "Often combined with binary search for optimization",
      ],
    },
    problems: [
      {
        id: "1",
        title: "Two Sum II - Input Array Is Sorted",
        difficulty: "Easy",
        description:
          "Given a sorted array, find two numbers that add up to a specific target.",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      },
      {
        id: "2",
        title: "3Sum",
        difficulty: "Medium",
        description:
          "Find all unique triplets in the array which gives the sum of zero.",
        url: "https://leetcode.com/problems/3sum/",
      },
      {
        id: "3",
        title: "Container With Most Water",
        difficulty: "Medium",
        description:
          "Find two lines that together with the x-axis form a container that holds the most water.",
        url: "https://leetcode.com/problems/container-with-most-water/",
      },
    ],
    examples: [
      {
        id: "pair-with-target-sum",
        name: "Pair with Target Sum",
        description: "Find a pair of elements that sum to a target value",
        data: [1, 2, 3, 4, 6],
      },
      {
        id: "remove-duplicates",
        name: "Remove Duplicates",
        description: "Remove duplicates from a sorted array",
        data: [2, 3, 3, 3, 6, 9, 9],
      },
    ],
    initialCode: `function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    
    if (currentSum === target) {
      return [left, right];
    }
    
    if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [-1, -1]; // No pair found
}`,
  },
  "binary-search": {
    name: "Binary Search",
    category: "Search",
    difficulty: "Easy",
    description:
      "A divide and conquer algorithm that efficiently finds an element in a sorted array.",
    explanation: {
      title: "Binary Search Pattern",
      description:
        "Binary Search is a divide and conquer algorithm that finds the position of a target value within a sorted array. It works by repeatedly dividing the search interval in half until the target is found or the interval is empty.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      useCases: [
        "Finding an element in a sorted array",
        "Finding the insertion position for a new element",
        "Finding the boundary in a boolean array",
        "Searching in rotated sorted arrays",
      ],
      keyInsights: [
        "Requires a sorted array to work correctly",
        "Reduces time complexity from O(n) to O(log n)",
        "Can be adapted for various problems beyond simple search",
        "Useful for problems with monotonic functions",
      ],
    },
    problems: [
      {
        id: "1",
        title: "Binary Search",
        difficulty: "Easy",
        description: "Find a target value in a sorted array.",
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        id: "2",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        description: "Search for a target in a rotated sorted array.",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      },
      {
        id: "3",
        title: "Find First and Last Position of Element in Sorted Array",
        difficulty: "Medium",
        description:
          "Find the starting and ending position of a given target value.",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      },
    ],
    examples: [
      {
        id: "basic-binary-search",
        name: "Basic Binary Search",
        description: "Find a target value in a sorted array",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        id: "rotated-array-search",
        name: "Rotated Array Search",
        description: "Find a target value in a rotated sorted array",
        data: [4, 5, 6, 7, 0, 1, 2],
      },
    ],
    initialCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Target found
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  
  return -1; // Target not found
}`,
  },
  "fast-slow-pointers": {
    name: "Fast & Slow Pointers",
    category: "Linked List",
    difficulty: "Medium",
    description:
      "A technique using two pointers moving at different speeds to solve linked list problems.",
    explanation: {
      title: "Fast & Slow Pointers Pattern",
      description:
        "The Fast & Slow Pointers pattern (also known as Hare & Tortoise algorithm) uses two pointers that move through the array or linked list at different speeds. This approach is particularly useful for cycle detection or finding the middle element.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      useCases: [
        "Detecting cycles in a linked list",
        "Finding the middle of a linked list",
        "Finding if a linked list is a palindrome",
        "Finding the kth element from the end",
      ],
      keyInsights: [
        "Uses constant space regardless of input size",
        "Fast pointer moves twice as fast as the slow pointer",
        "If there's a cycle, the fast pointer will eventually catch up to the slow pointer",
        "Can be combined with other techniques for complex problems",
      ],
    },
    problems: [
      {
        id: "1",
        title: "Linked List Cycle",
        difficulty: "Easy",
        description: "Determine if a linked list has a cycle.",
        url: "https://leetcode.com/problems/linked-list-cycle/",
      },
      {
        id: "2",
        title: "Middle of the Linked List",
        difficulty: "Easy",
        description: "Find the middle node of a linked list.",
        url: "https://leetcode.com/problems/middle-of-the-linked-list/",
      },
      {
        id: "3",
        title: "Palindrome Linked List",
        difficulty: "Medium",
        description: "Determine if a linked list is a palindrome.",
        url: "https://leetcode.com/problems/palindrome-linked-list/",
      },
    ],
    examples: [
      {
        id: "cycle-detection",
        name: "Cycle Detection",
        description: "Detect if a linked list has a cycle",
        data: [3, 2, 0, -4],
      },
      {
        id: "find-middle",
        name: "Find Middle Node",
        description: "Find the middle node of a linked list",
        data: [1, 2, 3, 4, 5],
      },
    ],
    initialCode: `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;       // Move one step
    fast = fast.next.next;  // Move two steps
    
    if (slow === fast) {
      return true;  // Cycle detected
    }
  }
  
  return false;  // No cycle
}`,
  },
  "merge-intervals": {
    name: "Merge Intervals",
    category: "Array",
    difficulty: "Medium",
    description: "A pattern for dealing with overlapping intervals or ranges.",
    explanation: {
      title: "Merge Intervals Pattern",
      description:
        "The Merge Intervals pattern deals with problems involving overlapping intervals. It typically involves sorting intervals by start time and then merging overlapping intervals.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      useCases: [
        "Merging overlapping intervals",
        "Finding meeting rooms required",
        "Finding free time slots",
        "Interval list intersections",
      ],
      keyInsights: [
        "Sort intervals by start time for easier processing",
        "Time complexity is dominated by the sorting operation",
        "Track the current interval and compare with the next one",
        "Useful for scheduling and calendar problems",
      ],
    },
    problems: [
      {
        id: "1",
        title: "Merge Intervals",
        difficulty: "Medium",
        description: "Merge all overlapping intervals.",
        url: "https://leetcode.com/problems/merge-intervals/",
      },
      {
        id: "2",
        title: "Insert Interval",
        difficulty: "Medium",
        description:
          "Insert a new interval into a set of non-overlapping intervals.",
        url: "https://leetcode.com/problems/insert-interval/",
      },
      {
        id: "3",
        title: "Meeting Rooms II",
        difficulty: "Medium",
        description: "Find the minimum number of conference rooms required.",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
      },
    ],
    examples: [
      {
        id: "merge-overlapping",
        name: "Merge Overlapping Intervals",
        description: "Merge all overlapping intervals",
        data: [
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        id: "insert-interval",
        name: "Insert Interval",
        description:
          "Insert a new interval into a set of non-overlapping intervals",
        data: [
          [1, 3],
          [6, 9],
        ],
      },
    ],
    initialCode: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  
  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  const result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = result[result.length - 1];
    
    // If current interval overlaps with the last merged interval
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // Merge the intervals
      lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
    } else {
      // Add the current interval to the result
      result.push(currentInterval);
    }
  }
  
  return result;
}`,
  },
};

const PatternDetailPage = () => {
  const { id = "sliding-window" } = useParams();
  const navigate = useNavigate();
  const [showSimulator, setShowSimulator] = useState(false);
  const [activeTab, setActiveTab] = useState("explanation");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Get pattern data based on ID
  const pattern =
    patternData[id as keyof typeof patternData] ||
    patternData["sliding-window"];

  const handleStartSimulation = (problemId?: string) => {
    setShowSimulator(true);
  };

  const handleBackToPattern = () => {
    setShowSimulator(false);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (showSimulator) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Simulator
          patternId={id}
          patternName={pattern.name}
          initialCode={pattern.initialCode}
          examples={pattern.examples}
          onBack={handleBackToPattern}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-4"
            onClick={handleBackToHome}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patterns
          </Button>

          <PatternHeader
            name={pattern.name}
            category={pattern.category}
            difficulty={pattern.difficulty as "Easy" | "Medium" | "Hard"}
            description={pattern.description}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="examples">Example Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="explanation" className="space-y-6">
            <PatternExplanation
              title={pattern.explanation.title}
              description={pattern.explanation.description}
              timeComplexity={pattern.explanation.timeComplexity}
              spaceComplexity={pattern.explanation.spaceComplexity}
              useCases={pattern.explanation.useCases}
              keyInsights={pattern.explanation.keyInsights}
            />

            <div className="flex justify-center mt-8" id="simulation">
              <Button
                size="lg"
                className="px-8"
                onClick={() => handleStartSimulation()}
              >
                Start Interactive Simulation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="examples">
            <ExampleProblems
              problems={pattern.problems}
              onStartSimulation={handleStartSimulation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatternDetailPage;
