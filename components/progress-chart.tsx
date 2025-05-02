"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function ProgressChart() {
  const data = [
    { name: "Concluídos", value: 35, color: "#22c55e", description: "35% · 70 de 200" },
    { name: "Em execução", value: 25, color: "#3b82f6", description: "25% · 50 de 200" },
    { name: "Pendentes", value: 40, color: "#f59e0b", description: "40% · 80 de 200" },
    { name: "Em atraso", value: 5, color: "#ef4444", description: "5% · 10 de 200" },
  ]

  const renderLegend = () => {
    return (
      <ul className="space-y-3 mt-4">
        {data.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{entry.name}</span>
              </div>
              <span className="text-sm text-gray-500">{entry.description}</span>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex">
      <div className="w-1/2 h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold">35%</div>
          <div className="text-gray-500">concluído</div>
        </div>
      </div>
      <div className="w-1/2">{renderLegend()}</div>
    </div>
  )
}
