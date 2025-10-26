/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button } from "@repo/ui";
import { Link } from "@tanstack/react-router";
import {
  Home,
  Settings,
  Users,
  Activity,
  FileText,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { BrandIcon } from "@/components/BrandIcon";

// Navigation links configuration
const navigationLinks = [
  { icon: Home, label: "Dashboard", to: "/" },
  { icon: Activity, label: "Analytics", to: "/analytics" },
  { icon: Users, label: "Users", to: "/users" },
  { icon: FileText, label: "Reports", to: "/reports" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get authentication state
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
              <BrandIcon
                size="md"
                ariaLabel="Console - Home"
                className="transition-transform hover:scale-105"
              />
              <span className="font-semibold text-lg">Console</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
                }}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full"
                  activeProps={{
                    className: "bg-accent text-accent-foreground",
                  }}
                  onClick={handleLinkClick}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Authentication */}
            <div className="px-2 pt-4 pb-3 border-t">
              {isLoading ? (
                <div className="px-3 py-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.name || user?.email}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                    onClick={handleLinkClick}
                  >
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                    onClick={handleLinkClick}
                  >
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                    onClick={handleLinkClick}
                  >
                    <Link to="/signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}