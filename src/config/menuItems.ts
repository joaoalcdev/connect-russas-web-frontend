// filepath: src/config/menuItems.ts
import {
  Home,
  Map,
  FileText,
  Archive,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

export const menuItems: MenuItem[] = [
  { name: "Página Inicial", icon: Home, href: "/" },
  { name: "Mapa", icon: Map, href: "/mapa" },
  { name: "Relatórios", icon: FileText, href: "/relatorios" },
  { name: "Arquivo", icon: Archive, href: "/arquivo" },
  { name: "Configurações", icon: Settings, href: "/configuracoes" },
];
