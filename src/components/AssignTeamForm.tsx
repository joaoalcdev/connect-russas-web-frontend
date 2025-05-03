"use client";

import { TeamSummary } from "../types/team";
import { useAssignTeam } from "../hooks/useAssignTeam";

interface AssignTeamFormProps {
  ticketId: string;
  teams: TeamSummary[];
  currentTeamId?: string | null;
}

export default function AssignTeamForm({
  ticketId,
  teams,
  currentTeamId,
}: AssignTeamFormProps) {
  const {
    selectedTeamId,
    setSelectedTeamId,
    isLoading,
    error,
    assignTeam,
    setError, // Get setError from hook
  } = useAssignTeam({ ticketId, initialTeamId: currentTeamId });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Clear previous errors before attempting submission
    if (error) setError(null);
    await assignTeam();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded border p-4 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800/30"
    >
      <h3 className="text-lg font-semibold mb-3">Atribuir Equipe</h3>
      {/* Example using a reusable AlertMessage component */}
      {/* {error && <AlertMessage type="error" message={error} />} */}
      {error && (
        <div
          className="mb-3 rounded border border-red-400 bg-red-100 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-grow">
          <label
            htmlFor="teamId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Selecione a Equipe
          </label>
          {/* Example using a reusable SelectInput component */}
          {/* <SelectInput
            id="teamId"
            name="teamId"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            disabled={isLoading}
            options={[
              { value: "", label: "-- Selecione --" },
              ...teams.map((team) => ({
                value: team.id,
                label: `${team.name} (${team.memberCount} membros)`,
              })),
            ]}
          /> */}
          <select
            id="teamId"
            name="teamId"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white sm:text-sm"
            disabled={isLoading}
          >
            <option value="">-- Selecione --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name} ({team.memberCount} membros)
              </option>
            ))}
          </select>
        </div>
        {/* Example using a reusable SubmitButton component */}
        {/* <SubmitButton isLoading={isLoading} disabled={!selectedTeamId}>
          {isLoading ? "Atribuindo..." : "Atribuir"}
        </SubmitButton> */}
        <button
          type="submit"
          disabled={isLoading || !selectedTeamId}
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-neutral-800`}
        >
          {isLoading ? "Atribuindo..." : "Atribuir"}
        </button>
      </div>
    </form>
  );
}
