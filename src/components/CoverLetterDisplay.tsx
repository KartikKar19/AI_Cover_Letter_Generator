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
  {/* No analysis dashboard, only suggestions below cover letter */}

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

      {/* Suggestions Section Below Cover Letter */}
      {analysis && analysis.suggestions && analysis.suggestions[0] && (
        <div className="bg-yellow-50 rounded-xl shadow-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            How to Improve Your Chances
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {analysis.suggestions[0]
              .replace(/\bthey\b/gi, 'you')
              .replace(/\btheir\b/gi, 'your')
              .split(/\n|\r|\r\n|\*/)
              .filter(line => line.trim())
              .map((line, idx) => (
                <li key={idx} className="text-sm text-yellow-900" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoverLetterDisplay;