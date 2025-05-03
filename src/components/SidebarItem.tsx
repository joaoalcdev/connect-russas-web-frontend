// filepath: src/components/SidebarItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "../config/menuItems"; // Adjust path if needed

interface SidebarItemProps {
  item: MenuItem;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center p-3 rounded-lg ${
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span>{item.name}</span>
      </Link>
    </li>
  );
}
