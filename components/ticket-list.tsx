interface Ticket {
  id: number
  address: string
  entryDate: string
  dueDate: string
  status: "pendente" | "em-execucao" | "concluido" | "em-atraso"
}

interface TicketListProps {
  tickets: Ticket[]
  showStatus?: boolean
  statusColumn?: boolean
}

export default function TicketList({ tickets, showStatus = true, statusColumn = false }: TicketListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "border-yellow-500 text-yellow-500"
      case "em-execucao":
        return "border-blue-500 text-blue-500"
      case "concluido":
        return "border-green-500 text-green-500"
      case "em-atraso":
        return "border-red-500 text-red-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "em-execucao":
        return "Em execução"
      case "concluido":
        return "Concluído"
      case "em-atraso":
        return "Em atraso"
      default:
        return status
    }
  }

  const getBorderColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "border-l-yellow-500"
      case "em-execucao":
        return "border-l-blue-500"
      case "concluido":
        return "border-l-green-500"
      case "em-atraso":
        return "border-l-red-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <div key={ticket.id} className={`border-l-4 pl-4 py-3 ${getBorderColor(ticket.status)}`}>
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{ticket.address}</div>
              <div className="text-sm text-gray-500">
                Entrada: {ticket.entryDate} &nbsp; Prazo: {ticket.dueDate}
              </div>
            </div>
            {showStatus ? (
              <div className={`px-3 py-1 border rounded-md text-sm ${getStatusColor(ticket.status)}`}>
                {getStatusText(ticket.status)}
              </div>
            ) : statusColumn ? (
              <div className={`px-3 py-1 border rounded-md text-sm ${getStatusColor("pendente")}`}>Pendente</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
