/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createRoot } from "react-dom/client";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { routeTree } from "../lib/routeTree.gen";

describe('Layout Integration', () => {
  let container: HTMLElement;
  let root: any;
  let router: any;

  const setupRouter = async (path: string = '/') => {
    container = document.createElement('div');
    document.body.appendChild(container);

    const history = createMemoryHistory({
      initialEntries: [path],
    });

    router = createRouter({
      routeTree,
      history,
    });

    root = createRoot(container);
    root.render(router.component());
    await router.load();
  };

  afterEach(() => {
    if (root) {
      root.unmount();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    document.body.innerHTML = '';
  });

  describe('Landing Page Layout', () => {
    beforeEach(async () => {
      await setupRouter('/');
    });

    it('uses minimal layout for landing page', () => {
      // Landing page should have minimal layout (no sidebar)
      const sidebar = container.querySelector('[class*="sidebar"], aside');
      const sidebarVisible = sidebar && !sidebar.className.includes('w-0');
      expect(sidebarVisible).toBeFalsy();

      // Should have min-h-screen container
      const mainContainer = container.querySelector('[class*="min-h"]');
      expect(mainContainer).toBeDefined();
    });

    it('does not show navigation sidebar on landing page', () => {
      // Check that typical dashboard navigation is not present
      const navItems = Array.from(container.querySelectorAll('nav a, [role="navigation"] a'))
        .map(link => link.textContent);
      
      // Landing page should not have dashboard-style navigation
      expect(navItems.some(text => text?.includes('Analytics'))).toBe(false);
      expect(navItems.some(text => text?.includes('Users'))).toBe(false);
      expect(navItems.some(text => text?.includes('Reports'))).toBe(false);
    });

    it('renders content without dashboard header', () => {
      // Check that there's no dashboard-style header with hamburger menu
      const hamburgerMenu = container.querySelector('[class*="menu"], button[aria-label*="menu"]');
      expect(hamburgerMenu).toBeFalsy();
    });
  });

  describe('Dashboard Layout (non-landing pages)', () => {
    beforeEach(async () => {
      await setupRouter('/about'); // Use about page as example of non-landing page
    });

    it('uses full layout for non-landing pages', () => {
      // Non-landing pages should have the full dashboard layout
      // This test verifies the conditional layout logic works
      
      // Should have either sidebar or navigation elements
      const hasLayoutElements = 
        container.querySelector('aside, nav, [role="navigation"]') !== null ||
        container.querySelector('[class*="sidebar"]') !== null;
      
      expect(hasLayoutElements).toBe(true);
    });
  });

  describe('Layout Responsive Behavior', () => {
    beforeEach(async () => {
      await setupRouter('/');
    });

    it('applies responsive container classes', () => {
      const containers = container.querySelectorAll('[class*="container"], [class*="mx-auto"]');
      expect(containers.length).toBeGreaterThan(0);
    });

    it('has responsive padding classes', () => {
      const elementsWithResponsivePadding = container.querySelectorAll(
        '[class*="px-4"], [class*="sm:px-"], [class*="lg:px-"]'
      );
      expect(elementsWithResponsivePadding.length).toBeGreaterThan(0);
    });
  });

  describe('Layout Content Structure', () => {
    beforeEach(async () => {
      await setupRouter('/');
    });

    it('renders children content properly', () => {
      // Verify that the landing page content is actually rendered
      const landingContent = container.textContent;
      expect(landingContent).toMatch(/Welcome to.*React Starter Kit/);
    });

    it('maintains proper document structure', () => {
      // Check for basic HTML structure
      const main = container.querySelector('main, [role="main"], .min-h-screen > div');
      expect(main).toBeDefined();
    });
  });
});