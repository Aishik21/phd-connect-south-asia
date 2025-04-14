
import React from 'react';
import ProfessorCard, { Professor } from './ProfessorCard';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileSpreadsheet, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToJSON } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

type SearchResultsProps = {
  results: Professor[];
  loading: boolean;
  exportResults?: () => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  loading
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const handleExportToCSV = () => {
    exportToCSV(results);
    toast({
      title: "Export Successful",
      description: `Exported ${results.length} professors to CSV file.`,
    });
  };

  const handleExportToJSON = () => {
    exportToJSON(results);
    toast({
      title: "Export Successful",
      description: `Exported ${results.length} professors to JSON file.`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="relative h-16 w-16">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-academic-400 opacity-75"></div>
          <div className="relative animate-pulse h-16 w-16 rounded-full bg-academic-500 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center my-8">
        <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
          <SlidersHorizontal className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No professors found</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search criteria or exploring different research areas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Found {results.length} professors
        </h2>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-1 flex">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-transparent'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-transparent'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportToCSV} className="flex items-center cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportToJSON} className="flex items-center cursor-pointer">
                <FileJson className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {results.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {results.map((professor) => (
            <div key={professor.id} className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex-shrink-0 mr-4">
                {professor.imageUrl ? (
                  <img 
                    src={professor.imageUrl}
                    alt={professor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-academic-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-academic-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">{professor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{professor.department}, {professor.university}</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < professor.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    ({professor.reviewCount})
                  </span>
                </div>
              </div>
              
              <Link to={`/professors/${professor.id}`}>
                <Button variant="ghost" size="sm" className="text-academic-600 hover:text-academic-700 hover:bg-academic-50 dark:hover:bg-gray-700">
                  View Profile
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add missing imports
import { GraduationCap, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default SearchResults;
