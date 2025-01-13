import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Zap, AlertTriangle } from 'lucide-react';
import InfrastructureMap from '../../components/map/MapView';

// Simple mock data
const powerUsageData = [
  { time: '00:00', usage: 320, efficiency: 85 },
  { time: '04:00', usage: 280, efficiency: 88 },
  { time: '08:00', usage: 420, efficiency: 82 },
  { time: '12:00', usage: 520, efficiency: 84 },
  { time: '16:00', usage: 480, efficiency: 86 },
  { time: '20:00', usage: 380, efficiency: 87 }
];

const Dashboard = () => {
  return (
    <div className="p-1 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Infrastructure Dashboard</h1>
        <p className="text-gray-600">Monitor power infrastructure performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">System Health</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">92%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Power Efficiency</h3>
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold mt-2">87%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Active Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
      </div>

      {/* Map and Chart */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-lg p-2 shadow-sm">
          <h3 className="text-lg font-medium mb-3 ml-2">Infrastructure Map</h3>
          <div className="h-[600px] mt-3">
            <InfrastructureMap />
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg p-6 pl-0 shadow-sm">
          <h3 className="text-lg font-medium mb-4 ml-9">Power Usage & Efficiency</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="130%">
              <LineChart data={powerUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#8884d8" name="Power Usage (kW)" />
                <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;