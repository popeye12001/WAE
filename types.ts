
export enum View {
  OVERVIEW = 'OVERVIEW',
  IMPLEMENTATION = 'IMPLEMENTATION',
  SIMULATOR = 'SIMULATOR',
  SECURITY = 'SECURITY',
  UI_FLOW = 'UI_FLOW'
}

export interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'active' | 'idle' | 'transmitting';
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  type: 'text' | 'voice' | 'system';
  isEncrypted: boolean;
}
