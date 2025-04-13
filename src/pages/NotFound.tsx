
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <GraduationCap className="h-24 w-24 text-academic-600" />
            <span className="absolute -top-2 -right-2 text-3xl font-bold text-gray-900 dark:text-white">
              404
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mb-8">
            We couldn't find the page you were looking for. The professor might be on sabbatical!
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-academic-600 hover:bg-academic-700" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/search">
                <Search className="h-4 w-4 mr-2" />
                Search Professors
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
