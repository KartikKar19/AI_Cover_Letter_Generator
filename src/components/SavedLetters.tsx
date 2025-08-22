import React, { useState, useEffect } from 'react';
import { Save, Trash2, Eye, Calendar, Building, Briefcase } from 'lucide-react';
import { SavedLetter } from '../types';

interface SavedLettersProps {
  onLoadLetter: (letter: SavedLetter) => void;
}

const SavedLetters: React.FC<SavedLettersProps> = ({ onLoadLetter }) => {
  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCoverLetters');
    if (saved) {
      setSavedLetters(JSON.parse(saved));
    }
  }, []);

  const deleteLetter = (id: string) => {
    const updated = savedLetters.filter(letter => letter.id !== id);
    setSavedLetters(updated);
    localStorage.setItem('savedCoverLetters', JSON.stringify(updated));
  };

  if (savedLetters.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
        <Save className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Saved Letters</h3>
        <p className="text-gray-500">Your saved cover letters will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Save className="w-5 h-5 mr-2 text-blue-500" />
        Saved Cover Letters ({savedLetters.length})
      </h2>
      
      <div className="space-y-4">
        {savedLetters.map((letter) => (
          <div key={letter.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{letter.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {letter.company}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {letter.position}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(letter.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Fit: {letter.analysis.fitScore}%
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    ATS: {letter.analysis.relevanceScore}%
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onLoadLetter(letter)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="View Letter"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteLetter(letter.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete Letter"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLetters;