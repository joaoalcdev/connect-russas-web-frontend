// filepath: c:\Users\erick\OneDrive\Documents\vscode\connect-russas-frontend\src\components\TicketItem.tsx
import Link from "next/link";
import { getStatusProps, TicketStatus } from "../utils/statusUtils"; // Adjust path if needed

export interface Ticket {
  id: string;
  address: string;
  entryDate: string;
  dueDate?: string;
  status: TicketStatus;
  title: string;
}

interface TicketItemProps {
  ticket: Ticket;
  showStatus?: boolean;
}

export default function TicketItem({
  ticket,
  showStatus = true,
}: TicketItemProps) {
  const statusProps = getStatusProps(ticket.status);

  return (
    <Link
      href={`/${ticket.id}`} // Assuming ticket detail pages are at the root level
      className="block hover:underline"
    >
      <div className={`border-l-4 pl-4 py-1 ${statusProps.borderColor}`}>
        <div className="flex justify-between">
          <div>
            <div className="font-medium">
              {ticket.title} {ticket.address}
            </div>
            <div className="text-sm text-gray-500">
              Entrada: {ticket.entryDate}
              {ticket.dueDate ? ` | Prazo: ${ticket.dueDate}` : ""}
            </div>
          </div>
          {showStatus ? (
            <div className={`px-3 py-1 text-sm ${statusProps.color}`}>
              {statusProps.text}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
