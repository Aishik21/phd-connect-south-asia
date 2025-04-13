
import React from 'react';
import ProfessorDetail from '@/components/ProfessorDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, Navigate } from 'react-router-dom';
import { professors } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { exportToJSON } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const ProfessorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the professor by ID
  const professor = professors.find(prof => prof.id === id);

  const handleExport = () => {
    if (professor) {
      exportToJSON([professor], `professor_${professor.name.toLowerCase().replace(/\s+/g, '_')}`);
      toast({
        title: "Export Successful",
        description: `Exported profile data for ${professor.name}.`,
      });
    }
  };

  if (!professor) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Professor Not Found</h1>
          <p>The professor you are looking for does not exist.</p>
          <Link to="/search">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <Link to="/search">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Profile
          </Button>
        </div>
        <ProfessorDetail professor={professor} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;
