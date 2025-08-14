/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Extend Vitest's expect with custom matchers if needed
// This would require @testing-library/jest-dom but we'll implement basic ones

// Custom matchers for accessibility testing
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined && document.contains(received);
    if (pass) {
      return {
        message: () => `expected element not to be in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to be in the document`,
        pass: false,
      };
    }
  },

  toHaveAccessibleName(received) {
    if (!(received instanceof Element)) {
      return {
        message: () => `expected ${received} to be an Element`,
        pass: false,
      };
    }

    const accessibleName = received.getAttribute('aria-label') || 
                          received.getAttribute('aria-labelledby') ||
                          received.textContent ||
                          received.getAttribute('alt') ||
                          received.getAttribute('title');
    
    const pass = Boolean(accessibleName && accessibleName.trim().length > 0);
    
    if (pass) {
      return {
        message: () => `expected element not to have accessible name`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have accessible name`,
        pass: false,
      };
    }
  },

  toHaveAttribute(received, attribute, value) {
    if (!(received instanceof Element)) {
      return {
        message: () => `expected ${received} to be an Element`,
        pass: false,
      };
    }

    const hasAttribute = received.hasAttribute(attribute);
    if (value === undefined) {
      return {
        message: () => hasAttribute ? 
          `expected element not to have attribute ${attribute}` :
          `expected element to have attribute ${attribute}`,
        pass: hasAttribute,
      };
    }

    const attributeValue = received.getAttribute(attribute);
    const pass = attributeValue === value;
    
    return {
      message: () => pass ? 
        `expected element not to have attribute ${attribute} with value ${value}` :
        `expected element to have attribute ${attribute} with value ${value}, but got ${attributeValue}`,
      pass,
    };
  },
});

// Clean up after each test
afterEach(() => {
  cleanup();
});