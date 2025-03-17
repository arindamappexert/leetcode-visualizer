import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./home/Hero";
import PatternCategories from "./home/PatternCategories";
import { cn } from "@/lib/utils";

const Home = () => {
  const navigate = useNavigate();

  const handleExplorePatterns = () => {
    // Scroll to pattern categories section
    document.getElementById("pattern-categories")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSelectCategory = (id: string) => {
    // Navigate to pattern detail page
    navigate(`/pattern/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onCtaClick={handleExplorePatterns} />

      {/* Pattern Categories Section */}
      <div id="pattern-categories" className="pt-10">
        <PatternCategories onSelectCategory={handleSelectCategory} />
      </div>

      {/* Footer Section */}
      <footer
        className={cn(
          "w-full py-6 px-4 md:px-6 border-t",
          "bg-slate-900 text-slate-300 border-slate-800",
        )}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} LeetCode Pattern Simulator. All
              rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
