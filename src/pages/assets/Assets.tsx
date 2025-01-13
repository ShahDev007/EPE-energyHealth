import { Radio, Wind, Sun } from "lucide-react";

const assetData = [
  {
    id: 1,
    name: "Main Transmission Substation",
    location: "Austin, TX",
    type: "substation",
    status: "operational",
    health: 94,
    efficiency: 91,
    voltage: "500kV",
    lastMaintenance: "2/10/2024",
    details: {
      transformerCount: 4,
      peakLoad: "450MW",
      backupStatus: "Ready",
    },
  },
  {
    id: 2,
    name: "West Texas Wind Farm",
    location: "Abilene, TX",
    type: "windFarm",
    status: "operational",
    health: 96,
    efficiency: 88,
    capacity: "200MW",
    lastMaintenance: "2/15/2024",
    details: {
      turbineCount: 100,
      averageWindSpeed: "15mph",
      currentOutput: "175MW",
    },
  },
  {
    id: 3,
    name: "South Solar Array",
    location: "San Antonio, TX",
    type: "solarFarm",
    status: "operational",
    health: 92,
    efficiency: 85,
    capacity: "100MW",
    lastMaintenance: "2/18/2024",
    details: {
      panelCount: 250000,
      dailyPeakOutput: "95MW",
      batteryStorage: "20MWh",
    },
  },
  {
    id: 4,
    name: "North Distribution Center",
    location: "Dallas, TX",
    type: "distributionCenter",
    status: "operational",
    health: 89,
    efficiency: 93,
    voltage: "230kV",
    lastMaintenance: "2/20/2024",
    details: {
      serviceArea: "2500 sq miles",
      customerCount: "1.2M",
      peakDemand: "320MW",
    },
  },
  {
    id: 5,
    name: "East Grid Storage Facility",
    location: "Houston, TX",
    type: "storage",
    status: "maintenance",
    health: 87,
    efficiency: 90,
    capacity: "50MWh",
    lastMaintenance: "3/01/2024",
    details: {
      batteryType: "Li-ion",
      chargeLevel: "85%",
      cycleCount: "1200",
    },
  },
  {
    id: 6,
    name: "Coastal Interconnection Station",
    location: "Corpus Christi, TX",
    type: "interconnection",
    status: "operational",
    health: 95,
    efficiency: 94,
    voltage: "345kV",
    lastMaintenance: "2/25/2024",
    details: {
      gridConnections: 3,
      powerFlow: "Bidirectional",
      backupSystems: "Active",
    },
  },
  {
    id: 7,
    name: "Gulf Energy Cogeneration Plant",
    location: "Galveston, TX",
    type: "powerPlant",
    status: "operational",
    health: 91,
    efficiency: 88,
    capacity: "750MW",
    lastMaintenance: "2/28/2024",
    details: {
      fuelType: "Natural Gas",
      steamOutput: "150 tons/hour",
      turbineCount: 3,
      emissionRating: "Grade A"
    }
  },
  {
    id: 8,
    name: "Central SCADA Control Facility",
    location: "Austin, TX",
    type: "controlCenter",
    status: "operational",
    health: 98,
    efficiency: 96,
    monitoredPoints: "15,000",
    lastMaintenance: "3/05/2024",
    details: {
      systemRedundancy: "N+2",
      backupPower: "Active",
      monitoredSubstations: 45,
      securityLevel: "Tier 4"
    }
  },
  {
    id: 9,
    name: "Rio Grande Valley Microgrid",
    location: "McAllen, TX",
    type: "microgrid",
    status: "operational",
    health: 93,
    efficiency: 89,
    capacity: "25MW",
    lastMaintenance: "3/02/2024",
    details: {
      renewableMix: "80%",
      batteryCapacity: "10MWh",
      connectedCustomers: 5000,
      islandingCapability: "Yes"
    }
  }
];

const Assets = () => {
  return (
    <div className="p-1">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Power Infrastructure Assets</h1>
        <p className="text-gray-600">
          Monitor and manage electrical power infrastructure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assetData.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {asset.type === "substation" && (
                  <Radio className="h-5 w-5 text-blue-500 mr-2" />
                )}
                {asset.type === "windFarm" && (
                  <Wind className="h-5 w-5 text-blue-500 mr-2" />
                )}
                {asset.type === "solarFarm" && (
                  <Sun className="h-5 w-5 text-blue-500 mr-2" />
                )}
                <h3 className="font-medium">{asset.name}</h3>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  asset.status === "operational"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {asset.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{asset.location}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Health</p>
                <p className="font-bold">{asset.health}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="font-bold">{asset.efficiency}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacity/Voltage</p>
                <p className="font-bold">{asset.voltage || asset.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Maintenance</p>
                <p className="font-bold">{asset.lastMaintenance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;