import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  url?: string;
}

interface ExampleProblemsProps {
  problems?: Problem[];
  onStartSimulation?: (problemId: string) => void;
}

const ExampleProblems = ({
  problems = [
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
      title: "Trapping Rain Water",
      difficulty: "Hard",
      description:
        "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
      url: "https://leetcode.com/problems/trapping-rain-water/",
    },
  ],
  onStartSimulation = (id) =>
    console.log(`Starting simulation for problem ${id}`),
}: ExampleProblemsProps) => {
  const getDifficultyColor = (difficulty: Problem["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Example Problems
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {problems.length} problems found
        </span>
      </div>

      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                    {problem.title}
                  </h3>
                  <Badge
                    className={cn(
                      "font-medium",
                      getDifficultyColor(problem.difficulty),
                    )}
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {problem.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {problem.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      <span>LeetCode</span>
                    </a>
                  </Button>
                )}

                <Button
                  onClick={() => onStartSimulation(problem.id)}
                  className="flex items-center gap-1"
                  size="sm"
                >
                  <Code size={14} />
                  <span>Simulate</span>
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleProblems;
