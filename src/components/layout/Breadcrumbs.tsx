// filepath: src/components/layout/Breadcrumbs.tsx
import { ChevronRight } from "lucide-react";

// Example: Pass path segments as props if needed for dynamic breadcrumbs
// interface BreadcrumbsProps {
//   segments: { name: string; href?: string }[];
// }

export default function Breadcrumbs() {
  // For now, hardcoding the dashboard path
  return (
    <div className="bg-white rounded-lg p-4 mb-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Página Inicial</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-gray-700">Dashboard</span>
        {/* Add logic here to render dynamic segments if using props */}
      </div>
    </div>
  );
}
