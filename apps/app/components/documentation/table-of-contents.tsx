/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  sticky?: boolean;
}

export function TableOfContents({ className = "", sticky = true }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      if (id && !heading.closest('.toc-ignore')) {
        if (!heading.id) heading.id = id;
        
        tocItems.push({
          id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        });
      }
    });

    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
      }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${sticky ? 'sticky top-6' : ''} ${className}`}>
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Table of Contents
          </h4>
        </div>
        
        <ul className="space-y-1 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`
                  block w-full text-left py-1 px-2 rounded transition-colors hover:bg-accent hover:text-accent-foreground
                  ${item.level > 1 ? `ml-${(item.level - 1) * 3}` : ''}
                  ${activeId === item.id ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'}
                `}
                style={{ marginLeft: `${(item.level - 1) * 12}px` }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}