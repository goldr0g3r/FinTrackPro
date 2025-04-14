import { UUID } from 'crypto';

export interface IUserSession {
  session?: [];
}

export interface IUserSessionDevice {
  deviceId: UUID;
  deviceName: string;
  deviceType: string;
  lastLogin: Date;
  lastLogout: Date;
  isActive: boolean;
  ipAddress: string;
  userAgent: string;
}
