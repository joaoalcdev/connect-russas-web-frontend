// filepath: src/components/dashboard/PageHeader.tsx
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick?: () => void; // Optional click handler
}

export default function PageHeader({
  title,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        onClick={onButtonClick}
      >
        <Plus className="h-5 w-5 mr-2" />
        {buttonText}
      </button>
    </div>
  );
}
