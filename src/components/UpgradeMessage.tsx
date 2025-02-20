import Link from 'next/link';

export default function UpgradeMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <p className="text-zinc-400 mb-4">Versão gratuita. Acesso limitado</p>
      <Link 
        href="/informacao"
        className="text-xs px-3 py-1.5 text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        Fazer Upgrade
      </Link>
    </div>
  );
} 