import { ConfigProvider, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";



const CustomerMap = ({ customerMap }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="bg-base-color border border-secondary-color px-5 mt-10 rounded-md">
      <div className="flex justify-between  mt-4">
        <h1 className="text-2xl font-bold whitespace-nowrap pt-5 ms-8">
          Kort over kunder
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

      <div className="w-full h-80 mt-2">
        <ResponsiveContainer>
          <BarChart
            data={customerMap?.data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap={30} // Adjust the gap between bars if necessary
          >
            <XAxis dataKey="month" tick={[]} axisLine={false} tickMargin={6} />
            <YAxis tickMargin={16} tick={[]} axisLine={false} />
            {/* Add several horizontal black lines using ReferenceLine */}
            <ReferenceLine y={20} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={40} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={60} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={80} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={100} stroke="#22222255" strokeWidth={0.5} />
            <Bar
              dataKey="totalSales"
              fill="#FF991C" // Bar color
              barSize={14} // Width of each bar
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerMap;
