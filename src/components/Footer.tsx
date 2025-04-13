
import React from 'react';
import { GraduationCap, Mail, MapPin, Globe, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-academic-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                PhD<span className="text-academic-600">Connect</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connecting PhD seekers with professors across South Asia and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  Search Professors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  PhD Application Tips
                </Link>
              </li>
              <li>
                <Link to="/universities" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  University Directory
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-600 hover:text-academic-600 dark:text-gray-400 dark:hover:text-academic-400">
                  Departments
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  contact@phdconnect.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  South Asian Research Hub,<br />
                  New Delhi, India
                </span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  www.phdconnect.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PhD Connect South Asia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
