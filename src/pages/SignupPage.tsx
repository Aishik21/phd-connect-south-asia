
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, User, Lock, Mail, Github, Google, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [research, setResearch] = useState('');
  const [university, setUniversity] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim() || !name.trim() || !confirmPassword.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: 'Error',
        description: 'You must accept the terms and conditions.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Account Created',
        description: 'Welcome to PhD Connect! You can now log in with your credentials.',
      });
      setLoading(false);
      // In a real app, you would redirect to the login page or onboarding
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-academic-600" />
              </div>
              <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Sign up to connect with professors and track your PhD journey
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University/Institution</Label>
                  <Input
                    id="university"
                    type="text"
                    placeholder="e.g., IIT Delhi, NUS, TAMU"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select your department" />
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
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="research">Research Interests</Label>
                  <Input
                    id="research"
                    type="text"
                    placeholder="e.g., Machine Learning, Quantum Physics"
                    value={research}
                    onChange={(e) => setResearch(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-academic-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-academic-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-academic-600 hover:bg-academic-700"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign up
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 dark:text-gray-400">or sign up with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Google className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-academic-600 hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
