
import React from 'react';
import { Users, BookOpen, GraduationCap, Globe } from 'lucide-react';

const StatisticsSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Largest PhD Professor Database</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Helping thousands of PhD students connect with the right professors for their research journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center card-hover">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-academic-100 dark:bg-academic-900 rounded-full mb-4">
              <Users className="h-8 w-8 text-academic-600 dark:text-academic-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-400">Professors Profiled</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center card-hover">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-academic-100 dark:bg-academic-900 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-academic-600 dark:text-academic-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">1,500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Research Topics</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center card-hover">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-academic-100 dark:bg-academic-900 rounded-full mb-4">
              <GraduationCap className="h-8 w-8 text-academic-600 dark:text-academic-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">300+</h3>
            <p className="text-gray-600 dark:text-gray-400">Universities</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center card-hover">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-academic-100 dark:bg-academic-900 rounded-full mb-4">
              <Globe className="h-8 w-8 text-academic-600 dark:text-academic-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">8</h3>
            <p className="text-gray-600 dark:text-gray-400">Countries Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
