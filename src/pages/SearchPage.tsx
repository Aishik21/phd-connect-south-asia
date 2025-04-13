
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import SearchResults from '@/components/SearchResults';
import { Professor } from '@/components/ProfessorCard';
import { useToast } from '@/components/ui/use-toast';

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Professor[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Mock data for professors
  const mockProfessors: Professor[] = [
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
    },
    {
      id: '4',
      name: 'Dr. Lisa Chen',
      department: 'Physics',
      university: 'National University of Singapore',
      researchInterests: ['Quantum Physics', 'Condensed Matter', 'Nanomaterials'],
      email: 'lisa.chen@nus.edu.sg',
      rating: 4.8,
      reviewCount: 32,
      country: 'Singapore',
    },
    {
      id: '5',
      name: 'Dr. Mohammad Rahim',
      department: 'Civil Engineering',
      university: 'BUET',
      researchInterests: ['Structural Engineering', 'Earthquake Resistance', 'Sustainable Construction'],
      email: 'mohammad.rahim@buet.ac.bd',
      rating: 4.0,
      reviewCount: 12,
      country: 'Bangladesh',
    },
    {
      id: '6',
      name: 'Dr. Anushka De Silva',
      department: 'Chemistry',
      university: 'University of Colombo',
      researchInterests: ['Organic Chemistry', 'Medicinal Chemistry', 'Natural Products'],
      email: 'anushka.desilva@cmb.ac.lk',
      rating: 4.3,
      reviewCount: 10,
      country: 'Sri Lanka',
    },
    {
      id: '7',
      name: 'Dr. Sean Smith',
      department: 'Nuclear Engineering',
      university: 'Texas A&M University',
      researchInterests: ['Nuclear Reactor Physics', 'Radiation Detection', 'Nuclear Safety'],
      email: 'sean.smith@tamu.edu',
      rating: 4.6,
      reviewCount: 28,
      country: 'United States',
    },
    {
      id: '8',
      name: 'Dr. Anika Verma',
      department: 'Mathematics',
      university: 'IIT Kanpur',
      researchInterests: ['Algebraic Topology', 'Graph Theory', 'Computational Mathematics'],
      email: 'anika.verma@math.iitk.ac.in',
      rating: 4.4,
      reviewCount: 16,
      country: 'India',
    },
    {
      id: '9',
      name: 'Dr. Maryam Khan',
      department: 'Biology',
      university: 'Quaid-i-Azam University',
      researchInterests: ['Molecular Biology', 'Genetics', 'Bioinformatics'],
      email: 'maryam.khan@qau.edu.pk',
      rating: 4.5,
      reviewCount: 20,
      country: 'Pakistan',
    }
  ];

  const handleSearch = (filters: any) => {
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Apply filters to mock data (in a real app, this would be a backend API call)
      let filteredResults = [...mockProfessors];
      
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        filteredResults = filteredResults.filter(
          prof => 
            prof.name.toLowerCase().includes(keyword) || 
            prof.department.toLowerCase().includes(keyword) || 
            prof.university.toLowerCase().includes(keyword) || 
            prof.researchInterests.some(interest => interest.toLowerCase().includes(keyword))
        );
      }
      
      if (filters.department) {
        filteredResults = filteredResults.filter(
          prof => prof.department.toLowerCase().includes(filters.department.toLowerCase())
        );
      }
      
      if (filters.university) {
        filteredResults = filteredResults.filter(
          prof => prof.university.toLowerCase().includes(filters.university.replace('-', ' ').toLowerCase())
        );
      }
      
      if (filters.country) {
        filteredResults = filteredResults.filter(
          prof => prof.country?.toLowerCase().includes(filters.country.replace('-', ' ').toLowerCase())
        );
      }
      
      if (filters.researchArea) {
        const research = filters.researchArea.toLowerCase();
        filteredResults = filteredResults.filter(
          prof => prof.researchInterests.some(
            interest => interest.toLowerCase().includes(research)
          )
        );
      }
      
      if (filters.rating) {
        const minRating = parseInt(filters.rating);
        filteredResults = filteredResults.filter(
          prof => prof.rating >= minRating
        );
      }
      
      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  };

  const handleExportResults = () => {
    // In a real app, generate CSV or JSON and download it
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'professor_search_results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Export Complete",
      description: `Exported ${results.length} professor records as JSON.`,
    });
  };

  return (
    <div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search Professors
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find professors by research area, university, department, or country.
          </p>
        </div>
        
        <SearchFilters onSearch={handleSearch} />
        
        {hasSearched && (
          <SearchResults 
            results={results} 
            loading={loading}
            exportResults={handleExportResults}
          />
        )}
        
        {!hasSearched && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Use the search filters above to find professors.
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Search by name, research interest, university, or department.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
