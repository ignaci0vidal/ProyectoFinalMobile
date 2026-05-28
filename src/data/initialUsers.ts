import { AppUser } from "../types/user";

export const initialUsers: AppUser[] = [
  {
    id: "admin",
    name: "Admin",
    email: "admin@mikitchen.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "demo",
    name: "Usuario Demo",
    email: "demo@mikitchen.com",
    password: "123456",
    role: "user",
  },
];
