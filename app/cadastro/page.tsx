'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="w-full px-4 bg-[#FEFEFF] h-16 flex items-center">
        <Header />
      </div>

      {/* Conteúdo principal */}
      <div className="bg-white mt-24 mx-auto p-10 rounded-2xl shadow-lg w-full max-w-[800px] min-h-[500px]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={150}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-[20px] font-extrabold text-center text-[#111111] leading-[26px] mb-10">
          Criação de conta
        </h1>

        {/* Nome */}
        <label className="block text-[16px] font-bold text-[#111111] mb-2">
          Nome
        </label>
        <input
          type="text"
          placeholder="Insira seu nome"
          className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
        />

        {/* Sobrenome */}
        <label className="block text-[16px] font-bold text-[#111111] mb-2">
          Sobrenome
        </label>
        <input
          type="text"
          placeholder="Insira seu sobrenome"
          className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
        />

        {/* CPF e Data de nascimento - lado a lado */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[16px] font-bold text-[#111111] mb-2">
              CPF
            </label>
            <input
              type="text"
              placeholder="Insira seu CPF"
              className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[16px] font-bold text-[#111111] mb-2">
              Data de nascimento
            </label>
            <input
              type="date"
              className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
            />
          </div>
        </div>

        {/* Email e Confirmar Email - lado a lado */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[16px] font-bold text-[#111111] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Insira seu email"
              className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[16px] font-bold text-[#111111] mb-2">
              Confirmar email
            </label>
            <input
              type="email"
              placeholder="Confirme seu email"
              className="w-full h-12 px-4 mb-4 rounded-lg border border-[#E4E4E7] bg-white text-[16px]"
            />
          </div>
        </div>

        {/* Botão Criar Conta */}
        <button
          className="bg-[#0047BB] h-14 w-full rounded-lg text-white font-semibold text-[18px] mt-4"
          onClick={() => alert('Conta criada!')}
        >
          Criar conta
        </button>

        {/* Link para login */}
        <div className="flex justify-center mt-6">
          <span className="text-[16px] text-[#111111] font-medium">Já tem conta? </span>
          <button
            className="text-[16px] font-semibold text-[#00358C] ml-1"
            onClick={() => router.push('../login')}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
