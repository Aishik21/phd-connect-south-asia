
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Star, 
  ThumbsUp, 
  MessageSquare,
  Book,
  Edit,
  Award,
  GraduationCap,
  FileText
} from 'lucide-react';
import { Professor } from './ProfessorCard';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

type ProfessorDetailProps = {
  professor: Professor & {
    phone?: string;
    office?: string;
    publications?: string[];
    reviews?: Array<{
      id: string;
      user: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
};

const ProfessorDetail: React.FC<ProfessorDetailProps> = ({ professor }) => {
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    if (reviewText.trim() === '') {
      toast({
        title: "Review Required",
        description: "Please enter a review comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit the review to your backend
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    // Reset form
    setReviewText('');
    setSelectedRating(0);
  };

  const handleContactClick = () => {
    // Logic to initiate email template or contact flow
    toast({
      title: "Contact Form",
      description: "Email template feature will be available soon.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              {professor.imageUrl ? (
                <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-academic-100">
                  <img 
                    src={professor.imageUrl} 
                    alt={professor.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 w-48 rounded-full overflow-hidden bg-academic-100 flex items-center justify-center">
                  <User className="h-24 w-24 text-academic-600" />
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 md:pl-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{professor.name}</h1>
              
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-academic-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{professor.department}</span>
              </div>
              
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 text-academic-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{professor.university}</span>
              </div>
              
              {professor.country && (
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-academic-600 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">{professor.country}</span>
                </div>
              )}
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < professor.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {professor.rating.toFixed(1)} ({professor.reviewCount} {professor.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {professor.researchInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleContactClick} className="bg-academic-600 hover:bg-academic-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Professor
                </Button>
                
                {professor.website && (
                  <Button variant="outline" asChild>
                    <a href={professor.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contact" className="mb-8">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="p-4 bg-white dark:bg-gray-800 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-academic-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="text-gray-900 dark:text-white">{professor.email}</p>
              </div>
            </div>
            
            {professor.phone && (
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-academic-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="text-gray-900 dark:text-white">{professor.phone}</p>
                </div>
              </div>
            )}
            
            {professor.office && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-academic-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Office</h3>
                  <p className="text-gray-900 dark:text-white">{professor.office}</p>
                </div>
              </div>
            )}
            
            {professor.website && (
              <div className="flex items-start">
                <ExternalLink className="h-5 w-5 text-academic-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                  <a href={professor.website} target="_blank" rel="noopener noreferrer" className="text-academic-600 hover:underline break-all">
                    {professor.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="publications" className="p-4 bg-white dark:bg-gray-800 rounded-md shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Publications</h2>
            {professor.publications && professor.publications.length > 0 && (
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
          
          {professor.publications && professor.publications.length > 0 ? (
            <ul className="space-y-3">
              {professor.publications.map((publication, index) => (
                <li key={index} className="flex">
                  <Book className="h-5 w-5 text-academic-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">{publication}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No publications available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="p-4 bg-white dark:bg-gray-800 rounded-md shadow">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>
            
            {professor.reviews && professor.reviews.length > 0 ? (
              <div className="space-y-4">
                {professor.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">{review.user}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-4">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Rating:</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-6 w-6 cursor-pointer ${
                          (hoverRating || selectedRating) >= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        onClick={() => setSelectedRating(rating)}
                        onMouseEnter={() => setHoverRating(rating)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>
                
                <Textarea
                  placeholder="Share your experience with this professor..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              
              <Button type="submit" className="bg-academic-600 hover:bg-academic-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorDetail;
