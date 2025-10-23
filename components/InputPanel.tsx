import React from 'react';
import { LightbulbIcon } from './icons';

interface InputPanelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ value, onChange, onSubmit, isLoading, error, clearError }) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) {
      clearError();
    }
    onChange(e);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
      <label htmlFor="service-description" className="text-xl font-bold text-[#102A43] mb-4">
        Descreva o Serviço
      </label>
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md mb-4 flex items-start">
        <LightbulbIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
        <p className="text-sm">
          Forneça o máximo de detalhes possível, como tipo de serviço, local, materiais e escopo, para gerar uma proposta mais precisa.
        </p>
      </div>

      <textarea
        id="service-description"
        className="w-full flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#355088] focus:border-[#355088] transition duration-200 resize-none"
        rows={15}
        placeholder="Ex: Serviço de pintura para o apartamento 102, incluindo 2 quartos, sala e cozinha. Preparação da superfície, aplicação de tinta branca fosca e limpeza final..."
        value={value}
        onChange={handleTextAreaChange}
      />
      
      {error && (
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert">
            <strong className="font-bold">Atenção: </strong>
            <span className="block sm:inline whitespace-pre-wrap">{error}</span>
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full mt-4 bg-[#355088] text-white font-bold py-3 px-4 rounded-md hover:bg-[#283d66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355088] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
          </>
        ) : (
          'Gerar Proposta'
        )}
      </button>
    </div>
  );
};

export default InputPanel;
