import React, { useState } from 'react';
import { User, Briefcase, Building, FileText, Mail, Phone, Trophy, Target, Globe, Palette, Citrus as Industry } from 'lucide-react';
import { FormData } from '../types';

interface CoverLetterFormProps {
  onGenerate: (data: FormData) => void;
  isLoading: boolean;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    achievements: '',
    company: '',
    position: '',
    jobDescription: '',
    companyWebsite: '',
    tone: 'formal',
    industry: 'general'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isFormValid = formData.name && formData.skills && formData.experience && 
                     formData.company && formData.position && formData.jobDescription;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-blue-500" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="John Smith"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Job Information */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Target Position
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-2 text-green-500" />
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Microsoft"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-2 text-green-500" />
              Position/Role *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Senior Software Engineer"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 mr-2 text-green-500" />
            Company Website (Optional)
          </label>
          <input
            type="url"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="https://company.com"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2 text-green-500" />
            Job Description *
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Paste the complete job description here. This will be used for deep analysis and ATS optimization..."
            required
          />
        </div>
      </div>

      {/* Professional Background */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Professional Background
        </h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2 text-purple-500" />
              Skills & Technologies *
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="React, TypeScript, Node.js, Python, AWS, Docker, Agile, Leadership..."
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
              Work Experience *
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="5 years as a full-stack developer at TechCorp, leading a team of 3 developers. Previously worked at StartupXYZ as a junior developer..."
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Trophy className="w-4 h-4 mr-2 text-purple-500" />
              Key Achievements & Metrics
            </label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Increased system performance by 40%, led migration that saved $100K annually, mentored 5 junior developers, reduced deployment time from 2 hours to 15 minutes..."
            />
          </div>
        </div>
      </div>

      {/* Customization Options */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Customization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 mr-2 text-amber-500" />
              Tone
            </label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            >
              <option value="formal">Formal & Professional</option>
              <option value="enthusiastic">Enthusiastic & Energetic</option>
              <option value="concise">Concise & Direct</option>
              <option value="storytelling">Storytelling & Personal</option>
            </select>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Industry className="w-4 h-4 mr-2 text-amber-500" />
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            >
              <option value="general">General</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance & Banking</option>
              <option value="creative">Creative & Design</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Analyzing & Generating...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5 mr-2" />
            Generate AI-Powered Cover Letter
          </>
        )}
      </button>
    </form>
  );
};

export default CoverLetterForm;