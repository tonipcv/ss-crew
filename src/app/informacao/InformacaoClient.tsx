'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '../components/OptimizedImage';
import { PandaPlayer } from '../components/PandaPlayer';
import { Navigation } from '../components/Navigation';
import { PricingSection } from '@/components/pricing/PricingSection';

export default function InformacaoClient() {
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPricing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          
          {/* Botão de Assistir Treinamento - Agora redirecionando para /series-restrito */}
          <Link 
            href="/series-restrito"
            className="text-xs px-3 py-1.5 text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Assistir Treinamento
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black rounded-lg overflow-hidden mb-8">
            <PandaPlayer videoId="6a82bc71-be86-4d83-be38-99cf230e7298" />
          </div>

          {/* Mensagem que desaparece quando os planos aparecem */}
          {!showPricing && (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 text-center mb-16">
              <div className="flex items-center justify-center mb-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-400 border-t-transparent"></div>
              </div>
              <p className="text-gray-400 text-sm">
                Assista o vídeo para ter acesso ao grupo exclusivo
              </p>
            </div>
          )}

          {/* Seção de Planos - Aparece após o timer */}
          {showPricing && <PricingSection />}
        </div>
      </main>

      <Navigation />
    </div>
  );
} 