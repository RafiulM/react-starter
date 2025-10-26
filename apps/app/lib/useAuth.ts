/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { auth } from "@/lib/auth";
import type { AuthUser } from "better-auth/types";

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  signup: () => Promise<void>;
}

/**
 * Custom hook for authentication state management
 * Provides a clean interface for auth operations and state
 */
export function useAuth(): UseAuthReturn {
  const { data: session, isPending, error } = auth.useSession();

  const user = session?.user || null;
  const isAuthenticated = !!user;
  const isLoading = isPending;

  const login = async () => {
    // Navigate to login page or open login modal
    await auth.signIn.social({ provider: "google" });
  };

  const logout = async () => {
    await auth.signOut();
  };

  const signup = async () => {
    // Navigate to signup page or open signup modal
    window.location.href = "/signup";
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  };
}