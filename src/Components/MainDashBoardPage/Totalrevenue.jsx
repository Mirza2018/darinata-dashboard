/* eslint-disable no-unused-vars */
import { ConfigProvider, Select } from "antd";
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
  { name: "January", Cars: 475 },
  { name: "February", Cars: 580 },
  { name: "March", Cars: 300 },
  { name: "April", Cars: 525 },
  { name: "May", Cars: 375 },
  { name: "June", Cars: 450 },
  { name: "July", Cars: 575 },
  { name: "August", Cars: 600 },
  { name: "September", Cars: 420 },
  { name: "October", Cars: 510 },
  { name: "November", Cars: 480 },
  { name: "December", Cars: 550 },
];


const TotalRevenue = ({ totalSalesChart }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className=" bg-base-color border border-secondary-color mt-10 rounded-md px-5 ">
      <div className="flex justify-between  mt-4">
        <h1 className="text-2xl font-bold whitespace-nowrap pt-5 ms-8">
          Total Car Sell
        </h1>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  fontSize: 16,
                  colorBorder: "#222222",
                },
              },
            }}
          >
            {/* <Select
              defaultValue="2024"
              style={{ width: 80 }}
              options={[
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
              ]}
            /> */}
          </ConfigProvider>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart
            data={totalSalesChart?.data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              tick={{ ...tickStyle }}
              tickMargin={6}
              axisLine={false}
            />
            <YAxis tick={[]} axisLine={false} />
            <defs>
              <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25.38%" stopColor="#F3F9FB" stopOpacity={1} />
                <stop offset="100%" stopColor="#F3F9FB" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Tooltip
              formatter={(value, name, props) => [`${value} pcs`, "Cars"]}
              labelFormatter={(label) => ` ${label}`}
            />
            <Area
              type="monotone"
              // dataKey="Cars"
              dataKey="totalSales"
              stroke="#2D9CDB"
              fill="url(#colorOrder)"
            />
          </AreaChart>
        </ResponsiveContainer>{" "}
      </div>
    </div>
  );
};

export default TotalRevenue;
