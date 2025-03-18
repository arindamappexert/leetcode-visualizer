import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const patterns = [
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "An efficient algorithm for finding an item from a sorted list of items.",
    difficulty: "Easy",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    description:
      "A technique to perform operations on a specific window size of an array or string.",
    difficulty: "Medium",
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    description:
      "Using two pointers to solve array problems in a more efficient way.",
    difficulty: "Medium",
  },
  {
    id: "breadth-first-search",
    title: "Breadth-First Search",
    description:
      "A graph traversal algorithm that explores all neighbors at the present depth before moving to nodes at the next depth level.",
    difficulty: "Medium",
  },
  {
    id: "depth-first-search",
    title: "Depth-First Search",
    description:
      "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    difficulty: "Medium",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Breaking down a problem into simpler subproblems and solving each subproblem only once.",
    difficulty: "Hard",
  },
];

const PatternsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Algorithm Patterns</h1>
      <p className="text-lg mb-8">
        Browse our collection of common algorithmic patterns used in coding
        interviews and competitive programming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map((pattern) => (
          <Card key={pattern.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{pattern.title}</CardTitle>
              <CardDescription>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${pattern.difficulty === "Easy" ? "bg-green-100 text-green-800" : pattern.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                >
                  {pattern.difficulty}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{pattern.description}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/pattern/${pattern.id}`} className="w-full">
                <Button variant="outline" className="w-full group">
                  <span>View Pattern</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatternsPage;
