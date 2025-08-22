import React, { useState } from 'react';
import { Copy, Check, Download, Edit3, BarChart3, Target, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { CoverLetterAnalysis } from '../types';

interface CoverLetterDisplayProps {
  coverLetter: string;
  analysis: CoverLetterAnalysis | null;
  onEdit?: (newContent: string) => void;
}

const CoverLetterDisplay: React.FC<CoverLetterDisplayProps> = ({ coverLetter, analysis, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(coverLetter);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(coverLetter);
    setIsEditing(false);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Analysis Dashboard */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Project/Work Suggestion Section */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Project/Work to Improve Your Chances
              </h3>
              <p className="text-sm text-yellow-900">{analysis.suggestions[0]}</p>
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Cover Letter Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getScoreColor(analysis.fitScore)}`}>
                {analysis.fitScore}%
              </div>
              <div className="text-sm text-gray-600">Job Fit Score</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getScoreColor(analysis.relevanceScore)}`}>
                {analysis.relevanceScore}%
              </div>
              <div className="text-sm text-gray-600">ATS Relevance</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-3xl font-bold mb-1 text-purple-600">
                {analysis.atsKeywords.length}
              </div>
              <div className="text-sm text-gray-600">ATS Keywords</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Strengths ({analysis.strengths.length})
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-amber-700 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Areas to Address ({analysis.gaps.length})
              </h3>
              <ul className="space-y-2">
                {analysis.gaps.map((gap, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.atsKeywords.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-blue-700 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                ATS Keywords Included
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.atsKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-purple-700 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Improvement Suggestions
              </h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Cover Letter Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Generated Cover Letter</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm resize-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
                {coverLetter}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterDisplay;