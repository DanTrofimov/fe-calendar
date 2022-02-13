export enum Roles {
  USER = "user",
  ADMIN = "admin"
}

export type User = {
  id: string;
  email: string;
  role: keyof typeof Roles;
};
