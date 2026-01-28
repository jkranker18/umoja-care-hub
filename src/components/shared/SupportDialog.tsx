import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSupportCases } from '@/hooks/useSupportCases';
import { Loader2, CheckCircle } from 'lucide-react';

interface SubjectOption {
  value: string;
  label: string;
}

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectOptions: SubjectOption[];
  portalContext: string;
}

export function SupportDialog({
  open,
  onOpenChange,
  subjectOptions,
  portalContext,
}: SupportDialogProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  
  const { addCase } = useSupportCases();

  const handleSubmit = async () => {
    if (!subject || !message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const selectedOption = subjectOptions.find(opt => opt.value === subject);
    const generatedCaseNumber = `CASE-${Date.now().toString().slice(-6)}`;
    
    addCase({
      caseNumber: generatedCaseNumber,
      subject: `[${portalContext}] ${selectedOption?.label || subject}`,
      message: message.trim(),
    });
    
    setCaseNumber(generatedCaseNumber);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setIsSubmitted(false);
      setCaseNumber('');
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Contact Support</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject" className="bg-background">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {subjectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!subject || !message.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Case Submitted</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your support request has been received.
              </p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Case Number</p>
              <p className="font-mono font-semibold">{caseNumber}</p>
            </div>
            <Button onClick={handleClose} className="mt-2">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
