'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="w-full px-4 bg-[#FEFEFF] h-16 flex items-center shadow-sm">
        <Header />
      </div>

      {/* Conteúdo principal centralizado */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white mx-4 p-10 rounded-xl shadow-md w-full max-w-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Título */}
          <h1 className="text-[20px] font-extrabold text-center text-[#111111] leading-[26px] mb-10">
            Entrar no Cidadão Connect
          </h1>

          {/* Campo de email */}
          <label className="block text-[18px] font-bold text-[#111111] mb-3">
            Email
          </label>
          <input
            type="email"
            placeholder="Insira seu email"
            className="w-full h-14 px-6 rounded-lg border border-[#E4E4E7] bg-white text-[#111111] text-[16px] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#0047BB]/30"
          />

          {/* Botão Próximo */}
          <button
            className="bg-[#0047BB] h-16 w-full rounded-lg flex justify-center items-center mt-6 text-white font-semibold text-[18px] shadow hover:bg-[#00358C] transition"
            onClick={() => router.push('../verification')}
          >
            Próximo
          </button>

          {/* Criar conta */}
          <div className="flex justify-center mt-6">
            <span className="text-[18px] text-[#111111] font-bold">Não tem conta? </span>
            <button
              className="text-[18px] font-semibold text-[#00358C] ml-1"
              onClick={() => router.push('../cadastro')}
            >
              Criar conta
            </button>
          </div>

          {/* Separador */}
          <div className="flex items-center mt-10">
            <div className="flex-1 h-px bg-[#5C5C5C38]" />
            <span className="mx-4 text-lg text-[#5C5C5C]">ou</span>
            <div className="flex-1 h-px bg-[#5C5C5C38]" />
          </div>

          {/* Login com Google */}
          <button className="flex items-center justify-center h-16 w-full rounded-lg bg-white shadow-md mt-6 mb-2 border border-[#E4E4E7]">
            <Image
              src="/images/google.png"
              alt="Google Logo"
              width={22}
              height={22}
              className="object-contain mr-2"
            />
            <span className="text-[16px] text-[#0000008A]">Login com Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
