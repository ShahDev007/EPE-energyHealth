export interface Asset {
    id: string;
    name: string;
    type: 'powerPlant' | 'substation' | 'transmissionLine';
    location: {
      lat: number;
      lng: number;
    };
    status: 'operational' | 'maintenance' | 'offline';
    health: number;
    efficiency: number;
  }
  
  export interface Alert {
    id: string;
    type: 'warning' | 'critical' | 'info';
    message: string;
    timestamp: Date;
    assetId: string;
  }