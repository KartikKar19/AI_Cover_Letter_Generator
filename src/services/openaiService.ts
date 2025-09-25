// Utility to extract skills from a string (comma or semicolon separated)
function extractSkills(skillsString: string): string[] {
  return skillsString
    .split(/[,;\n]/)
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

// Calculate fit score based on overlap between candidate and job description skills
export function calculateFitScore(candidateSkills: string, jobDescription: string): number {
  const candidateList = extractSkills(candidateSkills);
  // Extract words that look like skills from job description (simple approach)
  const jobSkills = jobDescription.match(/\b[a-zA-Z][a-zA-Z0-9\-+. ]{1,}\b/g) || [];
  const jobList = jobSkills.map(s => s.trim().toLowerCase());
  if (candidateList.length === 0 || jobList.length === 0) return 0;
  const matchCount = candidateList.filter(skill => jobList.includes(skill)).length;
  // Fit score as percent of candidate skills found in job description
  return Math.round((matchCount / candidateList.length) * 100);
}
import { FormData, CoverLetterAnalysis } from '../types';

interface CoverLetterResponse {
  coverLetter: string;
  analysis: CoverLetterAnalysis;
}

export const generateCoverLetter = async (data: FormData): Promise<CoverLetterResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const fitScore = calculateFitScore(data.skills, data.jobDescription);

  // Prompt for cover letter
  const prompt = `You are an expert career counselor and cover letter writer. Create a highly personalized, ATS-optimized cover letter for the candidate below. Only return the cover letter text, do not include any JSON, analysis, or extra commentary.\n\nCANDIDATE INFORMATION:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSkills: ${data.skills}\nExperience: ${data.experience}\nAchievements: ${data.achievements}\n\nTARGET POSITION:\nCompany: ${data.company}\nPosition: ${data.position}\nJob Description: ${data.jobDescription}\nCompany Website: ${data.companyWebsite || 'Not provided'}\n\nCUSTOMIZATION:\nTone: ${data.tone}\nIndustry: ${data.industry}\n\nREQUIREMENTS:\n- Write a compelling cover letter that matches the specified tone and industry, incorporates keywords from the job description, highlights quantifiable achievements, addresses potential gaps diplomatically, and shows understanding of the company and role.\n- Make the cover letter authentic, specific, and compelling. Avoid generic phrases and ensure it feels personally written.\n- Do NOT include any JSON, analysis, or extra commentary. Only output the cover letter text.`;

  // Prompt for project/work suggestion
  const suggestionPrompt = `You are an expert career counselor. Based on the following candidate profile and job description, suggest a specific project or type of work the candidate can do to improve their chances of getting this job and make themselves more valuable for this role. Be concrete and actionable.\n\nCANDIDATE SKILLS: ${data.skills}\nCANDIDATE EXPERIENCE: ${data.experience}\nJOB DESCRIPTION: ${data.jobDescription}`;
 
  try {
    // Get cover letter
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

    // Get project/work suggestion from LLM
    let suggestion = '';
    try {
      const suggestionRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: suggestionPrompt }
              ]
            }
          ]
        }),
      });
      if (suggestionRes.ok) {
        const suggestionResult = await suggestionRes.json();
        suggestion = suggestionResult.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
    } catch {
      suggestion = '';
    }

    return {
      coverLetter: content,
      analysis: {
        fitScore,
        relevanceScore: 0,
        strengths: [],
        gaps: [],
        atsKeywords: [],
        suggestions: [suggestion]
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate cover letter: ${error.message}`);
    }
    throw new Error('Failed to generate cover letter: Unknown error occurred');
  }
};