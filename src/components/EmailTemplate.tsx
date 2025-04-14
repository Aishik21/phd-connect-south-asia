
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Paperclip, 
  Send,
  Eye,
  File,
  Save,
  X,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Professor } from '@/components/ProfessorCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

type EmailTemplateProps = {
  professor: Professor;
  isOpen?: boolean;
  onClose?: () => void;
};

// Template options
const EMAIL_TEMPLATES = [
  {
    id: 'inquiry',
    name: 'Research Inquiry',
    subject: 'Research Inquiry: [RESEARCH_AREA]',
    body: `Dear Professor [PROFESSOR_NAME],

I hope this email finds you well. My name is [YOUR_NAME], and I am a prospective PhD student interested in pursuing research in [RESEARCH_AREA].

I am writing to inquire about potential PhD opportunities in your research group at [UNIVERSITY]. I was particularly interested in your work on [SPECIFIC_RESEARCH] and would like to know if you are currently accepting PhD students.

[YOUR_BACKGROUND]

I have attached my CV and research statement for your reference. I would greatly appreciate the opportunity to discuss potential research directions and how my interests align with your work.

Thank you for your time and consideration. I look forward to hearing from you.

Sincerely,
[YOUR_NAME]
[YOUR_CONTACT]`
  },
  {
    id: 'collaboration',
    name: 'Collaboration Request',
    subject: 'Potential Collaboration on [RESEARCH_AREA]',
    body: `Dear Professor [PROFESSOR_NAME],

I hope this email finds you well. My name is [YOUR_NAME], and I am a [YOUR_POSITION] at [YOUR_UNIVERSITY].

I have been following your research on [RESEARCH_AREA] with great interest. Your recent publication on [SPECIFIC_PAPER] particularly caught my attention, as it aligns closely with my current work on [YOUR_RESEARCH].

I am reaching out to explore potential opportunities for collaboration. I believe our research interests complement each other well, and a joint project could yield valuable insights in the field of [RESEARCH_AREA].

[COLLABORATION_PROPOSAL]

I have attached some relevant materials that outline my research and ideas for collaboration. I would be delighted to schedule a call to discuss this further at your convenience.

Thank you for considering this request. I look forward to your response.

Best regards,
[YOUR_NAME]
[YOUR_CONTACT]`
  },
  {
    id: 'meeting',
    name: 'Meeting Request',
    subject: 'Request for a Brief Meeting to Discuss [TOPIC]',
    body: `Dear Professor [PROFESSOR_NAME],

I hope this email finds you well. My name is [YOUR_NAME], and I am a [YOUR_POSITION] at [YOUR_UNIVERSITY] with a research focus on [YOUR_RESEARCH].

I am writing to request a brief meeting with you to discuss [MEETING_PURPOSE]. I have been following your work on [RESEARCH_AREA] and believe your insights would be invaluable to my research.

I understand that you have a busy schedule, so I would be grateful for even a short 15-20 minute meeting at your convenience. I am available [YOUR_AVAILABILITY].

Thank you for considering my request. I look forward to the possibility of speaking with you.

Kind regards,
[YOUR_NAME]
[YOUR_CONTACT]`
  }
];

const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  professor,
  isOpen = false,
  onClose
}) => {
  // States for the email
  const [selectedTemplate, setSelectedTemplate] = useState('inquiry');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourPosition, setYourPosition] = useState('');
  const [yourUniversity, setYourUniversity] = useState('');
  const [yourResearch, setYourResearch] = useState('');
  const [yourBackground, setYourBackground] = useState('');
  const [yourContact, setYourContact] = useState('');
  const [specificResearch, setSpecificResearch] = useState('');
  const [specificPaper, setSpecificPaper] = useState('');
  const [collaborationProposal, setCollaborationProposal] = useState('');
  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [yourAvailability, setYourAvailability] = useState('');
  
  const [attachments, setAttachments] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState('compose');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Update template when professor changes or template selection changes
  useEffect(() => {
    if (professor) {
      const template = EMAIL_TEMPLATES.find(t => t.id === selectedTemplate) || EMAIL_TEMPLATES[0];
      
      // Update subject with research area from professor
      const newSubject = template.subject.replace(
        '[RESEARCH_AREA]', 
        professor.researchInterests[0] || 'PhD Opportunities'
      );
      setSubject(newSubject);

      // Update email body with professor-specific information
      let newBody = template.body;
      newBody = newBody.replace(/\[PROFESSOR_NAME\]/g, professor.name);
      newBody = newBody.replace(/\[UNIVERSITY\]/g, professor.university);
      newBody = newBody.replace(/\[RESEARCH_AREA\]/g, professor.researchInterests.join(', '));
      
      setEmailBody(newBody);
    }
  }, [professor, selectedTemplate]);

  // Compile the final email by replacing placeholders with user inputs
  const compileFinalEmail = () => {
    let finalEmail = emailBody;
    
    // Replace placeholders with user inputs
    finalEmail = finalEmail.replace(/\[YOUR_NAME\]/g, yourName);
    finalEmail = finalEmail.replace(/\[YOUR_POSITION\]/g, yourPosition);
    finalEmail = finalEmail.replace(/\[YOUR_UNIVERSITY\]/g, yourUniversity);
    finalEmail = finalEmail.replace(/\[YOUR_RESEARCH\]/g, yourResearch);
    finalEmail = finalEmail.replace(/\[YOUR_BACKGROUND\]/g, yourBackground);
    finalEmail = finalEmail.replace(/\[YOUR_CONTACT\]/g, yourContact);
    finalEmail = finalEmail.replace(/\[SPECIFIC_RESEARCH\]/g, specificResearch);
    finalEmail = finalEmail.replace(/\[SPECIFIC_PAPER\]/g, specificPaper);
    finalEmail = finalEmail.replace(/\[COLLABORATION_PROPOSAL\]/g, collaborationProposal);
    finalEmail = finalEmail.replace(/\[MEETING_PURPOSE\]/g, meetingPurpose);
    finalEmail = finalEmail.replace(/\[YOUR_AVAILABILITY\]/g, yourAvailability);
    
    return finalEmail;
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSendEmail = () => {
    // Here you would normally connect to your email sending service
    toast({
      title: "Email Prepared",
      description: `Your email to Professor ${professor.name} is ready to send. You can now copy it to your email client.`,
    });
    
    if (onClose) {
      onClose();
    }
  };

  const handleCopyToClipboard = () => {
    const finalEmail = compileFinalEmail();
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${finalEmail}`);
    setIsCopied(true);
    
    toast({
      title: "Copied to Clipboard",
      description: "Email content has been copied to your clipboard.",
    });
    
    // Reset copy state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Professor {professor.name}</DialogTitle>
          <DialogDescription>
            Craft a personalized email to connect with Professor {professor.name} about research opportunities.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="compose">
              <Mail className="h-4 w-4 mr-2" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="customize">
              <Save className="h-4 w-4 mr-2" />
              Personalize
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview & Send
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="mt-0">
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-select" className="block mb-2">Email Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="template-select">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_TEMPLATES.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mb-4"
                />
              </div>
              
              <div>
                <Label htmlFor="email-body">Email Body</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Use placeholders like [YOUR_NAME], [YOUR_POSITION], etc. Personalize these in the next tab.
                </p>
              </div>
              
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('customize')}
                  className="w-full"
                >
                  Next: Personalize Your Email
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="your-name">Your Name</Label>
                  <Input
                    id="your-name"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <Label htmlFor="your-position">Your Position</Label>
                  <Input
                    id="your-position"
                    value={yourPosition}
                    onChange={(e) => setYourPosition(e.target.value)}
                    placeholder="PhD Student / Masters Student"
                  />
                </div>
                
                <div>
                  <Label htmlFor="your-university">Your University</Label>
                  <Input
                    id="your-university"
                    value={yourUniversity}
                    onChange={(e) => setYourUniversity(e.target.value)}
                    placeholder="University of Example"
                  />
                </div>
                
                <div>
                  <Label htmlFor="your-research">Your Research Focus</Label>
                  <Input
                    id="your-research"
                    value={yourResearch}
                    onChange={(e) => setYourResearch(e.target.value)}
                    placeholder="Machine Learning, Computer Vision, etc."
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="your-background">Your Background (Brief paragraph)</Label>
                <Textarea
                  id="your-background"
                  value={yourBackground}
                  onChange={(e) => setYourBackground(e.target.value)}
                  rows={3}
                  placeholder="I completed my Masters in [Field] with focus on [Topic]. I have published papers on [Publications] and have experience in [Skills/Experience]."
                />
              </div>
              
              <div>
                <Label htmlFor="your-contact">Your Contact Information</Label>
                <Input
                  id="your-contact"
                  value={yourContact}
                  onChange={(e) => setYourContact(e.target.value)}
                  placeholder="Email: you@example.com | Phone: +1 234 567 8900"
                />
              </div>
              
              <div>
                <Label htmlFor="specific-research">Professor's Specific Research You're Interested In</Label>
                <Input
                  id="specific-research"
                  value={specificResearch}
                  onChange={(e) => setSpecificResearch(e.target.value)}
                  placeholder="e.g., their recent publication on quantum computing"
                />
              </div>
              
              {selectedTemplate === 'collaboration' && (
                <>
                  <div>
                    <Label htmlFor="specific-paper">Specific Paper/Publication</Label>
                    <Input
                      id="specific-paper"
                      value={specificPaper}
                      onChange={(e) => setSpecificPaper(e.target.value)}
                      placeholder="e.g., 'Neural Networks in Quantum Computing (2023)'"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="collaboration-proposal">Collaboration Proposal</Label>
                    <Textarea
                      id="collaboration-proposal"
                      value={collaborationProposal}
                      onChange={(e) => setCollaborationProposal(e.target.value)}
                      rows={3}
                      placeholder="Describe your proposal for collaboration here..."
                    />
                  </div>
                </>
              )}
              
              {selectedTemplate === 'meeting' && (
                <>
                  <div>
                    <Label htmlFor="meeting-purpose">Meeting Purpose</Label>
                    <Input
                      id="meeting-purpose"
                      value={meetingPurpose}
                      onChange={(e) => setMeetingPurpose(e.target.value)}
                      placeholder="e.g., 'discussing potential research collaboration in quantum computing'"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="your-availability">Your Availability</Label>
                    <Input
                      id="your-availability"
                      value={yourAvailability}
                      onChange={(e) => setYourAvailability(e.target.value)}
                      placeholder="e.g., 'on Mondays and Wednesdays between 2-5pm EST'"
                    />
                  </div>
                </>
              )}
              
              <div className="pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('preview')}
                  className="w-full"
                >
                  Next: Preview & Send
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Email Preview</Label>
                <div className="rounded-md border p-4 bg-slate-50 dark:bg-slate-900">
                  <div className="mb-2"><strong>Subject:</strong> {subject}</div>
                  <div className="whitespace-pre-wrap font-mono text-sm">
                    {compileFinalEmail()}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Attachments</Label>
                {attachments.length > 0 ? (
                  <div className="space-y-2 mb-3">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-slate-50 dark:bg-slate-900">
                        <div className="flex items-center">
                          <File className="h-4 w-4 mr-2 text-slate-500" />
                          <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    No attachments added.
                  </p>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleTriggerFileInput}
                  className="mb-6"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Attachment
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {activeTab === 'preview' && (
            <Button 
              type="button" 
              onClick={handleCopyToClipboard}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          )}
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            
            {activeTab === 'preview' && (
              <Button 
                type="button" 
                onClick={handleSendEmail}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplate;
