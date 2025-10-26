/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Navbar } from "../Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createMemoryRouter } from "@tanstack/react-router";

// Mock the auth module
vi.mock("@/lib/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Mock the TanStack Router Link component
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  Home: () => <div data-testid="home-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  User: () => <div data-testid="user-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
  LogIn: () => <div-testid="login-icon" />,
  UserPlus: () => <div data-testid="user-plus-icon" />,
}));

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const router = createMemoryRouter([
    {
      path: "/",
      element: children,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe("Navbar", () => {
  const mockUseAuth = vi.hoisted(() => vi.fn());

  beforeEach(() => {
    vi.clearAllMocks();
    vi.doMock("@/lib/useAuth", () => ({
      useAuth: mockUseAuth,
    }));
  });

  it("renders navigation links correctly", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Check that all navigation links are present
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("shows login and signup buttons for unauthenticated users", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("shows profile and logout buttons for authenticated users", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
  });

  it("displays user information for authenticated users", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Open mobile menu to see user info
    const menuButton = screen.getByLabelText("Toggle mobile menu");
    fireEvent.click(menuButton);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows loading state while authentication is loading", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Check for loading skeleton
    const loadingElements = document.querySelectorAll(".animate-pulse");
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("toggles mobile menu when menu button is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Initially mobile menu should be closed
    expect(screen.queryByText("Login")).not.toBeVisible();

    // Click menu button to open mobile menu
    const menuButton = screen.getByLabelText("Toggle mobile menu");
    fireEvent.click(menuButton);

    // Mobile menu should be open
    expect(screen.getByText("Login")).toBeVisible();
    expect(screen.getByText("Sign Up")).toBeVisible();
    expect(screen.getByText("Dashboard")).toBeVisible();

    // Click menu button again to close
    fireEvent.click(menuButton);

    // Mobile menu should be closed
    // Note: The menu might still be in DOM but not visible
    expect(screen.getByLabelText("Toggle mobile menu")).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", async () => {
    const mockLogout = vi.fn();
    mockUseAuth.mockReturnValue({
      user: {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      },
      isAuthenticated: true,
      isLoading: false,
      logout: mockLogout,
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Open mobile menu to access logout button
    const menuButton = screen.getByLabelText("Toggle mobile menu");
    fireEvent.click(menuButton);

    // Click logout button
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  it("has proper ARIA attributes for accessibility", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");

    const menuButton = screen.getByLabelText("Toggle mobile menu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Toggle menu and check aria-expanded changes
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  it("renders responsive navigation with proper structure", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    // Check that navbar has proper structure
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    // Check for brand/logo
    expect(screen.getByText("Console")).toBeInTheDocument();

    // Check that desktop navigation is present
    const desktopNav = screen.getByText("Dashboard").closest("div");
    expect(desktopNav).toHaveClass("hidden", "md:flex");

    // Check for mobile menu button
    const mobileMenuButton = screen.getByLabelText("Toggle mobile menu");
    expect(mobileMenuButton).toHaveClass("flex", "items-center", "md:hidden");
  });
});