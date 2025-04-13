
import React from 'react';
import ProfessorDetail from '@/components/ProfessorDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, Navigate } from 'react-router-dom';
import { professors } from '@/lib/constants';

const ProfessorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the professor by ID
  const professor = professors.find(prof => prof.id === id);

  if (!professor) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Professor Not Found</h1>
          <p>The professor you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfessorDetail professor={professor} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;
