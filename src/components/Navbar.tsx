
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu, X, User, Search, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-academic-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                PhD<span className="text-academic-600">Connect</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-academic-600 dark:text-gray-300 dark:hover:text-white">
                  Home
                </Link>
                <Link to="/search" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-academic-600 dark:text-gray-300 dark:hover:text-white">
                  Search Professors
                </Link>
                <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-academic-600 dark:text-gray-300 dark:hover:text-white">
                  About
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-academic-600 hover:bg-academic-700" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-academic-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-academic-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-academic-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Professors
              </div>
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-academic-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              About
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/login" onClick={toggleMenu}>
                  <User className="h-4 w-4 mr-2" />
                  Log in
                </Link>
              </Button>
              <Button className="bg-academic-600 hover:bg-academic-700 w-full justify-start" asChild>
                <Link to="/signup" onClick={toggleMenu}>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
