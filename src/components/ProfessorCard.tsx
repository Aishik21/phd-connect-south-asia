
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, ExternalLink, Book, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Professor = {
  id: string;
  name: string;
  department: string;
  university: string;
  researchInterests: string[];
  email: string;
  rating: number;
  reviewCount: number;
  website?: string;
  country?: string;
  imageUrl?: string;
};

type ProfessorCardProps = {
  professor: Professor;
};

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold text-academic-900 dark:text-academic-100">
            {professor.name}
          </CardTitle>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {professor.department}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {professor.university}{professor.country ? `, ${professor.country}` : ''}
          </div>
        </div>
        
        {professor.imageUrl ? (
          <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src={professor.imageUrl} 
              alt={professor.name} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-14 w-14 rounded-full overflow-hidden bg-academic-100 flex items-center justify-center">
            <User className="h-8 w-8 text-academic-600" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="mb-3 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < professor.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            ({professor.reviewCount} {professor.reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1.5">Research Interests</h4>
          <div className="flex flex-wrap gap-1.5">
            {professor.researchInterests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="font-normal text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button size="sm" asChild>
          <Link to={`/professors/${professor.id}`}>
            View Profile
          </Link>
        </Button>
        
        <div className="flex space-x-2">
          <Button size="icon" variant="outline" className="h-8 w-8" asChild>
            <a href={`mailto:${professor.email}`} title="Email Professor">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          
          {professor.website && (
            <Button size="icon" variant="outline" className="h-8 w-8" asChild>
              <a href={professor.website} target="_blank" rel="noopener noreferrer" title="Visit Website">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfessorCard;
