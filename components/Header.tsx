'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-1">
      {/* Menu à esquerda */}
      <nav className="flex space-x-8 text-[16px] font-medium text-[#111111]">
        <button onClick={() => router.push('/')} className="hover:text-[#0047BB]">
          Início
        </button>
        <button onClick={() => router.push('/sobre')} className="hover:text-[#0047BB]">
          Sobre
        </button>
        <button onClick={() => router.push('/precos')} className="hover:text-[#0047BB]">
          Preços
        </button>
      </nav>

      {/* Logo no centro */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src="/images/Logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>

      {/* Botões à direita */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.push('/login')}
          className="text-[#0047BB] font-semibold text-[16px] hover:underline"
        >
          Entrar
        </button>
        <button
          onClick={() => router.push('/cadastro')}
          className="bg-[#0047BB] text-white text-[16px] font-semibold px-4 py-2 rounded-lg hover:bg-[#00358C]"
        >
          Criar conta
        </button>
      </div>
    </header>
  );
}