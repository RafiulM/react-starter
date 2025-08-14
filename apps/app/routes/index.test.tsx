/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createRoot } from "react-dom/client";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { routeTree } from "../lib/routeTree.gen";

describe('Landing Page', () => {
  let container: HTMLElement;
  let root: any;
  let router: any;

  beforeEach(async () => {
    // Create test container
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create test router
    const history = createMemoryHistory({
      initialEntries: ['/'],
    });

    router = createRouter({
      routeTree,
      history,
    });

    // Render the router
    root = createRoot(container);
    root.render(router.component());

    // Wait for router to settle
    await router.load();
  });

  afterEach(() => {
    if (root) {
      root.unmount();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    document.body.innerHTML = '';
  });

  describe('Content Rendering', () => {
    it('renders the main welcome heading', () => {
      const heading = container.querySelector('h1');
      expect(heading).toBeDefined();
      expect(heading?.textContent).toMatch(/Welcome to.*React Starter Kit/);
    });

    it('renders the project description', () => {
      const description = container.querySelector('p');
      expect(description).toBeDefined();
      expect(description?.textContent).toMatch(/production-ready, full-stack web application template/);
    });

    it('renders feature section', () => {
      const featuresHeading = Array.from(container.querySelectorAll('h2'))
        .find(h2 => h2.textContent?.includes('Built for Modern Development'));
      expect(featuresHeading).toBeDefined();

      // Check for feature cards
      const featureHeadings = Array.from(container.querySelectorAll('h3, h4, .font-semibold'))
        .map(el => el.textContent);
      
      expect(featureHeadings.some(text => text?.includes('Production-Ready'))).toBe(true);
      expect(featureHeadings.some(text => text?.includes('Edge-First Architecture'))).toBe(true);
      expect(featureHeadings.some(text => text?.includes('Developer Experience'))).toBe(true);
      expect(featureHeadings.some(text => text?.includes('Lightning Fast'))).toBe(true);
    });

    it('renders navigation section', () => {
      const navHeading = Array.from(container.querySelectorAll('h2'))
        .find(h2 => h2.textContent?.includes('Explore the Platform'));
      expect(navHeading).toBeDefined();

      // Check for navigation cards
      const navItems = Array.from(container.querySelectorAll('h3, .text-lg.font-semibold'))
        .map(el => el.textContent);
      
      expect(navItems.some(text => text?.includes('About'))).toBe(true);
      expect(navItems.some(text => text?.includes('Documentation'))).toBe(true);
      expect(navItems.some(text => text?.includes('API Demo'))).toBe(true);
    });

    it('renders call-to-action section', () => {
      const ctaHeading = Array.from(container.querySelectorAll('h2'))
        .find(h2 => h2.textContent?.includes('Ready to Build Something Amazing'));
      expect(ctaHeading).toBeDefined();

      const ctaText = container.querySelector('p');
      expect(ctaText?.textContent).toMatch(/join thousands of developers/i);
    });
  });

  describe('Navigation Links', () => {
    it('has internal navigation links', () => {
      const links = container.querySelectorAll('a[href="/about"]');
      expect(links.length).toBeGreaterThan(0);
    });

    it('has external GitHub links with proper attributes', () => {
      const githubLinks = Array.from(container.querySelectorAll('a'))
        .filter(link => link.getAttribute('href')?.includes('github.com'));
      
      expect(githubLinks.length).toBeGreaterThan(0);
      
      githubLinks.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });

    it('has action buttons with proper text', () => {
      const allLinks = Array.from(container.querySelectorAll('a'));
      const linkTexts = allLinks.map(link => link.textContent?.toLowerCase() || '');
      
      expect(linkTexts.some(text => text.includes('get started'))).toBe(true);
      expect(linkTexts.some(text => text.includes('learn more'))).toBe(true);
      expect(linkTexts.some(text => text.includes('view on github'))).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const h1s = container.querySelectorAll('h1');
      const h2s = container.querySelectorAll('h2');
      const h3s = container.querySelectorAll('h3');
      
      expect(h1s.length).toBe(1); // Only one main heading
      expect(h2s.length).toBeGreaterThan(0); // Section headings
      expect(h3s.length).toBeGreaterThan(0); // Subsection headings
    });

    it('has accessible link text', () => {
      const links = Array.from(container.querySelectorAll('a'));
      
      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0;
        const hasAriaLabel = link.getAttribute('aria-label');
        const hasAccessibleName = hasText || hasAriaLabel;
        
        expect(hasAccessibleName).toBe(true);
      });
    });

    it('has semantic HTML structure', () => {
      // Check for semantic sections
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
      
      // Check for proper button/link structure
      const buttons = container.querySelectorAll('button, [role="button"]');
      const links = container.querySelectorAll('a');
      expect(buttons.length + links.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design Classes', () => {
    it('applies responsive text sizing', () => {
      const mainHeading = container.querySelector('h1');
      expect(mainHeading?.className).toMatch(/(text-\w+)|(sm:text-\w+)|(md:text-\w+)|(lg:text-\w+)/);
    });

    it('applies responsive layout classes', () => {
      const gridElements = container.querySelectorAll('[class*="grid"]');
      expect(gridElements.length).toBeGreaterThan(0);
      
      // Check for responsive grid classes
      const hasResponsiveGrid = Array.from(gridElements).some(el => 
        el.className.includes('md:grid-cols') || el.className.includes('lg:grid-cols')
      );
      expect(hasResponsiveGrid).toBe(true);
    });

    it('applies responsive spacing', () => {
      const elementsWithPadding = container.querySelectorAll('[class*="p-"], [class*="px-"], [class*="py-"]');
      const elementsWithMargin = container.querySelectorAll('[class*="m-"], [class*="mx-"], [class*="my-"]');
      
      expect(elementsWithPadding.length + elementsWithMargin.length).toBeGreaterThan(0);
    });
  });

  describe('Visual Design Elements', () => {
    it('has gradient backgrounds', () => {
      const gradientElements = container.querySelectorAll('[class*="gradient"]');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('has hover effects', () => {
      const hoverElements = container.querySelectorAll('[class*="hover:"]');
      expect(hoverElements.length).toBeGreaterThan(0);
    });

    it('has card components', () => {
      // Look for card-like elements (could be divs with card classes or actual Card components)
      const cardElements = container.querySelectorAll('[class*="card"], .border, .rounded');
      expect(cardElements.length).toBeGreaterThan(0);
    });

    it('has icon elements', () => {
      // Check for SVG icons or icon containers
      const icons = container.querySelectorAll('svg, [class*="icon"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('contains expected feature descriptions', () => {
      const allText = container.textContent || '';
      
      expect(allText).toMatch(/battle-tested/i);
      expect(allText).toMatch(/edge.*performance/i);
      expect(allText).toMatch(/typescript/i);
      expect(allText).toMatch(/vite.*bun/i);
    });

    it('contains expected navigation descriptions', () => {
      const allText = container.textContent || '';
      
      expect(allText).toMatch(/learn more about react starter kit/i);
      expect(allText).toMatch(/comprehensive guides/i);
      expect(allText).toMatch(/explore.*api.*real-time/i);
    });

    it('contains call-to-action content', () => {
      const allText = container.textContent || '';
      
      expect(allText).toMatch(/ready to build something amazing/i);
      expect(allText).toMatch(/thousands of developers/i);
    });
  });

  describe('Router Integration', () => {
    it('loads the correct route component', () => {
      expect(router.state.location.pathname).toBe('/');
    });

    it('is ready for navigation', () => {
      expect(router.state.isLoading).toBe(false);
    });
  });
});