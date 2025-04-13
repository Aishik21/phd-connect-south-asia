
import React from 'react';
import ProfessorCard, { Professor } from './ProfessorCard';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToJSON } from '@/lib/export-utils';
import { useToast } from '@/components/ui/use-toast';

type SearchResultsProps = {
  results: Professor[];
  loading: boolean;
  exportResults?: () => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  loading,
  exportResults 
}) => {
  const { toast } = useToast();

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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academic-600"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No professors found</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search criteria or exploring different research areas.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Found {results.length} professors
        </h2>
        
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
            <DropdownMenuItem onClick={handleExportToCSV} className="flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportToJSON} className="flex items-center">
              <FileJson className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((professor) => (
          <ProfessorCard key={professor.id} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
