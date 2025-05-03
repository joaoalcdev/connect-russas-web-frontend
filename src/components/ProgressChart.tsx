"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProgressChart() {
  const data = [
    {
      name: "Concluídos",
      value: 35,
      color: "#22c55e", // Green
      description: "35% · 70 de 200",
    },
    {
      name: "Em execução",
      value: 25,
      color: "#3b82f6", // Blue
      description: "25% · 50 de 200",
    },
    {
      name: "Pendentes",
      value: 40,
      color: "#f59e0b", // Amber
      description: "40% · 80 de 200",
    },
    {
      name: "Em atraso",
      value: 5,
      color: "#ef4444", // Red
      description: "5% · 10 de 200",
    },
  ];

  // Calculate the percentage for the center text dynamically
  const completedPercentage =
    data.find((item) => item.name === "Concluídos")?.value || 0;

  const renderLegend = () => {
    return (
      <div className="flex flex-col justify-center h-full">
        <ul className="space-y-3">
          {" "}
          {/* Slightly reduced spacing */}
          {data.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center">
              <span
                className="w-3.5 h-3.5 rounded-full mr-3 flex-shrink-0" // Slightly larger dot, adjusted margin
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <span className="font-medium text-gray-700 text-sm">
                  {entry.name}
                </span>{" "}
                {/* Adjusted text size/color */}
                <span className="block text-xs text-gray-500">
                  {" "}
                  {/* Adjusted text size */}
                  {entry.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    // Changed to flex-col to stack title above chart/legend
    <div className="flex flex-col p-6 w-full bg-white rounded-lg shadow-md">
      {/* Title moved to the top */}
      <h2 className="text-xl font-bold mb-4">Progresso Semanal</h2>

      {/* Container for Chart and Legend */}
      <div className="flex w-full items-center">
        {/* Chart container */}
        <div className="w-1/2 h-64 relative">
          {" "}
          {/* Increased height */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={85} // Increased inner radius
                outerRadius={120} // Increased outer radius
                paddingAngle={2} // Slightly reduced padding angle
                dataKey="value"
                stroke="none" // Remove cell borders
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Optional: Add Tooltip for interactivity */}
              {/* <Tooltip /> */}
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-5xl font-bold text-gray-800">{`${completedPercentage}%`}</div>{" "}
            {/* Increased size */}
            <div className="text-base text-gray-500 mt-1">Concluído</div>{" "}
            {/* Increased size, capitalized */}
          </div>
        </div>
        <div className="w-1/2 pl-10">{renderLegend()}</div>
      </div>
    </div>
  );
}
