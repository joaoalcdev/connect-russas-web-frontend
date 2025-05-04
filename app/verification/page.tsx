'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '../../components/Header';

export default function Verification() {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="w-full bg-white h-16 px-4 flex items-center shadow-sm">
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

          {/* Texto de instrução */}
          <p className="text-[18px] text-center text-[#111111] leading-[26px] mb-10">
            Enviamos um <span className="font-bold">código de 6 dígitos</span> para<br />
            co******@gmail.com ou (88) 9.****-8888
          </p>

          {/* Campos de código */}
          <div className="flex justify-between gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => {
                  inputsRef.current[index] = ref;
                }}
                maxLength={1}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className={`w-14 h-16 rounded-lg text-center text-[20px] font-bold bg-white shadow-sm focus:outline-none ${digit
                    ? 'border-2 border-[#0047BB] text-[#0047BB]'
                    : 'border border-[#D4D4D8] text-[#111111]'
                  }`}
              />
            ))}
          </div>

          {/* Dica de SPAM */}
          <p className="text-center text-[16px] text-[#111111] leading-[24px] mb-6">
            Não recebeu? Verifique a <span className="font-semibold">caixa de SPAM</span>.
          </p>

          {/* Botão reenviar */}
          <button
            onClick={() => console.log('Código reenviado')}
            className="text-[18px] text-[#0047BB] font-semibold text-center w-full mb-8"
          >
            Reenviar código
          </button>

          {/* Botão confirmar */}
          <button
            disabled={!code.every((digit) => digit.trim() !== '')}
            onClick={() => console.log('Código confirmado')}
            className={`h-16 w-full rounded-lg flex justify-center items-center transition ${code.every((digit) => digit.trim() !== '')
                ? 'bg-[#0047BB]'
                : 'bg-slate-50'
              }`}
          >
            <span
              className={`text-[18px] font-semibold ${code.every((digit) => digit.trim() !== '') ? 'text-white' : 'text-[#A1A1AA]'
                }`}
            >
              Confirmar código e entrar
            </span>
          </button>

          {/* Botão voltar */}
          <button
            onClick={() => router.back()}
            className="mt-8 text-center font-bold text-[18px] text-[#111111] w-full"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
