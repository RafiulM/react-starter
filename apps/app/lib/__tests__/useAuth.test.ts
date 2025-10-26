/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "../useAuth";

// Mock the auth module
vi.mock("../auth", () => ({
  auth: {
    useSession: vi.fn(),
    signIn: {
      social: vi.fn(),
    },
    signOut: vi.fn(),
  },
}));

describe("useAuth", () => {
  const mockAuth = {
    useSession: vi.fn(),
    signIn: {
      social: vi.fn(),
    },
    signOut: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.doMock("../auth", () => ({
      auth: mockAuth,
    }));
  });

  it("returns correct authentication state for authenticated user", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    mockAuth.useSession.mockReturnValue({
      data: { user: mockUser },
      isPending: false,
      error: null,
    });

    const { user, isAuthenticated, isLoading } = useAuth();

    expect(user).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
    expect(isLoading).toBe(false);
  });

  it("returns correct authentication state for unauthenticated user", () => {
    mockAuth.useSession.mockReturnValue({
      data: { user: null },
      isPending: false,
      error: null,
    });

    const { user, isAuthenticated, isLoading } = useAuth();

    expect(user).toBe(null);
    expect(isAuthenticated).toBe(false);
    expect(isLoading).toBe(false);
  });

  it("returns loading state when session is pending", () => {
    mockAuth.useSession.mockReturnValue({
      data: { user: null },
      isPending: true,
      error: null,
    });

    const { user, isAuthenticated, isLoading } = useAuth();

    expect(user).toBe(null);
    expect(isAuthenticated).toBe(false);
    expect(isLoading).toBe(true);
  });

  it("provides logout function that calls auth.signOut", async () => {
    mockAuth.useSession.mockReturnValue({
      data: { user: null },
      isPending: false,
      error: null,
    });

    mockAuth.signOut.mockResolvedValue(undefined);

    const { logout } = useAuth();

    await logout();

    expect(mockAuth.signOut).toHaveBeenCalledTimes(1);
  });

  it("provides login function that calls auth.signIn.social", async () => {
    mockAuth.useSession.mockReturnValue({
      data: { user: null },
      isPending: false,
      error: null,
    });

    mockAuth.signIn.social.mockResolvedValue(undefined);

    const { login } = useAuth();

    await login();

    expect(mockAuth.signIn.social).toHaveBeenCalledWith({
      provider: "google",
    });
  });

  it("provides signup function that navigates to signup page", () => {
    const originalLocation = window.location.href;

    mockAuth.useSession.mockReturnValue({
      data: { user: null },
      isPending: false,
      error: null,
    });

    // Mock window.location
    delete (window as any).location;
    (window as any).location = { href: "" };

    const { signup } = useAuth();

    signup();

    expect(window.location.href).toBe("/signup");

    // Restore original location
    (window as any).location.href = originalLocation;
  });
});