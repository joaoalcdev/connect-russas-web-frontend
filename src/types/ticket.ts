export type TicketStatus =
  | "PENDENTE"
  | "EM_ANDAMENTO"
  | "RESOLVIDO"
  | "CANCELADO";

export type TicketPriority = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

export const TICKET_STATUS_OPTIONS: TicketStatus[] = [
  "PENDENTE",
  "EM_ANDAMENTO",
  "RESOLVIDO",
  "CANCELADO",
];
export const TICKET_PRIORITY_OPTIONS: TicketPriority[] = [
  "BAIXA",
  "MEDIA",
  "ALTA",
  "CRITICA",
];

export interface TicketLocation {
  address: string;
  latitude?: number;
  longitude?: number;
}

// Based on TicketSummarySchema (def-17)
export interface TicketSummary {
  id: string; // Protocolo (CUID)
  title: string; // Problema (Título)
  status: TicketStatus;
  location: {
    address: string;
  };
}

// Based on TicketResponseSchema (def-14)
export interface Ticket {
  id: string; // Protocolo do chamado (CUID)
  title: string; // Título do chamado
  description: string; // Descrição detalhada
  category: string; // Categoria do problema
  address: string; // Endereço do chamado (Note: Duplicated in TicketLocation, using root level for now)
  latitude?: number;
  longitude?: number;
  status: TicketStatus;
  priority: TicketPriority;
  requesterId: string; // ID do Solicitante (CUID)
  assignedTeamId?: string | null; // ID da Equipe Atribuída (CUID)
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  resolvedAt?: string | null; // ISO Date string
}

// Based on ListTicketsQuerySchema (def-18)
export interface ListTicketsQuery {
  page?: number;
  limit?: number;
  status?: TicketStatus;
  category?: string;
  location?: string; // Busca no endereço
  priority?: TicketPriority;
  assignedTeamId?: string; // Filtrar por ID da Equipe (CUID)
  sortBy?: "createdAt" | "updatedAt" | "priority";
  sortOrder?: "asc" | "desc";
  recent?: boolean; // Listar apenas recentes para home
}

// Based on ListTicketsResponseSchema (def-19)
export interface ListTicketsResponse {
  tickets: (Ticket | TicketSummary)[]; // Can be full or summary
  total: number;
  page: number;
  limit: number;
}
