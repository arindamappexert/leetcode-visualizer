import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  GitBranch,
  GitMerge,
  Layers,
  MoveHorizontal,
  SlidersHorizontal,
  SplitSquareVertical,
} from "lucide-react";

interface PatternCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
}

interface PatternCategoriesProps {
  categories?: PatternCategory[];
  onSelectCategory?: (id: string) => void;
}

const PatternCategories = ({
  categories = defaultCategories,
  onSelectCategory = () => {},
}: PatternCategoriesProps) => {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Algorithm Pattern Categories
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Explore common algorithmic patterns used to solve coding interview
            problems
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all hover:shadow-md"
              onClick={() => onSelectCategory(category.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {category.icon}
                  </div>
                  <Badge
                    variant={
                      category.difficulty === "Easy"
                        ? "default"
                        : category.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {category.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{category.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {category.count} example problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:underline">
                  Explore pattern <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultCategories: PatternCategory[] = [
  {
    id: "sliding-window",
    title: "Sliding Window",
    description:
      "Efficiently process sequential data by maintaining a window that slides through the input.",
    icon: <SlidersHorizontal className="h-5 w-5" />,
    difficulty: "Medium",
    count: 8,
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    description:
      "Use two pointers to traverse an array or string in a single pass to find a pair of elements.",
    icon: <MoveHorizontal className="h-5 w-5" />,
    difficulty: "Easy",
    count: 12,
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "Efficiently search sorted arrays by repeatedly dividing the search space in half.",
    icon: <SplitSquareVertical className="h-5 w-5" />,
    difficulty: "Medium",
    count: 10,
  },
  {
    id: "depth-first-search",
    title: "Depth-First Search",
    description:
      "Traverse or search tree/graph data structures by exploring as far as possible along each branch.",
    icon: <GitBranch className="h-5 w-5" />,
    difficulty: "Hard",
    count: 15,
  },
  {
    id: "breadth-first-search",
    title: "Breadth-First Search",
    description:
      "Traverse or search tree/graph data structures by exploring all neighbor nodes at the present depth.",
    icon: <Layers className="h-5 w-5" />,
    difficulty: "Hard",
    count: 9,
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Solve complex problems by breaking them down into simpler subproblems and storing their solutions.",
    icon: <GitMerge className="h-5 w-5" />,
    difficulty: "Hard",
    count: 20,
  },
];

export default PatternCategories;
