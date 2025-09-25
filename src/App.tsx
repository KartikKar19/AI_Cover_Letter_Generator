import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react'; // Only used icons are imported
import Header from './components/Header';
import CoverLetterForm from './components/CoverLetterForm';
import CoverLetterDisplay from './components/CoverLetterDisplay';
import SavedLetters from './components/SavedLetters';
import ErrorMessage from './components/ErrorMessage';
import { generateCoverLetter } from './services/openaiService';
import { FormData, CoverLetterAnalysis, SavedLetter } from './types';

function App() {
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [analysis, setAnalysis] = useState<CoverLetterAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'generate' | 'saved'>('generate');
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);
    setError('');
    setCurrentFormData(formData);
    
    try {
      const result = await generateCoverLetter(formData);
      setCoverLetter(result.coverLetter);
      setAnalysis(result.analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCoverLetter = (newContent: string) => {
    setCoverLetter(newContent);
  };

  const handleSaveLetter = () => {
    if (!coverLetter || !analysis || !currentFormData) return;

    const savedLetter: SavedLetter = {
      id: Date.now().toString(),
      title: `${currentFormData.company} - ${currentFormData.position}`,
      content: coverLetter,
      company: currentFormData.company,
      position: currentFormData.position,
      createdAt: new Date(),
      analysis: analysis
    };

    const existing = JSON.parse(localStorage.getItem('savedCoverLetters') || '[]');
    const updated = [savedLetter, ...existing];
    localStorage.setItem('savedCoverLetters', JSON.stringify(updated));
    
    alert('Cover letter saved successfully!');
  };

  const handleLoadLetter = (letter: SavedLetter) => {
    setCoverLetter(letter.content);
    setAnalysis(letter.analysis);
    setActiveTab('generate');
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <Header />
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'generate'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Generate Letter
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'saved'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Saved Letters
            </button>
          </div>
        </div>

        {activeTab === 'generate' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-fit">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Information</h2>
              <CoverLetterForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
            
            <div className="space-y-6">
              {error && (
                <ErrorMessage message={error} onClose={handleCloseError} />
              )}
              
              {coverLetter && analysis && (
                <>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveLetter}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Letter
                    </button>
                  </div>
                  <CoverLetterDisplay 
                    coverLetter={coverLetter} 
                    analysis={analysis}
                    onEdit={handleEditCoverLetter}
                  />
                </>
              )}
              
              {!coverLetter && !isLoading && (
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
                  <div className="text-gray-400 mb-4">
                    <FileText className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Ready to Generate Your AI-Powered Cover Letter
                  </h3>
                  <p className="text-gray-500">
                    Fill in your information and job details to create a personalized, ATS-optimized cover letter with detailed analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <SavedLetters onLoadLetter={handleLoadLetter} />
        )}
        
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Created by Kartik Kar 2025 with love. &copy; All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;