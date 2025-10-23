import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { generateProposal } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);
  const [summarizedProposal, setSummarizedProposal] = useState<string | null>(null);
  const [finalSuggestions, setFinalSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Por favor, insira uma descrição do serviço.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedProposal(null);
    setSummarizedProposal(null);
    setFinalSuggestions(null);

    try {
      const result = await generateProposal(userInput);
      setGeneratedProposal(result.proposal);
      setSummarizedProposal(result.summary);
      setFinalSuggestions(result.suggestions);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      setError(`Ocorreu um erro ao gerar a proposta: ${errorMessage} Por favor, tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#102A43]">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InputPanel
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            error={error}
            clearError={() => setError(null)}
          />
          <OutputPanel
            proposal={generatedProposal}
            summary={summarizedProposal}
            suggestions={finalSuggestions}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
