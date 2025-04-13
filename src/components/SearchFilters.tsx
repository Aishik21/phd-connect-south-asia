
import React, { useState } from 'react';
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
import { Search, Filter, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  const isMobile = useIsMobile();

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
              className="pl-10 pr-4 py-2"
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
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className={`${isMobile ? (isFilterOpen ? 'block' : 'hidden') : 'block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger id="university">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iit-delhi">IIT Delhi</SelectItem>
                  <SelectItem value="iit-bombay">IIT Bombay</SelectItem>
                  <SelectItem value="iit-madras">IIT Madras</SelectItem>
                  <SelectItem value="iit-kanpur">IIT Kanpur</SelectItem>
                  <SelectItem value="iit-kharagpur">IIT Kharagpur</SelectItem>
                  <SelectItem value="iisc-bangalore">IISc Bangalore</SelectItem>
                  <SelectItem value="tamu">Texas A&M University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="bhutan">Bhutan</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
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
          <Button type="submit" className="bg-academic-600 hover:bg-academic-700">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
