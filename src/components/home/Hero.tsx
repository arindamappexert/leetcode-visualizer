import React from "react";
import { Button } from "../../components/ui/button";
import { ArrowRight, Code, Lightbulb, Play } from "lucide-react";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero = ({
  title = "LeetCode Pattern Simulator",
  description = "Master algorithmic patterns through interactive visualizations. See algorithms in action and understand complex concepts with ease.",
  ctaText = "Explore Patterns",
  onCtaClick = () => {},
}: HeroProps) => {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center min-h-[500px]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 rounded-lg"
            onClick={onCtaClick}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 font-medium px-8 py-6 rounded-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            icon={<Code className="h-8 w-8 text-blue-400" />}
            title="Interactive Code Editor"
            description="Edit and experiment with algorithm implementations in real-time."
          />

          <FeatureCard
            icon={<Play className="h-8 w-8 text-green-400" />}
            title="Step-by-Step Animation"
            description="Visualize each step of the algorithm with synchronized code highlighting."
          />

          <FeatureCard
            icon={<Lightbulb className="h-8 w-8 text-yellow-400" />}
            title="Pattern Recognition"
            description="Learn to identify and apply common algorithmic patterns to solve problems."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const FeatureCard = ({
  icon,
  title = "Feature Title",
  description = "Feature description goes here.",
}: FeatureCardProps) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
};

export default Hero;
