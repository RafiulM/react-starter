/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useState, useMemo } from "react";

interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  keywords?: string[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export function useDocumentationSearch(navigationItems: NavigationSection[], searchQuery: string) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return navigationItems;
    }

    const query = searchQuery.toLowerCase();
    const filteredSections: NavigationSection[] = [];

    navigationItems.forEach((section) => {
      const filteredItems = section.items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords?.some(keyword => 
          keyword.toLowerCase().includes(query)
        );
        const hrefMatch = item.href.toLowerCase().includes(query);
        
        return titleMatch || keywordMatch || hrefMatch;
      });

      if (filteredItems.length > 0) {
        filteredSections.push({
          ...section,
          items: filteredItems,
        });
      }
    });

    return filteredSections;
  }, [navigationItems, searchQuery]);

  const allItems = useMemo(() => {
    return searchResults.flatMap(section => section.items);
  }, [searchResults]);

  const navigateToHighlighted = () => {
    if (highlightedIndex >= 0 && highlightedIndex < allItems.length) {
      return allItems[highlightedIndex];
    }
    return null;
  };

  const moveHighlight = (direction: 'up' | 'down') => {
    if (allItems.length === 0) return;

    if (direction === 'down') {
      setHighlightedIndex(prev => 
        prev >= allItems.length - 1 ? 0 : prev + 1
      );
    } else {
      setHighlightedIndex(prev => 
        prev <= 0 ? allItems.length - 1 : prev - 1
      );
    }
  };

  const resetHighlight = () => {
    setHighlightedIndex(-1);
  };

  return {
    searchResults,
    allItems,
    highlightedIndex,
    navigateToHighlighted,
    moveHighlight,
    resetHighlight,
    hasResults: searchResults.length > 0,
    totalResults: allItems.length,
  };
}