export enum Roles {
  USER = "user",
  ADMIN = "admin"
}

export type User = {
  id: string;
  email: string;
  role: keyof typeof Roles;
};

export type Event = {
  uid: string,
  start: string,
  end: string,
  summary: string,
  description: string,
  allDay: boolean,
}
