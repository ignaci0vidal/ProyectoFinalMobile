export type UserRole = "user" | "admin";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string; // en una app real no se hardcodearía la contraseña, se manejaría de forma segura
  role: UserRole;
};
