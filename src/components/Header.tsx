import React from 'react';
import { FileText, Sparkles, Brain, Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <div className="flex items-center ml-4 space-x-2">
          <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          <Target className="w-6 h-6 text-green-600 animate-pulse" />
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
        AI Cover Letter Generator
      </h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-xl text-gray-600 mb-4 leading-relaxed">
          Because I can't write a personalized cover letter for every company—when a million companies come to campus, let AI do it for me and you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Deep Job Analysis</h3>
            <p className="text-sm text-gray-600">AI analyzes job descriptions to match your experience perfectly</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">ATS Optimization</h3>
            <p className="text-sm text-gray-600">Optimized for Applicant Tracking Systems with keyword analysis</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Smart Customization</h3>
            <p className="text-sm text-gray-600">Tailored tone and industry-specific language for maximum impact</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;