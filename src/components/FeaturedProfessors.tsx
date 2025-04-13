
import React from 'react';
import { Professor } from './ProfessorCard';
import ProfessorCard from './ProfessorCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type FeaturedProfessorsProps = {
  professors: Professor[];
};

const FeaturedProfessors: React.FC<FeaturedProfessorsProps> = ({ professors }) => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Featured Professors
          </h2>
          <Button variant="outline" asChild>
            <Link to="/search" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professors.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProfessors;
