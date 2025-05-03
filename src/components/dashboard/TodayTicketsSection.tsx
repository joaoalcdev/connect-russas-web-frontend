// filepath: src/components/dashboard/TodayTicketsSection.tsx
import { ChevronRight } from "lucide-react";
import TicketList from "../TicketList"; // Adjust path if needed
import { Ticket } from "../../types/ticket"; // Adjust path if needed
import Skeleton from "../../components/ui/skeleton"; // Import Skeleton

interface FormattedTicket {
  id: string;
  address: string;
  entryDate: string;
  dueDate: string; // Keep if TicketList expects it, even if data isn't available
  status?: string; // Keep if TicketList expects it
}

interface TodayTicketsSectionProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  onViewAllClick?: () => void; // Optional click handler
}

// Helper to format tickets specifically for the list display
const formatTicketsForList = (tickets: Ticket[]): FormattedTicket[] => {
  return tickets.map((t) => ({
    id: t.id,
    address: t.address ?? "Endereço não disponível",
    entryDate: t.createdAt
      ? new Date(t.createdAt).toLocaleDateString("pt-BR")
      : "N/A",
    dueDate: t.createdAt
      ? new Date(t.createdAt).toLocaleDateString("pt-BR")
      : "N/A",
    status: t.status, // Pass status if TicketList component uses it
  }));
};

export default function TodayTicketsSection({
  tickets,
  loading,
  error,
  onViewAllClick,
}: TodayTicketsSectionProps) {
  const renderContent = () => {
    if (loading)
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      );
    if (error) return <p className="text-center text-red-500">Erro: {error}</p>;
    if (tickets.length === 0)
      return (
        <p className="text-center text-gray-500">Nenhum chamado para hoje.</p>
      );

    const formattedTickets = formatTicketsForList(tickets);
    // Pass only necessary props to TicketList based on its implementation
    return <TicketList tickets={formattedTickets} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Hoje</h2>
        <button
          className="text-gray-500 text-sm flex items-center"
          onClick={onViewAllClick}
        >
          Ver tudo <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
