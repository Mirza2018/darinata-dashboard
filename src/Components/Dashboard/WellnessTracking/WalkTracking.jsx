import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Progress", value: 30 },
  { name: "Remaining", value: 70 },
]

const COLORS = ["#E57373", "#FFCDD2"]

const progressDots = [
  { active: true },
  { active: true },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
]

const WalkTracking = () => {
  return (
<div className="w-full max-w-md bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-normal text-red-500 mb-6">
          Steps tracking:
        </h2>
        <div className="flex flex-col items-center space-y-8">
          {/* Donut Chart */}
          <div className="relative w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">10,000</span>
              <span className="text-xl">Steps</span>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center  w-full max-w-sm px-4">
            {progressDots.map((dot, index) => (
              <div key={index} className="flex-1 flex items-center">
                <div
                  className={`size-3 aspect-square rounded-full ${
                    dot.active ? "bg-red-500" : "bg-gray-300"
                  }`}
                />
                {/* {index < progressDots.length - 1 && (
                  <div
                    className={`h-[2px]  flex-1 ${
                      dot.active && progressDots[index + 1].active
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  />
                )} */}

                <div className="h-[5px] w-full bg-gray-300" />

                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkTracking;
