"use client";

import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./layout/Header"; // Import new component
import Breadcrumbs from "./layout/Breadcrumbs"; // Import new component
import PageHeader from "./dashboard/PageHeader"; // Import new component
import ProgressChart from "../components/ProgressChart"; // Import new component
import TodayTicketsSection from "./dashboard/TodayTicketsSection"; // Import new component
import AllTicketsSection from "./dashboard/AllTicketsSection"; // Import new component
import { fetchTickets } from "../services/api";
import {
  Ticket,
  TicketStatus,
  ListTicketsQuery,
  TicketSummary,
} from "../types/ticket";

// Helper to map tab values to API status values (remains the same)
const tabToStatusMap: Record<string, TicketStatus | undefined> = {
  todos: undefined,
  pendente: "PENDENTE",
  andamento: "EM_ANDAMENTO",
  concluido: "RESOLVIDO",
  "em-atraso": undefined, // Needs specific logic if API doesn't support it directly
};

export default function DashBoard() {
  // State management remains here as it controls data fetching for multiple sections
  const [todayTickets, setTodayTickets] = useState<(Ticket | TicketSummary)[]>(
    []
  );
  const [currentTabTickets, setCurrentTabTickets] = useState<
    (Ticket | TicketSummary)[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [loadingToday, setLoadingToday] = useState<boolean>(true);
  const [loadingTabs, setLoadingTabs] = useState<boolean>(true);
  const [errorToday, setErrorToday] = useState<string | null>(null);
  const [errorTabs, setErrorTabs] = useState<string | null>(null);

  // Fetch tickets for "Hoje" section (remains the same)
  useEffect(() => {
    const loadTodayTickets = async () => {
      setLoadingToday(true);
      setErrorToday(null);
      try {
        const query: ListTicketsQuery = {
          limit: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        };
        const response = await fetchTickets(query);
        setTodayTickets(response.tickets || []);
      } catch (err) {
        console.error("Failed to load today's tickets:", err);
        setErrorToday(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setTodayTickets([]);
      } finally {
        setLoadingToday(false);
      }
    };
    loadTodayTickets();
  }, []);

  // Fetch tickets for the selected tab (remains the same)
  useEffect(() => {
    const loadTabTickets = async () => {
      setLoadingTabs(true);
      setErrorTabs(null);
      const statusFilter = tabToStatusMap[activeTab];

      if (activeTab === "em-atraso" && statusFilter === undefined) {
        console.warn("API filtering for 'em-atraso' not implemented yet.");
        // Decide behavior: fetch all and filter client-side, or show empty/message
        setCurrentTabTickets([]); // Example: Show empty for now
        setLoadingTabs(false);
        return;
      }

      try {
        const query: ListTicketsQuery = { status: statusFilter }; // Add pagination later
        const response = await fetchTickets(query);
        setCurrentTabTickets(response.tickets || []);
      } catch (err) {
        console.error(`Failed to load tickets for tab ${activeTab}:`, err);
        setErrorTabs(
          err instanceof Error ? err.message : `An unknown error occurred`
        );
        setCurrentTabTickets([]);
      } finally {
        setLoadingTabs(false);
      }
    };
    loadTabTickets();
  }, [activeTab]);

  // --- Removed renderTicketList helper as logic is now within section components ---

  // Handler for the "Criar chamado" button (example)
  const handleCreateTicket = () => {
    console.log("Navigate to create ticket page or open modal");
    // Add navigation logic here
  };

  // Handlers for "Ver tudo" buttons (example)
  const handleViewAllToday = () => {
    console.log("Navigate to view all today's tickets");
    // Add navigation logic here, maybe set activeTab to 'todos' or a specific filter
  };

  const handleViewAllTickets = () => {
    console.log("Navigate to view all tickets page");
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Use Header component */}
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6 space-y-6">
          {" "}
          {/* Added space-y-6 for vertical spacing */}
          <Breadcrumbs /> {/* Use Breadcrumbs component */}
          <PageHeader
            title="Dashboard"
            buttonText="Criar chamado"
            onButtonClick={handleCreateTicket}
          />{" "}
          {/* Use PageHeader component */}
          {/* First Row: Progress and Today's Tickets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-6">
            {/* Column 1: Progress Chart and Today's Tickets */}
            <div className="space-y-6">
              <ProgressChart /> {/* Use ProgressSection component */}
              <TodayTicketsSection
                tickets={todayTickets}
                loading={loadingToday}
                error={errorToday}
                onViewAllClick={handleViewAllToday}
              />
            </div>

            {/* Column 2: All Tickets Section */}
            <AllTicketsSection
              tickets={currentTabTickets}
              loading={loadingTabs}
              error={errorTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onViewAllClick={handleViewAllTickets}
            />
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
}
