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
      coordinates: [-94.5786, 39.0997], 
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 92,
      efficiency: 87,
      uptime: 99.2,
    },
  },
  {
    id: "SF001",
    name: "Solar Farm Beta",
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
    name: "West Texas Wind Farm",
    location: {
      coordinates: [-101.8313, 32.4487], // Midland, TX
    },
    type: "windFarm",
    status: "operational",
    metrics: {
      health: 88,
      efficiency: 92,
      uptime: 98.5,
    },
  },
  {
    id: "SS001",
    name: "Houston Main Substation",
    location: {
      coordinates: [-95.3698, 29.7604], // Houston
    },
    type: "substation",
    status: "maintenance",
    metrics: {
      health: 78,
      efficiency: 85,
      uptime: 95.5,
    },
  },
  {
    id: "PP002",
    name: "Dallas Power Center",
    location: {
      coordinates: [-96.7970, 32.7767], // Dallas
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 90,
      efficiency: 88,
      uptime: 98.9,
    },
  },
  {
    id: "SF002",
    name: "New Mexico Solar Array",
    location: {
      coordinates: [-106.6504, 35.0844], // Albuquerque
    },
    type: "solarFarm",
    status: "operational",
    metrics: {
      health: 96,
      efficiency: 91,
      uptime: 99.5,
    },
  },
  {
    id: "SS002",
    name: "Austin Distribution Hub",
    location: {
      coordinates: [-97.7431, 30.2672], // Austin
    },
    type: "substation",
    status: "operational",
    metrics: {
      health: 94,
      efficiency: 90,
      uptime: 99.1,
    },
  },
  {
    id: "WF002",
    name: "Oklahoma Wind Complex",
    location: {
      coordinates: [-97.5164, 35.4676], // Oklahoma City
    },
    type: "windFarm",
    status: "maintenance",
    metrics: {
      health: 82,
      efficiency: 84,
      uptime: 96.8,
    },
  },
  {
    id: "PP003",
    name: "San Antonio Power Station",
    location: {
      coordinates: [-98.4936, 29.4241], // San Antonio
    },
    type: "powerPlant",
    status: "operational",
    metrics: {
      health: 91,
      efficiency: 86,
      uptime: 98.7,
    },
  },
  {
    id: "SS003",
    name: "El Paso Grid Center",
    location: {
      coordinates: [-106.4850, 31.7619], // El Paso
    },
    type: "substation",
    status: "offline",
    metrics: {
      health: 65,
      efficiency: 72,
      uptime: 85.5,
    },
  }
];


interface Connection {
  from: string;  // Asset ID
  to: string;    // Asset ID
  voltage: "138kV" | "230kV" | "500kV";
}

export const transmissionLines: Connection[] = [
  {
    from: "PP001", // Power Plant Alpha
    to: "SS001",   // Houston Main Substation
    voltage: "500kV"
  },
  {
    from: "PP002", // Dallas Power Center
    to: "SS002",   // Austin Distribution Hub
    voltage: "230kV"
  },
  {
    from: "SF002", // New Mexico Solar Array
    to: "SS003",   // El Paso Grid Center
    voltage: "138kV"
  }
  // Add more connections...
];