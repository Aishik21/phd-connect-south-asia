
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, MapPin, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="md:flex items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Find the Perfect Professor for Your PhD Journey
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl">
              Connect with leading professors across South Asia and beyond. 
              Search by research interests, department, and university to 
              find your ideal PhD mentor.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-academic-700 hover:bg-gray-100" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5 mr-2" />
                  Find Professors
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/signup">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 transform hover:scale-105 transition-transform">
                  <MapPin className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
                  <p className="text-white/80">
                    Find professors from top universities in South Asia and around the world.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 transform hover:scale-105 transition-transform">
                  <Users className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
                  <p className="text-white/80">
                    Read and contribute reviews from fellow PhD students.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 transform hover:scale-105 transition-transform">
                  <Search className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Search</h3>
                  <p className="text-white/80">
                    Filter by research interests, department, university, and more.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 transform hover:scale-105 transition-transform">
                  <GraduationCap className="h-10 w-10 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Research Match</h3>
                  <p className="text-white/80">
                    Connect with professors whose research aligns with your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
