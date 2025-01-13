export interface PowerAsset {
  id: string;
  name: string;
  location: {
    coordinates: [number, number];
  };
  type: "powerPlant" | "solarFarm" | "windFarm" | "substation";
  status: "operational" | "maintenance" | "offline";
  metrics: {
    health: number;
    efficiency: number;
    uptime: number;
  };
}

export const powerAssets: PowerAsset[] = [
  {
    id: "PP001",
    name: "Power Plant Alpha",
    location: {
      coordinates: [-94.5786, 39.0997], // Kansas City
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 92,
      efficiency: 87,
      uptime: 99.2,
    },
  },
  // Add these to your existing powerAssets array
  {
    id: "PP004",
    name: "Louisiana Power Hub",
    location: {
      coordinates: [-91.1871, 30.4515], // Baton Rouge
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 88,
      efficiency: 83,
      uptime: 97.5,
    },
  },
  {
    id: "SF003",
    name: "Colorado Solar Valley",
    location: {
      coordinates: [-104.8214, 39.7392], // Denver
    },
    type: "solarFarm",
    status: "operational",
    metrics: {
      health: 94,
      efficiency: 88,
      uptime: 98.9,
    },
  },
  {
    id: "SS004",
    name: "Mississippi Delta Grid",
    location: {
      coordinates: [-90.1848, 32.2988], // Jackson
    },
    type: "substation",
    status: "maintenance",
    metrics: {
      health: 76,
      efficiency: 81,
      uptime: 94.2,
    },
  },
  {
    id: "WF003",
    name: "Kansas Prairie Winds",
    location: {
      coordinates: [-97.3375, 37.6872], // Wichita
    },
    type: "windFarm",
    status: "operational",
    metrics: {
      health: 92,
      efficiency: 87,
      uptime: 98.7,
    },
  },
  {
    id: "SS005",
    name: "Arkansas Power Exchange",
    location: {
      coordinates: [-92.2896, 34.7465], // Little Rock
    },
    type: "substation",
    status: "operational",
    metrics: {
      health: 90,
      efficiency: 85,
      uptime: 97.8,
    },
  },
  {
    id: "SF001",
    name: "Desert Solar Array",
    location: {
      coordinates: [-112.074, 33.4484], // Phoenix
    },
    type: "solarFarm",
    status: "operational",
    metrics: {
      health: 95,
      efficiency: 89,
      uptime: 99.8,
    },
  },
  {
    id: "WF001",
    name: "Texas Plains Wind Farm",
    location: {
      coordinates: [-101.8313, 32.4487], // Midland
    },
    type: "windFarm",
    status: "operational",
    metrics: {
      health: 93,
      efficiency: 85,
      uptime: 98.5,
    },
  },
  {
    id: "SS001",
    name: "Houston Distribution Hub",
    location: {
      coordinates: [-95.3698, 29.7604], // Houston
    },
    type: "substation",
    status: "maintenance",
    metrics: {
      health: 78,
      efficiency: 82,
      uptime: 95.5,
    },
  },
  {
    id: "PP002",
    name: "Gulf Coast Generator",
    location: {
      coordinates: [-97.4467, 27.8006], // Corpus Christi
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 89,
      efficiency: 84,
      uptime: 97.8,
    },
  },
  {
    id: "SS002",
    name: "Austin Grid Center",
    location: {
      coordinates: [-97.7431, 30.2672], // Austin
    },
    type: "substation",
    status: "operational",
    metrics: {
      health: 94,
      efficiency: 88,
      uptime: 99.1,
    },
  },
  {
    id: "SF002",
    name: "New Mexico Solar Complex",
    location: {
      coordinates: [-106.6504, 35.0844], // Albuquerque
    },
    type: "solarFarm",
    status: "maintenance",
    metrics: {
      health: 82,
      efficiency: 79,
      uptime: 94.5,
    },
  },
  {
    id: "WF002",
    name: "Oklahoma Wind Center",
    location: {
      coordinates: [-97.5164, 35.4676], // Oklahoma City
    },
    type: "windFarm",
    status: "operational",
    metrics: {
      health: 91,
      efficiency: 86,
      uptime: 98.2,
    },
  },
];

interface Connection {
  from: string; // Asset ID
  to: string; // Asset ID
  voltage: "138kV" | "230kV" | "500kV";
}

export const transmissionLines: Connection[] = [
  {
    from: "PP001",
    to: "SS001",
    voltage: "500kV",
  },
  {
    from: "SF001",
    to: "SS002",
    voltage: "230kV",
  },
  {
    from: "WF001",
    to: "SS001",
    voltage: "230kV",
  },
  {
    from: "PP002",
    to: "SS002",
    voltage: "500kV",
  },
  {
    from: "SF002",
    to: "SS001",
    voltage: "138kV",
  },
];
