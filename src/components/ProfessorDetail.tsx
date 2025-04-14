
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
  MessageSquare,
  Book,
  GraduationCap,
  Award,
  FileText,
  Calendar,
  Clock,
  Share2
} from 'lucide-react';
import { Professor } from './ProfessorCard';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            {professor.imageUrl ? (
              <div className="rounded-xl overflow-hidden border-4 border-academic-100 shadow-xl mb-6 aspect-square">
                <img 
                  src={professor.imageUrl} 
                  alt={professor.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-academic-100 to-academic-200 flex items-center justify-center mb-6 aspect-square shadow-xl">
                <User className="h-24 w-24 text-academic-600" />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</h3>
                <div className="flex items-center">
                  <div className="flex">
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
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {professor.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviews</h3>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {professor.reviewCount}
                </span>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-academic-600 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{professor.email}</span>
                  </div>
                  
                  {professor.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-academic-600 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{professor.phone}</span>
                    </div>
                  )}
                  
                  {professor.office && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-academic-600 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{professor.office}</span>
                    </div>
                  )}
                  
                  {professor.website && (
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-academic-600 mr-2" />
                      <a href={professor.website} target="_blank" rel="noopener noreferrer" 
                        className="text-sm text-academic-600 hover:underline truncate max-w-[200px]">
                        {professor.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{professor.name}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GraduationCap className="h-4 w-4 text-academic-600 mr-1" />
                  <span className="text-sm">{professor.department}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="h-4 w-4 text-academic-600 mr-1" />
                  <span className="text-sm">{professor.university}</span>
                </div>
                
                {professor.country && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-academic-600 mr-1" />
                    <span className="text-sm">{professor.country}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {professor.researchInterests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="bg-academic-50 text-academic-700 hover:bg-academic-100 transition-colors">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="bio" className="text-sm">Biography</TabsTrigger>
                <TabsTrigger value="publications" className="text-sm">Publications</TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bio" className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Professor {professor.name} is a distinguished academic in the field of {professor.department} 
                    at {professor.university}. With expertise in {professor.researchInterests.join(', ')}, 
                    their research has contributed significantly to advancements in these areas.
                  </p>
                  <p>
                    Their work focuses on innovative approaches to solve complex problems in 
                    {professor.researchInterests[0]} and related fields. Students interested in these 
                    research areas are encouraged to reach out directly through the contact information provided.
                  </p>
                </div>
                
                <div className="bg-academic-50 dark:bg-gray-700/30 rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-medium text-academic-700 dark:text-academic-300 flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Office Hours
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Monday & Wednesday: 2:00 PM - 4:00 PM<br />
                    Or by appointment
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="publications" className="space-y-4">
                {professor.publications && professor.publications.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Publications</h3>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Export All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {professor.publications.map((publication, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start">
                            <Book className="h-5 w-5 text-academic-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 font-medium">{publication}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Published in Journal of {professor.department}, 2024
                              </p>
                              <div className="flex items-center mt-2">
                                <Button variant="ghost" size="sm" className="h-8 text-academic-600 hover:text-academic-700 hover:bg-academic-50 dark:hover:bg-gray-700 px-2">
                                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                  View Paper
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-academic-600 hover:text-academic-700 hover:bg-academic-50 dark:hover:bg-gray-700 px-2">
                                  <Share2 className="h-3.5 w-3.5 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Publications Available</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Publications for this professor have not been added yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  {professor.reviews && professor.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {professor.reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-academic-100 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-academic-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{review.user}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex">
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
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Reviews Yet</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Be the first to leave a review for this professor!
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Your Rating:</label>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Star
                                key={rating}
                                className={cn(
                                  "h-6 w-6 cursor-pointer transition-colors", 
                                  (hoverRating || selectedRating) >= rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                )}
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
                          className="resize-none bg-white dark:bg-gray-800"
                        />
                      </div>
                      
                      <Button type="submit" className="bg-academic-600 hover:bg-academic-700 transition-colors">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDetail;
