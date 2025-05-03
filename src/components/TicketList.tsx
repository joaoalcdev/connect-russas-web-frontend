import TicketItem, { Ticket } from "./TicketItem"; // Import TicketItem and Ticket interface

interface TicketListProps {
  tickets: Ticket[];
  showStatus?: boolean;
  // statusColumn prop seems redundant if showStatus controls the display
}

export default function TicketList({
  tickets,
  showStatus = true,
}: TicketListProps) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} showStatus={showStatus} />
      ))}
    </div>
  );
}
