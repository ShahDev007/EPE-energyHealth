export interface PerformanceMetric {
    timestamp: string;
    powerUsage: number;
    efficiency: number;
  }
  
  export const powerUsageData: PerformanceMetric[] = [
    { timestamp: "00:00", powerUsage: 320, efficiency: 85 },
    { timestamp: "04:00", powerUsage: 280, efficiency: 88 },
    { timestamp: "08:00", powerUsage: 420, efficiency: 82 },
    { timestamp: "12:00", powerUsage: 520, efficiency: 84 },
    { timestamp: "16:00", powerUsage: 480, efficiency: 86 },
    { timestamp: "20:00", powerUsage: 380, efficiency: 87 }
  ];