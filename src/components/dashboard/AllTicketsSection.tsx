import { ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"; // Adjust path
import TicketList from "../TicketList"; // Adjust path
import { Ticket } from "../../types/ticket"; // Adjust path
import Skeleton from "../../components/ui/skeleton"; // Import Skeleton
import { TicketStatus } from "../../utils/statusUtils"; // Adjust path

interface FormattedTicket {
  id: string;
  address: string;
  entryDate: string;
  dueDate: string;
  status: TicketStatus; // Altere para TicketStatus
}

interface AllTicketsSectionProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  activeTab: string;
  onTabChange: (value: string) => void;
  onViewAllClick?: () => void;
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
    status: t.status,
  }));
};

// Map tabs to ticket statuses
const tabToStatusMap: Record<string, string | undefined> = {
  todos: undefined,
  pendente: "PENDENTE",
  andamento: "EM_ANDAMENTO",
  concluido: "RESOLVIDO",
  "em-atraso": "EM_ATRASO",
};

export default function AllTicketsSection({
  tickets,
  loading,
  error,
  activeTab,
  onTabChange,
  onViewAllClick,
}: AllTicketsSectionProps) {
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
        <p className="text-center text-gray-500">Nenhum chamado encontrado.</p>
      );

    // Filter tickets based on the active tab
    const filteredTickets = tickets.filter((ticket) =>
      tabToStatusMap[activeTab]
        ? ticket.status === tabToStatusMap[activeTab]
        : true
    );

    const formattedTickets = formatTicketsForList(filteredTickets);
    const limitedTickets = formattedTickets.slice(0, 5);

    return <TicketList tickets={limitedTickets} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Todos os chamados</h2>
        <button
          className="text-gray-500 text-sm flex items-center"
          onClick={onViewAllClick}
        >
          Ver tudo <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg w-full flex justify-around">
          <TabsTrigger className="cursor-pointer" value="todos">
            Todos
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="pendente">
            Pendente
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="andamento">
            Andamento
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="concluido">
            Concluído
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="em-atraso">
            Em atraso
          </TabsTrigger>
        </TabsList>
        {renderContent()}
      </Tabs>
    </div>
  );
}
