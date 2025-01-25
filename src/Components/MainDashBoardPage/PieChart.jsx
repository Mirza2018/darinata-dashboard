import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";

const car = [
  { name: "A1", value: 300, color: "#FF5B5B" }, // Red color for A1
  { name: "A2", value: 100, color: "#f5e2e4" }, // Blue color for A2
];
const user = [
  { name: "A1", value: 320, color: "#00B07426" }, // Red color for A1
  { name: "A2", value: 100, color: "#00B074" }, // Blue color for A2
];
const revenue = [
  { name: "A1", value: 500, color: "#2D9CDB" }, // Red color for A1
  { name: "A2", value: 100, color: "#2D9CDB26" }, // Blue color for A2
];

const PieCharts = () => {
  return (
    <div className=" bg-secondary-color  mt-10">
      <h1 className="text-2xl font-bold whitespace-nowrap pt-5 ms-8">Pie chart</h1>
      <div className="flex  bg-secondary-color rounded-md ">
        <div className="w-full h-80 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={car}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {car.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                {car.map((entry, index) => (
                  <Text
                    key={`text-${index}`}
                    fill="#3d405b"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="16"
                  >
                    {`${entry.name}: ${entry.value}`}
                  </Text>
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#3d405b"
                fontSize="30"
              >
                86%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full h-80 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={user}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {user.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                {user.map((entry, index) => (
                  <Text
                    key={`text-${index}`}
                    fill="#3d405b"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="16"
                  >
                    {`${entry.name}: ${entry.value}`}
                  </Text>
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#3d405b"
                fontSize="30"
              >
                55%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full h-80 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenue}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {revenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                {revenue.map((entry, index) => (
                  <Text
                    key={`text-${index}`}
                    fill="#3d405b"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="16"
                  >
                    {`${entry.name}: ${entry.value}`}
                  </Text>
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#3d405b"
                fontSize="30"
              >
                67%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
