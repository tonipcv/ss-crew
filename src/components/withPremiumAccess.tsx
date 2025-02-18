'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import supabaseClient from '@/src/lib/superbaseClient';
import PremiumModal from './PremiumModal';
import LoadingScreen from './LoadingScreen';
import { Navigation } from '@/src/app/components/Navigation';

interface PremiumAccessOptions {
  blurContent?: boolean;
  showModal?: boolean;
}

export function withPremiumAccess<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: PremiumAccessOptions = {}
) {
  const { blurContent = true, showModal = true } = options;

  return function WithPremiumCheck(props: P) {
    const [isPremium, setIsPremium] = useState<boolean | null>(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      checkPremiumStatus();
    }, []);

    const checkPremiumStatus = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('is_premium')
          .eq('id', user.id)
          .single();

        setIsPremium(profile?.is_premium || false);
        if (!profile?.is_premium) {
          setShowPremiumModal(true);
        }
      } catch (error) {
        console.error('Erro ao verificar status premium:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <div className="min-h-screen bg-[#111] text-gray-200">
        <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center">
              <Image src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
            </Link>
          </div>
        </header>

        <div className={blurContent && !isPremium ? 'filter blur-[4px]' : ''}>
          <main className="pt-14 pb-24">
            <WrappedComponent {...props} />
          </main>
        </div>

        <Navigation />

        {showModal && showPremiumModal && !isPremium && (
          <PremiumModal onClose={() => setShowPremiumModal(false)} />
        )}
      </div>
    );
  };
} 