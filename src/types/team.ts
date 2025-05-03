//import { UserResponseSchema } from "./user"; // Assuming user types might be in a separate file later

// Based on TeamResponseSchema (def-8)
export interface Team {
  id: string; // uuid
  name: string;
  description?: string | null;
  members: UserResponseSchema[]; // Reusing UserResponseSchema for now
  createdAt: string; // date-time
  updatedAt: string; // date-time
}

// Based on ListTeamsResponseSchema item (def-9)
export interface TeamSummary {
  id: string; // uuid
  name: string;
  description?: string | null;
  memberCount: number;
  createdAt: string; // date-time
  updatedAt: string; // date-time
}

// Based on ListTeamsQuerySchema (def-13)
export interface ListTeamsQuery {
  page?: number;
  limit?: number;
}

// Based on API response for GET /teams
export interface ListTeamsResponse {
  teams: TeamSummary[];
  total: number;
  page: number;
  limit: number;
}

// Based on AssignTeamSchema (def-21)
export interface AssignTeamPayload {
  teamId: string; // ID da equipe (CUID)
}

// Placeholder for UserResponseSchema if not defined elsewhere
// Based on def-2
export interface UserResponseSchema {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "GESTOR" | "OPERADOR" | "SUPERVISOR" | "ANALISTA";
  isActive: boolean;
  teamIds: string[];
  createdAt: string; // date-time
  updatedAt: string; // date-time
}
