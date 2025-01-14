import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    2024: 4000,
    2023: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    2024: 3000,
    2023: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    2024: 2000,
    2023: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    2024: 2780,
    2023: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    2024: 1890,
    2023: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    2024: 2390,
    2023: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    2024: 3490,
    2023: 4300,
    amt: 2100,
  },
];

const HealthTrends = () => {
  return (
    <div className="bg-[#F7F8F8] rounded-lg shadow h-fit">
      <h1 className="text-2xl font-normal text-secondary-color mb-6 ">
        Health Trends:
      </h1>
      <div className="bg-white rounded-lg m-8 p-8">
        <div style={{ width: "100%", height: "400px" }}>
          <div className="w-full">
            <div className="relative">
              <h2 className="text-xl font-bold pb-2">Recent Lab</h2>
              {/* Full width gray line */}
              <div className="absolute bottom-0 w-full h-[1px] bg-gray-200" />
              {/* Short cyan line */}
              <div className="absolute bottom-0 w-12 h-1 bg-cyan-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="2023" stackId="a" fill="#8CDAAA" />
              <Bar dataKey="2024" stackId="a" fill="#6FD195" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthTrends;
