/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect, useState } from "react";

export interface DocContent {
  id: string;
  title: string;
  content: string;
  lastModified?: string;
}

const docMapping: Record<string, string> = {
  "#introduction": "/docs/introduction.md",
  "#installation": "/docs/installation.md",
  "#quick-start": "/docs/installation.md", // Reuse installation for now
  "#components-overview": "/docs/components.md",
  "#button": "/docs/components.md",
  "#card": "/docs/components.md",
  "#input": "/docs/components.md",
  "#configuration": "/docs/installation.md", // Reuse installation for now
  "#api-reference": "/docs/components.md",
  "#examples": "/docs/components.md",
};

export function useDocumentation(sectionId: string) {
  const [content, setContent] = useState<DocContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      const filePath = docMapping[sectionId];
      if (!filePath) {
        setContent(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.statusText}`);
        }

        const markdownContent = await response.text();
        
        setContent({
          id: sectionId,
          title: getTitleFromSection(sectionId),
          content: markdownContent,
          lastModified: response.headers.get('last-modified') || undefined,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [sectionId]);

  return { content, loading, error };
}

function getTitleFromSection(sectionId: string): string {
  const titleMap: Record<string, string> = {
    "#introduction": "Introduction",
    "#installation": "Installation Guide",
    "#quick-start": "Quick Start",
    "#components-overview": "Component Library",
    "#button": "Button Component",
    "#card": "Card Component", 
    "#input": "Input Component",
    "#configuration": "Configuration",
    "#api-reference": "API Reference",
    "#examples": "Examples",
  };
  return titleMap[sectionId] || "Documentation";
}