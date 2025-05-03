// filepath: c:\Users\erick\OneDrive\Documents\vscode\connect-russas-frontend\src\utils\statusUtils.ts
export type TicketStatus =
  | "PENDENTE"
  | "EM_ANDAMENTO"
  | "RESOLVIDO"
  | "CANCELADO";

interface StatusProps {
  text: string;
  color: string;
  borderColor: string;
}

const statusMap: Record<TicketStatus, StatusProps> = {
  PENDENTE: {
    text: "Pendente",
    color: "border-yellow-500 text-yellow-500",
    borderColor: "border-l-yellow-500",
  },
  EM_ANDAMENTO: {
    text: "Em Andamento",
    color: "border-blue-500 text-blue-500",
    borderColor: "border-l-blue-500",
  },
  RESOLVIDO: {
    text: "Resolvido",
    color: "border-green-500 text-green-500",
    borderColor: "border-l-green-500",
  },
  CANCELADO: {
    text: "Cancelado",
    color: "border-red-500 text-red-500",
    borderColor: "border-l-red-500",
  },
};

const defaultStatus: StatusProps = {
  text: "Desconhecido",
  color: "border-gray-500 text-gray-500",
  borderColor: "border-l-gray-500",
};

export const getStatusProps = (status: TicketStatus): StatusProps => {
  return statusMap[status] || defaultStatus;
};
