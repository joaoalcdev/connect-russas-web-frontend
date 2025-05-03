"use client";

import { menuItems } from "../config/menuItems"; // Adjust path if needed
import SidebarItem from "./SidebarItem"; // Adjust path if needed

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
