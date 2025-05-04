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
import { Ticket, ListTicketsQuery, TicketSummary } from "../types/ticket";

export default function DashBoard() {
  // State management for all tickets
  const [allTickets, setAllTickets] = useState<(Ticket | TicketSummary)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("todos");

  // Fetch all tickets once
  useEffect(() => {
    const loadAllTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const query: ListTicketsQuery = {
          sortBy: "createdAt",
          sortOrder: "desc",
        };
        const response = await fetchTickets(query);
        setAllTickets(response.tickets || []);
      } catch (err) {
        console.error("Failed to load tickets:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setAllTickets([]);
      } finally {
        setLoading(false);
      }
    };
    loadAllTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Use Header component */}
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6 space-y-6">
          {" "}
          {/* Added space-y-6 for vertical spacing */}
          <Breadcrumbs /> {/* Use Breadcrumbs component */}
          <PageHeader title="Dashboard" buttonText="Criar chamado" />
          {/* Use PageHeader component */}
          {/* First Row: Progress and Today's Tickets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-6">
            {/* Column 1: Progress Chart and Today's Tickets */}
            <div className="space-y-6">
              <ProgressChart /> {/* Use ProgressSection component */}
              <TodayTicketsSection
                tickets={allTickets.filter(
                  (ticket): ticket is Ticket => "description" in ticket
                )}
                loading={loading}
                error={error}
              />
            </div>

            {/* Column 2: All Tickets Section */}
            <AllTicketsSection
              tickets={allTickets.filter(
                (ticket): ticket is Ticket => "description" in ticket
              )}
              loading={loading}
              error={error}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
}
