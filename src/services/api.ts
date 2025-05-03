import axios from "axios";
import { ListTicketsQuery, ListTicketsResponse, Ticket } from "../types/ticket"; // Added Ticket type
import {
  ListTeamsQuery,
  ListTeamsResponse,
  AssignTeamPayload,
  TeamSummary,
} from "../types/team"; // Added Team types

// TODO: Move to environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://connect-russas-mobile-backend.onrender.com/api/v1"; // Default if not set

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // TODO: Add Authorization header if needed, e.g., from auth context or storage
    // 'Authorization': `Bearer ${token}`
  },
});

/**
 * Fetches tickets from the API based on the provided query parameters.
 * @param params - Query parameters for filtering, sorting, and pagination.
 * @returns A promise that resolves to the list of tickets and pagination info.
 */
export const fetchTickets = async (
  params?: ListTicketsQuery
): Promise<ListTicketsResponse> => {
  try {
    const response = await apiClient.get<ListTicketsResponse>("/tickets", {
      params: params, // Axios automatically handles query string serialization
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors (e.g., network error, 4xx, 5xx)
      console.error(
        "API Error fetching tickets:",
        error.response?.data || error.message
      );
      // You might want to throw a more specific error or return a default/empty state
      throw new Error(
        `Failed to fetch tickets: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      // Handle unexpected errors
      console.error("Unexpected error fetching tickets:", error);
      throw new Error("An unexpected error occurred while fetching tickets.");
    }
  }
};

export const fetchTicketById = async (ticketId: string): Promise<Ticket> => {
  try {
    const response = await apiClient.get<Ticket>(`/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error fetching ticket ${ticketId}:`,
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch ticket ${ticketId}: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      console.error(`Unexpected error fetching ticket ${ticketId}:`, error);
      throw new Error(
        "An unexpected error occurred while fetching the ticket."
      );
    }
  }
};

/**
 * Fetches a list of teams.
 * @param params - Query parameters for pagination (optional).
 * @returns A promise that resolves to the list of teams and pagination info.
 */
export const fetchTeams = async (
  params?: ListTeamsQuery
): Promise<ListTeamsResponse> => {
  try {
    // Assuming the API returns TeamSummary for the list endpoint
    const response = await apiClient.get<ListTeamsResponse>("/teams", {
      params: params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "API Error fetching teams:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch teams: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      console.error("Unexpected error fetching teams:", error);
      throw new Error("An unexpected error occurred while fetching teams.");
    }
  }
};

/**
 * Assigns a ticket to a specific team.
 * @param ticketId - The ID (CUID) of the ticket to assign.
 * @param payload - The payload containing the teamId.
 * @returns A promise that resolves to the updated ticket details.
 */
export const assignTicketToTeam = async (
  ticketId: string,
  payload: AssignTeamPayload
): Promise<Ticket> => {
  try {
    const response = await apiClient.post<Ticket>(
      `/tickets/${ticketId}/assign`,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error assigning ticket ${ticketId}:`,
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to assign ticket ${ticketId}: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      console.error(`Unexpected error assigning ticket ${ticketId}:`, error);
      throw new Error(
        "An unexpected error occurred while assigning the ticket."
      );
    }
  }
};

// Add other API functions here as needed (e.g., createTicket, updateTicket)

export default apiClient;
