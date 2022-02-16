export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface User {
  id: string;
  email: string;
  role: keyof typeof Roles;
}

export interface Event {
  uid?: string;
  _id?: string;
  start: string;
  end: string;
  summary: string;
  description: string;
  allDay: boolean;
  location: string;
}

