"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Bell, Plus, ChevronRight } from "lucide-react"
import Sidebar from "./sidebar"
import ProgressChart from "./progress-chart"
import TicketList from "./ticket-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="CidadãoConnect" width={150} height={40} className="mr-4" />
          <div className="relative ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="O que deseja buscar?"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <Image src="/placeholder.svg?height=32&width=32" alt="Avatar" width={32} height={32} />
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Página Inicial</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="font-medium text-gray-700">Dashboard</span>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Criar chamado
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Progresso Semanal</h2>
              </div>
              <ProgressChart />
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Hoje</h2>
                <button className="text-gray-500 text-sm flex items-center">
                  Ver tudo <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <TicketList
                tickets={[
                  {
                    id: 1,
                    address: "Rua João Maciel Pereira, 3167",
                    entryDate: "12/04",
                    dueDate: "27/04",
                    status: "em-atraso",
                  },
                  {
                    id: 2,
                    address: "Rua João Maciel Pereira, 3167",
                    entryDate: "12/04",
                    dueDate: "27/04",
                    status: "em-execucao",
                  },
                  {
                    id: 3,
                    address: "Rua João Maciel Pereira, 3167",
                    entryDate: "12/04",
                    dueDate: "27/04",
                    status: "pendente",
                  },
                  {
                    id: 4,
                    address: "Rua João Maciel Pereira, 3167",
                    entryDate: "12/04",
                    dueDate: "27/04",
                    status: "pendente",
                  },
                  {
                    id: 5,
                    address: "Rua João Maciel Pereira, 3167",
                    entryDate: "12/04",
                    dueDate: "27/04",
                    status: "concluido",
                  },
                ]}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Todos os chamados</h2>
              <button className="text-gray-500 text-sm flex items-center">
                Ver tudo <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <Tabs defaultValue="todos">
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pendente">Pendente</TabsTrigger>
                <TabsTrigger value="andamento">Andamento</TabsTrigger>
                <TabsTrigger value="concluido">Concluído</TabsTrigger>
                <TabsTrigger value="em-atraso">Em atraso</TabsTrigger>
              </TabsList>
              <TabsContent value="todos">
                <TicketList
                  tickets={[
                    {
                      id: 1,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 2,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 3,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 4,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 5,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 6,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 7,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 8,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 9,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                  ]}
                  showStatus={false}
                  statusColumn={true}
                />
              </TabsContent>
              <TabsContent value="pendente">
                <TicketList
                  tickets={[
                    {
                      id: 1,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 2,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                    {
                      id: 3,
                      address: "Rua João Maciel Pereira, 3167",
                      entryDate: "12/04",
                      dueDate: "27/04",
                      status: "pendente",
                    },
                  ]}
                  showStatus={false}
                  statusColumn={true}
                />
              </TabsContent>
              {/* Outros tabs teriam conteúdo similar */}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
