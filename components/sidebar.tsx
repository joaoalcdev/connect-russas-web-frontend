"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, FileText, Archive, Settings } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Página Inicial", icon: Home, href: "/" },
    { name: "Mapa", icon: Map, href: "/mapa" },
    { name: "Relatórios", icon: FileText, href: "/relatorios" },
    { name: "Arquivo", icon: Archive, href: "/arquivo" },
    { name: "Configurações", icon: Settings, href: "/configuracoes" },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
