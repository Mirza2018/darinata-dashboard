/* eslint-disable no-unused-vars */
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sunday", Order: 475 },
  { name: "Monday", Order: 580 },
  { name: "Tuesday", Order: 300 },
  { name: "Wednesday", Order: 525 },
  { name: "Thursday", Order: 375 },
  { name: "Friday", Order: 450 },
  { name: "Saturday", Order: 575 },
];

const OrderChart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className=" bg-base-color rounded-md border border-secondary-color mt-10 ">
      <h1 className="text-2xl font-bold whitespace-nowrap pt-5 ms-8">
        Total Car Sell Chart
      </h1>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              tick={{ ...tickStyle }}
              tickMargin={6}
              axisLine={false}
            />
            <YAxis tick={false} axisLine={false} />
            <defs>
              <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25.38%" stopColor="#B8E5F8" stopOpacity={1} />
                <stop offset="100%" stopColor="#eaf7fd" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Tooltip
              formatter={(value, name, props) => [`${value}K`, "Order"]}
              labelFormatter={(label) => ` ${label}`}
            />
            <Area
              type="monotone"
              dataKey="Order"
              stroke="#2D9CDB"
              fill="url(#colorOrder)"
            />
          </AreaChart>
        </ResponsiveContainer>{" "}
      </div>
    </div>
  );
};

export default OrderChart;
