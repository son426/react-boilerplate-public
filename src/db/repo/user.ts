import { createCollection, type BaseEntity } from "../helper";

export interface User extends BaseEntity {
  email: string;
  name: string;
  photoUrl?: string;
  role: "admin" | "user";
  lastLoginAt?: string;
}

export const userRepo = createCollection<User>("user");
