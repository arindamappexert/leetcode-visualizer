import React from "react";

const SimpleFooter = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} LeetCode Pattern Simulator. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
