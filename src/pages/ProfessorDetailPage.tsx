
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfessorDetail from '@/components/ProfessorDetail';
import EmailTemplate from '@/components/EmailTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { Professor } from '@/components/ProfessorCard';

// Extended professor type with additional details
type ProfessorDetailType = Professor & {
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

const ProfessorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<ProfessorDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch professor details
    setLoading(true);
    
    // Mock data for professor details
    const mockProfessors: Record<string, ProfessorDetailType> = {
      '1': {
        id: '1',
        name: 'Dr. Rajiv Sharma',
        department: 'Computer Science',
        university: 'IIT Delhi',
        researchInterests: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Natural Language Processing'],
        email: 'rajiv.sharma@cse.iitd.ac.in',
        rating: 4.7,
        reviewCount: 24,
        country: 'India',
        phone: '+91 11 2659 1291',
        office: 'Bharti Building, Room 307, IIT Delhi',
        website: 'https://www.cse.iitd.ac.in/~rajiv',
        publications: [
          'Deep Learning for Computer Vision: A Comprehensive Survey (2023)',
          'Attention Mechanisms in Transformer Models for Image Classification (2022)',
          'Explainable AI: Making Neural Networks Transparent (2021)',
          'Transfer Learning Approaches for Low-Resource Visual Tasks (2020)',
          'CNN Architecture Optimization Using Neural Architecture Search (2019)'
        ],
        reviews: [
          {
            id: 'r1',
            user: 'Amit Kumar',
            rating: 5,
            comment: 'Dr. Sharma is an exceptional mentor. His expertise in computer vision is unmatched, and he provides excellent guidance for PhD students. He's always available for discussions and gives constructive feedback.',
            date: '2023-09-15'
          },
          {
            id: 'r2',
            user: 'Sneha Gupta',
            rating: 5,
            comment: 'I had the privilege of working with Dr. Sharma for my PhD. His depth of knowledge in AI and machine learning is remarkable. He pushes students to achieve their best while providing the necessary support.',
            date: '2023-07-22'
          },
          {
            id: 'r3',
            user: 'Michael Chen',
            rating: 4,
            comment: 'Very knowledgeable professor with excellent research background. Sometimes busy with many projects, but always makes time for his students eventually.',
            date: '2023-04-10'
          }
        ]
      },
      '7': {
        id: '7',
        name: 'Dr. Sean Smith',
        department: 'Nuclear Engineering',
        university: 'Texas A&M University',
        researchInterests: ['Nuclear Reactor Physics', 'Radiation Detection', 'Nuclear Safety', 'Nuclear Fuel Cycles'],
        email: 'sean.smith@tamu.edu',
        rating: 4.6,
        reviewCount: 28,
        country: 'United States',
        phone: '+1 979-845-7313',
        office: 'Nuclear Engineering Building, Room 337, TAMU',
        website: 'https://nuclear.tamu.edu/faculty/smith',
        publications: [
          'Advanced Monte Carlo Methods for Neutron Transport Simulation (2023)',
          'Safety Analysis for Generation IV Nuclear Reactors (2022)',
          'Radiation Detection Techniques for Nuclear Safeguards (2021)',
          'Computational Models for Nuclear Fuel Performance under Accident Conditions (2020)',
          'Uncertainty Quantification in Nuclear Engineering Applications (2019)'
        ],
        reviews: [
          {
            id: 'r1',
            user: 'Jennifer Park',
            rating: 5,
            comment: 'Dr. Smith is an outstanding advisor. His knowledge of nuclear engineering is extraordinary, and he's dedicated to his students' success. Highly recommend working with him!',
            date: '2023-10-05'
          },
          {
            id: 'r2',
            user: 'David Johnson',
            rating: 4,
            comment: 'Very supportive professor with excellent industry connections. His research is cutting-edge and well-funded. Can be demanding but in a constructive way.',
            date: '2023-06-18'
          },
          {
            id: 'r3',
            user: 'Maria Rodriguez',
            rating: 5,
            comment: 'One of the best professors I've worked with. Provides clear direction while allowing students to explore their research interests. Great balance of guidance and independence.',
            date: '2022-12-03'
          }
        ]
      }
    };

    // Simulate API delay
    setTimeout(() => {
      if (id && mockProfessors[id]) {
        setProfessor(mockProfessors[id]);
      } else if (id) {
        // If ID doesn't match, fallback to a default professor for demo
        setProfessor(mockProfessors['1']);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleContactClick = () => {
    setShowEmailTemplate(true);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academic-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!professor) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professor Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The professor you're looking for could not be found.
          </p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={handleBackClick} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button onClick={handleContactClick} className="bg-academic-600 hover:bg-academic-700">
            <Mail className="h-4 w-4 mr-2" />
            Contact Professor
          </Button>
        </div>
        
        <ProfessorDetail professor={professor} />
        
        <EmailTemplate 
          professor={professor} 
          isOpen={showEmailTemplate}
          onClose={() => setShowEmailTemplate(false)}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessorDetailPage;
