
import React, { useState } from 'react';
import ProposalCover from './ProposalCover';
import Spinner from './Spinner';
import { CopyIcon, CheckIcon, LightbulbIcon, WarningIcon, UpSellIcon, CaseIcon } from './icons';

interface OutputPanelProps {
  proposal: string | null;
  summary: string | null;
  suggestions: string | null;
  isLoading: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ proposal, summary, suggestions, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isSummaryUppercase, setIsSummaryUppercase] = useState(false);

  const displayedProposal = isUppercase ? proposal?.toUpperCase() : proposal;
  const displayedSummary = isSummaryUppercase ? summary?.toUpperCase() : summary;

  const handleCopy = () => {
    if (displayedProposal) {
      navigator.clipboard.writeText(displayedProposal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSummaryCopy = () => {
    if (displayedSummary) {
      navigator.clipboard.writeText(displayedSummary);
      setSummaryCopied(true);
      setTimeout(() => setSummaryCopied(false), 2000);
    }
  };
  
  const parseSuggestions = (text: string | null) => {
    if (!text) return [];

    // The AI returns a string with bullet points separated by newlines.
    // e.g., "* **Pontos a Esclarecer:** ...\n* **Informações Faltantes:** ..."
    const lines = text.split('\n').map(s => s.trim()).filter(Boolean);

    return lines.map(line => {
        // Remove the leading markdown bullet '*'
        const section = line.replace(/^\*\s*/, '');

        const title1 = 'Pontos a Esclarecer:';
        const boldTitle1 = `**${title1}**`;
        if (section.startsWith(boldTitle1)) {
            return {
                icon: <WarningIcon className="h-6 w-6 text-yellow-500" />,
                title: 'Pontos a Esclarecer',
                content: section.replace(boldTitle1, '').trim()
            };
        }
        
        const title2 = 'Informações Faltantes:';
        const boldTitle2 = `**${title2}**`;
        if (section.startsWith(boldTitle2)) {
            return {
                icon: <LightbulbIcon className="h-6 w-6 text-blue-500" />,
                title: 'Informações Faltantes',
                content: section.replace(boldTitle2, '').trim()
            };
        }

        const title3 = 'Serviços Complementares (Upsell):';
        const boldTitle3 = `**${title3}**`;
        if (section.startsWith(boldTitle3)) {
            return {
                icon: <UpSellIcon className="h-6 w-6 text-green-500" />,
                title: 'Serviços Complementares (Upsell)',
                content: section.replace(boldTitle3, '').trim()
            };
        }
        return null;
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }

  const suggestionItems = parseSuggestions(suggestions);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg min-h-[500px] flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-4 text-lg text-[#102A43]">Analisando e construindo a proposta...</p>
      </div>
    );
  }

  if (!proposal) {
    return <ProposalCover />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#102A43]">Proposta Gerada</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsUppercase(!isUppercase)}
            className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355088] transition"
            title={isUppercase ? "Manter texto original" : "Converter para maiúsculas"}
          >
            <CaseIcon className="h-5 w-5 text-gray-500 mr-2" />
            {isUppercase ? 'Original' : 'Maiúsculas'}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355088] transition"
          >
            {copied ? (
              <>
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <CopyIcon className="h-5 w-5 text-gray-500 mr-2" />
                Copiar Texto
              </>
            )}
          </button>
        </div>
      </div>
      <div className="prose prose-sm max-w-none p-4 border border-gray-200 rounded-md bg-gray-50 whitespace-pre-wrap font-sans">
        {displayedProposal}
      </div>

      {summary && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-[#102A43]">Proposta Gerada Resumida</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSummaryUppercase(!isSummaryUppercase)}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355088] transition"
                title={isSummaryUppercase ? "Manter texto original" : "Converter para maiúsculas"}
              >
                <CaseIcon className="h-5 w-5 text-gray-500 mr-2" />
                {isSummaryUppercase ? 'Original' : 'Maiúsculas'}
              </button>
              <button
                onClick={handleSummaryCopy}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355088] transition"
              >
                {summaryCopied ? (
                  <>
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-5 w-5 text-gray-500 mr-2" />
                    Copiar Resumo
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="prose prose-sm max-w-none p-4 border border-gray-200 rounded-md bg-gray-50 whitespace-pre-wrap font-sans">
            {displayedSummary}
          </div>
        </div>
      )}

      {suggestionItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#102A43] mb-3">Sugestões Finais</h3>
          <div className="space-y-4">
            {suggestionItems.map((item, index) => item && (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">{item.icon}</div>
                  <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{item.content}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;