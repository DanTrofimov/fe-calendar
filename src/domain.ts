export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN"
}

export type User = {
  id: string;
  email: string;
  role: keyof typeof Roles;
};
