
import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatisticsSection from '@/components/StatisticsSection';
import FeaturedProfessors from '@/components/FeaturedProfessors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Professor } from '@/components/ProfessorCard';

const Index = () => {
  // Mock data for featured professors
  const featuredProfessors: Professor[] = [
    {
      id: '1',
      name: 'Dr. Rajiv Sharma',
      department: 'Computer Science',
      university: 'IIT Delhi',
      researchInterests: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision'],
      email: 'rajiv.sharma@cse.iitd.ac.in',
      rating: 4.7,
      reviewCount: 24,
      country: 'India',
    },
    {
      id: '2',
      name: 'Dr. Priya Patel',
      department: 'Electrical Engineering',
      university: 'IISc Bangalore',
      researchInterests: ['Semiconductor Devices', 'VLSI Design', 'Integrated Circuits'],
      email: 'priya.patel@ee.iisc.ac.in',
      rating: 4.5,
      reviewCount: 18,
      country: 'India',
    },
    {
      id: '3',
      name: 'Dr. Ahmed Khan',
      department: 'Mechanical Engineering',
      university: 'NED University',
      researchInterests: ['Fluid Dynamics', 'Renewable Energy', 'Thermodynamics'],
      email: 'ahmed.khan@neduet.edu.pk',
      rating: 4.2,
      reviewCount: 15,
      country: 'Pakistan',
    }
  ];

  return (
    <div>
      <Navbar />
      
      <main>
        <HeroSection />
        <StatisticsSection />
        <FeaturedProfessors professors={featuredProfessors} />
        
        {/* Call to Action Section */}
        <div className="bg-academic-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Find Your PhD Supervisor?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Search our extensive database of professors and find the perfect match for your research interests.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/search" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-academic-600 hover:bg-academic-700">
                Start Searching
              </a>
              <a href="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-academic-600 text-base font-medium rounded-md text-academic-700 bg-white hover:bg-academic-50 dark:text-academic-300 dark:bg-gray-700 dark:border-academic-400 dark:hover:bg-gray-600">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
