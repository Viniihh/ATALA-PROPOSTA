
import React from 'react';

const AtalaLogo: React.FC = () => (
    <div className="relative text-center opacity-20">
        <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto" fill="#D1D5DB" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0 L0 150 L40 150 L100 40 L160 150 L200 150 Z" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-center items-center mt-8">
            <p style={{fontFamily: "'Teko', sans-serif"}} className="text-7xl tracking-widest text-gray-300">ATALA</p>
            <p className="text-lg text-gray-300 -mt-2">Serviços Residenciais & Prediais</p>
        </div>
    </div>
);

const ProposalCover: React.FC = () => {
  return (
    <div className="bg-[#355088] p-8 rounded-lg shadow-lg text-white relative overflow-hidden min-h-[500px] flex flex-col justify-between">
      {/* Decorative Circles */}
      <div className="absolute -top-16 -left-16 w-48 h-48 border-[20px] border-white/20 rounded-full"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 border-[25px] border-white/20 rounded-full">
         <div className="absolute inset-[25px] border-[25px] border-[#355088] rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <h1 style={{fontFamily: "'Teko', sans-serif"}} className="text-7xl md:text-8xl font-bold leading-none">PROPOSTA<br/>COMERCIAL</h1>
        <p className="mt-2 text-xl tracking-wider">ATALA SERVIÇOS GERAIS LTDA</p>
      </div>

      <div className="relative z-10 flex justify-center items-center">
        <AtalaLogo />
      </div>

      <div className="relative z-10 text-left">
        <p className="font-bold text-lg leading-tight">MAIS DE 40 ANOS<br/>GARANTINDO QUALIDADE EM<br/>CADA SERVIÇO.</p>
      </div>
    </div>
  );
};

export default ProposalCover;
