import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, Zap, Activity, AlertTriangle } from "lucide-react";

const gridPerformanceData = [
  { month: "Jan", transmission_efficiency: 95, power_quality: 92 },
  { month: "Feb", transmission_efficiency: 94, power_quality: 93 },
  { month: "Mar", transmission_efficiency: 96, power_quality: 94 },
  { month: "Apr", transmission_efficiency: 95, power_quality: 92 },
  { month: "May", transmission_efficiency: 93, power_quality: 91 },
  { month: "Jun", transmission_efficiency: 94, power_quality: 93 },
];

const Analytics = () => {
  return (
    <div className="p-1">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Power Analytics</h1>
        <p className="text-gray-600">
          Power grid performance and efficiency metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600">Grid Reliability</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">99.9%</p>
          <p className="text-sm text-green-600">↑ 0.2% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600">Power Quality</h3>
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">95.2%</p>
          <p className="text-sm text-green-600">↑ 1.5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600">Peak Load</h3>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">850 MW</p>
          <p className="text-sm text-gray-600">Daily Maximum</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600">Active Issues</h3>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-green-600">↓ 3 from last week</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Grid Performance Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gridPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="transmission_efficiency"
                  stroke="#8884d8"
                  name="Transmission Efficiency %"
                />
                <Line
                  type="monotone"
                  dataKey="power_quality"
                  stroke="#82ca9d"
                  name="Power Quality Index"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">
            Power Source Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { source: "Solar", percentage: 35 },
                  { source: "Wind", percentage: 45 },
                  { source: "Conventional", percentage: 20 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="percentage"
                  fill="#8884d8"
                  name="Distribution %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
