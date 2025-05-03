import { useState } from "react";
import { useRouter } from "next/navigation";
import { assignTicketToTeam } from "../services/api";

interface UseAssignTeamProps {
  ticketId: string;
  initialTeamId?: string | null;
  onSuccess?: () => void; // Optional callback for success
}

export function useAssignTeam({
  ticketId,
  initialTeamId,
  onSuccess,
}: UseAssignTeamProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    initialTeamId || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const assignTeam = async () => {
    if (!selectedTeamId) {
      setError("Por favor, selecione uma equipe.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await assignTicketToTeam(ticketId, { teamId: selectedTeamId });
      // Consider using a toast notification instead of alert
      alert("Chamado atribuído com sucesso!");
      if (onSuccess) {
        onSuccess(); // Call the success callback if provided
      } else {
        router.refresh(); // Default behavior: refresh the page
      }
    } catch (err) {
      console.error("Failed to assign team:", err);
      setError(
        err instanceof Error ? err.message : "Falha ao atribuir equipe."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedTeamId,
    setSelectedTeamId,
    isLoading,
    error,
    assignTeam,
    setError, // Expose setError if needed externally
  };
}
