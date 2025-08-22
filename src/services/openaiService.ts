import { FormData, CoverLetterAnalysis } from '../types';

interface CoverLetterResponse {
  coverLetter: string;
  analysis: CoverLetterAnalysis;
}

export const generateCoverLetter = async (data: FormData): Promise<CoverLetterResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `You are an expert career counselor and cover letter writer. Create a highly personalized, ATS-optimized cover letter and provide detailed analysis.\n\nCANDIDATE INFORMATION:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSkills: ${data.skills}\nExperience: ${data.experience}\nAchievements: ${data.achievements}\n\nTARGET POSITION:\nCompany: ${data.company}\nPosition: ${data.position}\nJob Description: ${data.jobDescription}\nCompany Website: ${data.companyWebsite || 'Not provided'}\n\nCUSTOMIZATION:\nTone: ${data.tone}\nIndustry: ${data.industry}\n\nREQUIREMENTS:\n1. Write a compelling cover letter that:\n   - Matches the specified tone (${data.tone})\n   - Uses industry-appropriate language for ${data.industry}\n   - Incorporates specific keywords from the job description\n   - Highlights quantifiable achievements and metrics\n   - Addresses potential gaps diplomatically\n   - Shows deep understanding of the company and role\n   - Stands out from generic AI-generated letters\n\n2. Provide analysis including:\n   - Job fit score (0-100)\n   - Relevance score for ATS (0-100)\n   - List of strengths that align with the job\n   - Potential gaps or areas to address\n   - ATS keywords successfully incorporated\n   - Specific improvement suggestions\n\nReturn your response as a JSON object with this exact structure:\n{\n  "coverLetter": "The complete cover letter text",\n  "analysis": {\n    "fitScore": 85,\n    "relevanceScore": 92,\n    "strengths": ["strength1", "strength2"],\n    "gaps": ["gap1", "gap2"],\n    "atsKeywords": ["keyword1", "keyword2"],\n    "suggestions": ["suggestion1", "suggestion2"]\n  }\n}\n\nMake the cover letter authentic, specific, and compelling. Avoid generic phrases and ensure it feels personally written.`;

  try {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content received from Gemini');
    }

    try {
      const parsedResponse = JSON.parse(content);
      return {
        coverLetter: parsedResponse.coverLetter,
        analysis: parsedResponse.analysis
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        coverLetter: content,
        analysis: {
          fitScore: 75,
          relevanceScore: 70,
          strengths: ['Experience matches job requirements', 'Strong technical skills'],
          gaps: ['Consider highlighting more specific achievements'],
          atsKeywords: ['leadership', 'experience', 'skills'],
          suggestions: ['Add more quantifiable metrics', 'Strengthen opening paragraph']
        }
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate cover letter: ${error.message}`);
    }
    throw new Error('Failed to generate cover letter: Unknown error occurred');
  }
};