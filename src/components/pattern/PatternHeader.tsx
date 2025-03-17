import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface PatternHeaderProps {
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description?: string;
}

const PatternHeader = ({
  name = "Sliding Window",
  category = "Array",
  difficulty = "Medium",
  description = "A pattern used to process sequential data by maintaining a window of elements.",
}: PatternHeaderProps) => {
  // Map difficulty to color
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }[difficulty];

  return (
    <div className="w-full bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {name}
          </h1>
          <div className="flex items-center mt-2 space-x-2">
            <Badge variant="outline" className="text-sm">
              {category}
            </Badge>
            <Badge className={`text-sm ${difficultyColor}`}>{difficulty}</Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => (window.location.href = `#simulation`)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Simulation
          </button>
          <button className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            Save Pattern
          </button>
        </div>
      </div>

      {description && (
        <>
          <Separator className="my-4" />
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </>
      )}
    </div>
  );
};

export default PatternHeader;
