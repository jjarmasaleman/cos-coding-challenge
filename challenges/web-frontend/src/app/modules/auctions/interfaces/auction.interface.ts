import { Vehicle } from '@modules/auctions/interfaces/vehicle.interface';

export interface Auction {
  id: number;
  label: string;
  associatedVehicle: Vehicle;
  remainingTimeInSeconds: number;
  currentHighestBidValue: number;
  amIHighestBidder: boolean;
}
