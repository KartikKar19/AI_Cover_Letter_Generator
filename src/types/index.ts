export interface FormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  achievements: string;
  company: string;
  position: string;
  jobDescription: string;
  companyWebsite?: string;
  tone: 'formal' | 'enthusiastic' | 'concise' | 'storytelling';
  industry: 'tech' | 'finance' | 'creative' | 'healthcare' | 'general';
}

export interface CoverLetterAnalysis {
  fitScore: number;
  strengths: string[];
  gaps: string[];
  atsKeywords: string[];
  suggestions: string[];
  relevanceScore: number;
}

export interface SavedLetter {
  id: string;
  title: string;
  content: string;
  company: string;
  position: string;
  createdAt: Date;
  analysis: CoverLetterAnalysis;
}