
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Search, Database, Mail, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About PhD Connect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Connecting PhD seekers with professors across South Asia and beyond
          </p>
        </div>
        
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                PhD Connect aims to bridge the gap between aspiring PhD students and professors, 
                with a special focus on South Asia. We believe that finding the right mentor is crucial 
                for a successful PhD journey, and our platform makes this process easier and more efficient.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                By aggregating comprehensive professor data, including research interests, publications, 
                and student feedback, we provide a valuable resource for PhD seekers to make informed decisions 
                about their academic future. Our goal is to foster meaningful academic connections and contribute 
                to the advancement of research and education globally.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-academic-100 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-academic-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Advanced Search
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Find professors by research interests, university, department, and more. 
                    Filter results to match your specific requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-academic-100 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-academic-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Comprehensive Database
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access detailed profiles for 10,000+ professors, including their research interests, 
                    publications, and contact information.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-academic-100 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-academic-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Email Templates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use our customizable email templates to reach out to professors professionally. 
                    Increase your chances of receiving a response.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-academic-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-academic-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Student Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Read and contribute reviews of professors from current and former PhD students. 
                    Get insights into their mentoring style and research environment.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-academic-100 flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-academic-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Regular Updates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our database is updated quarterly to ensure the information remains current and 
                    accurate, providing you with the most reliable data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Focus on South Asia
          </h2>
          
          <Card>
            <CardContent className="p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our platform includes professors from universities around the world, we place a 
                special emphasis on academic institutions in South Asia. This region is home to many 
                prestigious universities and talented researchers, but information about PhD opportunities 
                can sometimes be difficult to access.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                By focusing on South Asia, we aim to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Increase visibility for South Asian professors and their research contributions</li>
                <li>Help international students discover research opportunities in the region</li>
                <li>Support South Asian students in finding supervisors who align with their research interests</li>
                <li>Foster academic collaboration between South Asia and the rest of the world</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300">
                Our coverage includes universities in India, Pakistan, Bangladesh, Sri Lanka, Nepal, 
                Bhutan, and beyond. We are continuously expanding our database to include more institutions 
                and professors from across the region.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
