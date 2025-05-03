import { fetchTicketById, fetchTeams } from "../../services/api";
import { TicketStatus, TicketPriority } from "../../types/ticket";
import AssignTeamForm from "../../components/AssignTeamForm";
import { notFound } from "next/navigation";
import Link from "next/link";

interface TicketDetailPageProps {
  params: { ticketId: string };
}

// Helper functions (can be moved to a utils file later)
const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "PENDENTE":
      return "text-yellow-600 dark:text-yellow-400";
    case "EM_ANDAMENTO":
      return "text-blue-600 dark:text-blue-400";
    case "RESOLVIDO":
      return "text-green-600 dark:text-green-400";
    case "CANCELADO":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

const getPriorityColor = (priority: TicketPriority) => {
  switch (priority) {
    case "BAIXA":
      return "text-gray-500 dark:text-gray-400";
    case "MEDIA":
      return "text-yellow-500 dark:text-yellow-400";
    case "ALTA":
      return "text-orange-500 dark:text-orange-400";
    case "CRITICA":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-500 dark:text-gray-400";
  }
};

export default async function TicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { ticketId } = await params;

  try {
    // Fetch ticket details and teams in parallel
    const [ticket, teamsResponse] = await Promise.all([
      fetchTicketById(ticketId),
      fetchTeams({ limit: 100 }), // Fetch a large number of teams, assuming pagination isn't critical here
    ]);

    if (!ticket) {
      notFound(); // Trigger 404 if ticket not found
    }

    const teams = teamsResponse.teams; // Extract teams from the response

    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24">
        <div className="w-full max-w-4xl">
          <Link
            href="/tickets"
            className="text-blue-600 hover:underline mb-6 block dark:text-blue-400"
          >
            &larr; Voltar para a lista de chamados
          </Link>

          <div className="rounded border p-6 shadow-lg dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Protocolo: {ticket.id}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Status:</p>
                <p className={getStatusColor(ticket.status)}>
                  {ticket.status.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Prioridade:</p>
                <p className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </p>
              </div>
              <div>
                <p className="font-semibold">Categoria:</p>
                <p>{ticket.category}</p>
              </div>
              <div>
                <p className="font-semibold">Endereço:</p>
                <p>{ticket.address}</p>
                {/* TODO: Add map link or embed if lat/lon exist */}
              </div>
              <div>
                <p className="font-semibold">Criado em:</p>
                <p>{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Última Atualização:</p>
                <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
              </div>
              {ticket.resolvedAt && (
                <div>
                  <p className="font-semibold">Resolvido em:</p>
                  <p>{new Date(ticket.resolvedAt).toLocaleString()}</p>
                </div>
              )}
              <div>
                <p className="font-semibold">Equipe Atribuída:</p>
                {/* Find team name from the fetched teams list */}
                <p>
                  {ticket.assignedTeamId
                    ? teams.find((t) => t.id === ticket.assignedTeamId)?.name ||
                      ticket.assignedTeamId
                    : "Nenhuma"}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold">Descrição:</p>
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </div>

            {/* Assign Team Form */}
            <AssignTeamForm
              ticketId={ticket.id}
              teams={teams}
              currentTeamId={ticket.assignedTeamId}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error(`Error loading ticket ${ticketId}:`, error);
    // Handle specific errors, e.g., 404 from fetchTicketById
    if (
      error instanceof Error &&
      error.message.includes("Failed to fetch ticket")
    ) {
      // Check if it's a 404 type error if the API service throws specific errors
      notFound();
    }
    // Generic error display
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao Carregar Chamado
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Não foi possível carregar os detalhes para o chamado com ID:{" "}
            {ticketId}.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Detalhes:{" "}
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </p>
          <Link
            href="/tickets"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Voltar para a lista de chamados
          </Link>
        </div>
      </main>
    );
  }
}
