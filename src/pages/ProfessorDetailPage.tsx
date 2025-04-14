
import React, { useState } from 'react';
import ProfessorDetail from '@/components/ProfessorDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailTemplate from '@/components/EmailTemplate';
import { useParams, Link } from 'react-router-dom';
import { professors } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus, 
  Mail, 
  FileText,
  User,
  BookOpen,
  GraduationCap,
  Award,
  Star
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
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  
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

  const handleOpenEmailTemplate = () => {
    setIsEmailOpen(true);
  };

  const handleCloseEmailTemplate = () => {
    setIsEmailOpen(false);
  };

  if (!professor) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Professor Not Found</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">The professor you are looking for does not exist.</p>
            <Link to="/search">
              <Button variant="default">
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex-grow">
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white py-8">
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
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                    <User className="h-24 w-24 text-slate-400" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{professor.name}</h2>
                      <p className="text-slate-500 dark:text-slate-400">{professor.department}, {professor.university}</p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(professor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-slate-700 dark:text-slate-300">{professor.rating} ({professor.reviewCount} reviews)</span>
                    </div>
                    
                    <Button 
                      onClick={handleOpenEmailTemplate} 
                      className="w-full"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Professor
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="research" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Research
                      </TabsTrigger>
                      <TabsTrigger value="publications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Publications
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">About</h3>
                          <p className="text-slate-700 dark:text-slate-300">
                            Professor {professor.name} is a faculty member in the {professor.department} department at {professor.university}.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Contact Information</h3>
                          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                            <li><strong>Email:</strong> {professor.email}</li>
                            <li><strong>Country:</strong> {professor.country}</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="research" className="mt-0">
                      <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Research Areas</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {professor.researchInterests.map((interest, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Specializations</h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          Professor {professor.name} specializes in {professor.researchInterests.join(', ')}.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="publications" className="mt-0">
                      <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Selected Publications</h3>
                        <ul className="space-y-3">
                          <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <p className="text-slate-700 dark:text-slate-300">
                              {professor.name} et al. (2023). "Advances in {professor.researchInterests[0]}: A Comprehensive Review". <em>Journal of {professor.department}</em>, 45(2), 112-128.
                            </p>
                          </li>
                          <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <p className="text-slate-700 dark:text-slate-300">
                              {professor.name} & Smith, J. (2022). "Exploring New Frontiers in {professor.researchInterests.length > 1 ? professor.researchInterests[1] : professor.researchInterests[0]}". <em>International Conference on {professor.department}</em>, 234-241.
                            </p>
                          </li>
                          <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <p className="text-slate-700 dark:text-slate-300">
                              Johnson, R., {professor.name}, & Li, W. (2021). "Novel Approaches to {professor.researchInterests[0]}". <em>{professor.department} Research Letters</em>, 12(4), 78-92.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Template Dialog */}
      <EmailTemplate 
        professor={professor} 
        isOpen={isEmailOpen} 
        onClose={handleCloseEmailTemplate} 
      />
      
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;
