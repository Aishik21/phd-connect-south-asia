
import React from 'react';
import ProfessorDetail from '@/components/ProfessorDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, Link } from 'react-router-dom';
import { professors } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus, 
  Mail, 
  FileText 
} from 'lucide-react';
import { exportToJSON, exportToCSV } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfessorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the professor by ID
  const professor = professors.find(prof => prof.id === id);

  const handleExportJSON = () => {
    if (professor) {
      exportToJSON([professor], `professor_${professor.name.toLowerCase().replace(/\s+/g, '_')}`);
      toast({
        title: "Export Successful",
        description: `Exported profile data for ${professor.name} as JSON.`,
      });
    }
  };

  const handleExportCSV = () => {
    if (professor) {
      exportToCSV([professor], `professor_${professor.name.toLowerCase().replace(/\s+/g, '_')}`);
      toast({
        title: "Export Successful",
        description: `Exported profile data for ${professor.name} as CSV.`,
      });
    }
  };

  const handleShareProfile = () => {
    if (navigator.share && professor) {
      navigator.share({
        title: `Professor ${professor.name}`,
        text: `Check out Professor ${professor.name}'s profile on PhD Connect`,
        url: window.location.href,
      }).catch((error) => {
        toast({
          title: "Sharing Failed",
          description: "Could not share this profile. You can copy the URL manually.",
          variant: "destructive",
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard!",
      });
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Professor profile has been added to your favorites.",
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Template",
      description: "Email template feature will be available soon.",
    });
  };

  if (!professor) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professor Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The professor you are looking for does not exist.</p>
            <Link to="/search">
              <Button variant="default" className="bg-academic-600 hover:bg-academic-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow">
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-br from-academic-500 to-academic-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link to="/search">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Search
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSaveProfile}
                  className="text-white hover:bg-white/20"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShareProfile}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-white/20"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportJSON} className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Export as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <ProfessorDetail professor={professor} />
            
            {/* Quick action button */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <Button 
                onClick={handleContact} 
                className="w-full md:w-auto bg-academic-600 hover:bg-academic-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Professor
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;
