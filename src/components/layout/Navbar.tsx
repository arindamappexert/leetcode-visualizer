import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Code, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

const Navbar = ({ theme = "light", onThemeToggle = () => {} }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full h-16 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">
            LeetCode Pattern Simulator
          </span>
          <span className="font-bold text-xl sm:hidden">LPS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/patterns"
            className="text-foreground hover:text-primary transition-colors"
          >
            Patterns
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/patterns"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Patterns
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
