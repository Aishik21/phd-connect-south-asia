
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

type SearchFiltersProps = {
  onSearch: (filters: any) => void;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [department, setDepartment] = useState('');
  const [university, setUniversity] = useState('');
  const [researchArea, setResearchArea] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  
  const isMobile = useIsMobile();

  // Track active filters count
  useEffect(() => {
    let count = 0;
    if (department) count++;
    if (university) count++;
    if (country) count++;
    if (researchArea) count++;
    if (rating) count++;
    setActiveFilters(count);
  }, [department, university, country, researchArea, rating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      keyword,
      department,
      university,
      researchArea,
      country,
      rating
    });
  };

  const resetFilters = () => {
    setKeyword('');
    setDepartment('');
    setUniversity('');
    setResearchArea('');
    setCountry('');
    setRating('');
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Get departments based on selected country (in a real app, this would be from API)
  const getDepartments = () => {
    return [
      { value: "computer-science", label: "Computer Science" },
      { value: "electrical-engineering", label: "Electrical Engineering" },
      { value: "mechanical-engineering", label: "Mechanical Engineering" },
      { value: "civil-engineering", label: "Civil Engineering" },
      { value: "physics", label: "Physics" },
      { value: "mathematics", label: "Mathematics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "biology", label: "Biology" }
    ];
  };

  // Get universities based on selected country and department (in a real app, this would be from API)
  const getUniversities = () => {
    if (country === 'india') {
      return [
        { value: "iit-delhi", label: "IIT Delhi" },
        { value: "iit-bombay", label: "IIT Bombay" },
        { value: "iit-madras", label: "IIT Madras" },
        { value: "iit-kanpur", label: "IIT Kanpur" },
        { value: "iit-kharagpur", label: "IIT Kharagpur" },
        { value: "iisc-bangalore", label: "IISc Bangalore" }
      ];
    } else if (country === 'usa') {
      return [
        { value: "mit", label: "MIT" },
        { value: "stanford", label: "Stanford University" },
        { value: "harvard", label: "Harvard University" },
        { value: "tamu", label: "Texas A&M University" },
        { value: "caltech", label: "Caltech" }
      ];
    } else {
      return [
        { value: "iit-delhi", label: "IIT Delhi" },
        { value: "iit-bombay", label: "IIT Bombay" },
        { value: "iit-madras", label: "IIT Madras" },
        { value: "mit", label: "MIT" },
        { value: "stanford", label: "Stanford University" },
        { value: "oxford", label: "University of Oxford" },
        { value: "cambridge", label: "University of Cambridge" },
        { value: "tamu", label: "Texas A&M University" }
      ];
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, research topic, or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10 pr-16 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            
            {isMobile && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={toggleFilters}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <div className="relative">
                  <SlidersHorizontal className="h-4 w-4" />
                  {activeFilters > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-academic-600"
                    >
                      {activeFilters}
                    </Badge>
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>

        <div className={`${isMobile ? (isFilterOpen ? 'block' : 'hidden') : 'block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={(value) => {
                setCountry(value);
                // Reset dependent filters
                setDepartment('');
                setUniversity('');
              }}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={(value) => {
                setDepartment(value);
                // Reset university if department changes
                setUniversity('');
              }}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {getDepartments().map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger id="university">
                  <SelectValue placeholder="All Universities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Universities</SelectItem>
                  {getUniversities().map(univ => (
                    <SelectItem key={univ.value} value={univ.value}>{univ.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="advanced-filters">
              <AccordionTrigger className="text-sm font-medium">Advanced Filters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="research-area">Research Area</Label>
                    <Input
                      id="research-area"
                      placeholder="e.g., Machine Learning, Quantum Physics"
                      value={researchArea}
                      onChange={(e) => setResearchArea(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rating">Minimum Rating</Label>
                    <Select value={rating} onValueChange={setRating}>
                      <SelectTrigger id="rating">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any rating</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="2">2+ Stars</SelectItem>
                        <SelectItem value="1">1+ Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={resetFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
