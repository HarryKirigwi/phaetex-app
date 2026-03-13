"use client";

import { createContext, useContext } from "react";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export const AuthContext = createContext<{ user: AdminUser | null; logout: () => void }>({
  user: null,
  logout: () => {},
});

export function useAdmin() {
  return useContext(AuthContext);
}
