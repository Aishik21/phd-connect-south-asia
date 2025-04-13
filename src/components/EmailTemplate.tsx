
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Paperclip, 
  Send,
  Eye,
  File
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Professor } from './ProfessorCard';

type EmailTemplateProps = {
  professor: Professor;
  isOpen?: boolean;
  onClose?: () => void;
};

const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  professor,
  isOpen,
  onClose
}) => {
  const [subject, setSubject] = useState(`Research Inquiry: ${professor.researchInterests[0] || 'PhD Opportunities'}`);
  const [emailBody, setEmailBody] = useState(
    `Dear Professor ${professor.name},\n\nI hope this email finds you well. My name is [Your Name], and I am a prospective PhD student interested in pursuing research in ${professor.researchInterests.join(', ')}.\n\nI am writing to inquire about potential PhD opportunities in your research group at ${professor.university}. I was particularly interested in your work on [specific research topic or paper] and would like to know if you are currently accepting PhD students.\n\n[Include brief paragraph about your background and qualifications]\n\nI have attached my CV and research statement for your reference. I would greatly appreciate the opportunity to discuss potential research directions and how my interests align with your work.\n\nThank you for your time and consideration. I look forward to hearing from you.\n\nSincerely,\n[Your Name]\n[Your Contact Information]`
  );
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      title: "Email Scheduled",
      description: `Your email to Professor ${professor.name} has been prepared.`,
    });
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Email Professor {professor.name}</DialogTitle>
          <DialogDescription>
            Customize the template below to contact the professor about research opportunities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="email-body">Email Body</Label>
            <Textarea
              id="email-body"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={showPreview ? 3 : 12}
              className="font-mono text-sm"
            />
          </div>
          
          {showPreview && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <h3 className="text-sm font-medium mb-2">Preview:</h3>
              <div className="whitespace-pre-wrap text-sm">
                {emailBody}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <Label className="mb-2 block">Attachments</Label>
            {attachments.length > 0 ? (
              <div className="space-y-2 mb-3">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
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
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Add Attachment
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSendEmail}
              className="bg-academic-600 hover:bg-academic-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplate;
