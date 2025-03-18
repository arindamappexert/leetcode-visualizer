import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              LeetCode Pattern Simulator
            </h3>
            <p className="text-sm text-muted-foreground">
              Making algorithm learning more intuitive through interactive
              visualizations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/patterns" className="text-sm hover:text-primary">
                  Patterns
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions or suggestions? Email us at{" "}
              <a
                href="mailto:contact@leetcodepatterns.com"
                className="text-primary hover:underline"
              >
                contact@leetcodepatterns.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LeetCode Pattern Simulator. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
