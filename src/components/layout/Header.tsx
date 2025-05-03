// filepath: src/components/layout/Header.tsx
import Image from "next/image";
import { Search, Bell } from "lucide-react";
import { useState } from "react"; // Added for search input state

export default function Header() {
  const [searchQuery, setSearchQuery] = useState(""); // Moved search state here

  return (
    <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/logo.png" // Make sure this path is correct relative to the public folder
          alt="CidadãoConnect"
          width={150}
          height={40}
          className="mr-4"
        />
        <div className="relative ml-20">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="O que deseja buscar?"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-500" />
          {/* Notification count could also come from API */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3 {/* Placeholder count */}
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Placeholder for user avatar - fetch user data */}
          <Image
            src="/placeholder.svg?height=32&width=32" // Make sure this path is correct
            alt="Avatar"
            width={32}
            height={32}
          />
        </div>
      </div>
    </header>
  );
}
