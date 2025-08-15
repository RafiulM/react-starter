/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
  threshold?: number;
}

export function useScrollSpy(
  sectionIds: string[],
  options: ScrollSpyOptions = {}
) {
  const { offset = 0, rootMargin = '0px 0px -80% 0px', threshold = 0 } = options;
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id.replace('#', '')))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting and has the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length === 0) return;

        // Sort by intersection ratio and boundingClientRect.top to get the most visible and topmost element
        const mostVisible = visibleEntries.sort((a, b) => {
          const ratioComparison = b.intersectionRatio - a.intersectionRatio;
          if (Math.abs(ratioComparison) < 0.01) {
            // If intersection ratios are very close, prioritize the one closer to the top
            return a.boundingClientRect.top - b.boundingClientRect.top;
          }
          return ratioComparison;
        })[0];

        const id = '#' + mostVisible.target.id;
        setActiveId(id);
      },
      {
        rootMargin,
        threshold,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [sectionIds, rootMargin, threshold]);

  // Manual navigation function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  return { activeId, scrollToSection };
}