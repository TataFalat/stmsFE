export enum WaypointType {
  Delivery = 0,
  Pickup = 1
}

export type TWaypoint = {
  id?: number;
  location?: string;
  street?: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  type: WaypointType;
}

export type TOrder = {
  id?: number;
  number: string;
  customerName: string;
  date: string; // string used to simplify manipulation
  waypoints: TWaypoint[];
}

export type TOrderFilter = {
  number: string;
  customerName: string;
  date: string; // string used to simplify manipulation
}
