import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        About LeetCode Pattern Simulator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              To make algorithm learning more intuitive and accessible through
              interactive visualizations and step-by-step simulations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Who We Are</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              A team of developers and educators passionate about helping others
              master algorithmic thinking and ace technical interviews.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Visualizations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Research shows that visual learning can improve understanding by
              up to 400% compared to text-only learning for complex concepts.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <p className="text-lg mb-8">
        Our platform breaks down complex algorithms into visual, interactive
        simulations that help you understand the underlying patterns.
      </p>

      <div className="space-y-6 mb-12">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">1. Browse Patterns</h3>
          <p>
            Explore our library of common algorithmic patterns used in coding
            interviews, organized by difficulty and category.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">2. Learn the Concept</h3>
          <p>
            Each pattern comes with a clear explanation, use cases, and example
            problems where the pattern can be applied.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            3. Watch the Simulation
          </h3>
          <p>
            See the algorithm in action with our step-by-step visual simulation,
            synchronized with code highlighting.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            4. Practice Implementation
          </h3>
          <p>
            Use our interactive code editor to implement the pattern yourself,
            with guidance and feedback.
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <p className="text-primary">contact@leetcodepatterns.com</p>
      </div>
    </div>
  );
};

export default AboutPage;
