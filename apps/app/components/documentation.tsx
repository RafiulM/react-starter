/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { 
  Search, 
  Menu, 
  X, 
  FileText, 
  BookOpen, 
  Code, 
  Settings as SettingsIcon,
  ChevronRight,
  Home
} from "lucide-react";
import { CodeBlock, Callout, StepGuide, Breadcrumb, MarkdownRenderer, ReadingProgress } from "./documentation";
import { useDocumentation } from "../hooks/use-documentation";
import { useDocumentationSearch } from "../hooks/use-documentation-search";
import { useScrollSpy } from "../hooks/use-scroll-spy";

const navigationItems = [
  {
    title: "Getting Started",
    items: [
      { 
        title: "Introduction", 
        href: "#introduction", 
        icon: BookOpen,
        keywords: ["welcome", "overview", "what is", "about", "features", "architecture"]
      },
      { 
        title: "Installation", 
        href: "#installation", 
        icon: Code,
        keywords: ["setup", "install", "npm", "yarn", "dependencies", "prerequisites", "clone"]
      },
      { 
        title: "Quick Start", 
        href: "#quick-start", 
        icon: Home,
        keywords: ["tutorial", "first steps", "getting started", "begin", "start"]
      },
    ],
  },
  {
    title: "Components",
    items: [
      { 
        title: "Overview", 
        href: "#components-overview", 
        icon: FileText,
        keywords: ["ui", "library", "components", "widgets"]
      },
      { 
        title: "Button", 
        href: "#button", 
        icon: FileText,
        keywords: ["click", "action", "cta", "submit", "form"]
      },
      { 
        title: "Card", 
        href: "#card", 
        icon: FileText,
        keywords: ["container", "panel", "content", "layout"]
      },
      { 
        title: "Input", 
        href: "#input", 
        icon: FileText,
        keywords: ["form", "field", "text", "user input", "validation"]
      },
    ],
  },
  {
    title: "Advanced",
    items: [
      { 
        title: "Configuration", 
        href: "#configuration", 
        icon: SettingsIcon,
        keywords: ["config", "settings", "options", "environment", "env"]
      },
      { 
        title: "API Reference", 
        href: "#api-reference", 
        icon: Code,
        keywords: ["api", "methods", "endpoints", "functions", "reference"]
      },
      { 
        title: "Examples", 
        href: "#examples", 
        icon: BookOpen,
        keywords: ["demo", "sample", "code", "tutorial", "how to"]
      },
    ],
  },
];

export function Documentation() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get all section IDs for scroll spy
  const allSectionIds = navigationItems.flatMap(section => 
    section.items.map(item => item.href)
  );
  
  // Use scroll spy for active section tracking
  const { activeId: activeSection, scrollToSection } = useScrollSpy(allSectionIds, {
    offset: 100,
  });
  
  // Use search functionality
  const {
    searchResults,
    highlightedIndex,
    navigateToHighlighted,
    moveHighlight,
    resetHighlight,
    hasResults,
    totalResults,
  } = useDocumentationSearch(navigationItems, searchQuery);

  // Handle keyboard navigation in search
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveHighlight('down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveHighlight('up');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = navigateToHighlighted();
      if (item) {
        scrollToSection(item.href);
        setSearchQuery('');
        resetHighlight();
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      resetHighlight();
    }
  };

  return (
    <>
      <ReadingProgress />
      <div className="h-screen flex bg-background">
        {/* Documentation Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 ease-in-out bg-muted/30 border-r overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b bg-background/50 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg">Documentation</h2>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  resetHighlight();
                }}
                onKeyDown={handleSearchKeyDown}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
              {/* Search results counter */}
              {searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-muted-foreground">
                    {totalResults} result{totalResults !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-auto p-4">
            {!hasResults && searchQuery ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">No results found</div>
                <div className="text-sm text-muted-foreground">
                  Try searching for "installation", "components", or "api"
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((section, sectionIndex) => {
                  let currentItemIndex = 0;
                  const sectionStartIndex = searchResults
                    .slice(0, sectionIndex)
                    .reduce((acc, sect) => acc + sect.items.length, 0);

                  return (
                    <div key={sectionIndex}>
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                        {section.title}
                        {searchQuery && (
                          <span className="ml-2 text-xs normal-case">
                            ({section.items.length})
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => {
                          const globalIndex = sectionStartIndex + itemIndex;
                          const isHighlighted = highlightedIndex === globalIndex;
                          const isActive = activeSection === item.href;

                          return (
                            <button
                              key={itemIndex}
                              onClick={() => scrollToSection(item.href)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                                isActive
                                  ? "bg-accent text-accent-foreground border-l-2 border-primary"
                                  : isHighlighted
                                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                              }`}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="text-left flex-1">
                                {searchQuery ? (
                                  <HighlightMatch text={item.title} query={searchQuery} />
                                ) : (
                                  item.title
                                )}
                              </span>
                              <ChevronRight 
                                className={`h-3 w-3 transition-transform ${
                                  isActive ? "rotate-90" : ""
                                }`} 
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-background/50">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b bg-background/80 backdrop-blur flex items-center px-6 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <div className="flex-1 flex items-center gap-4">
            <h1 className="text-lg font-semibold">Documentation</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Edit on GitHub
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb 
                items={[
                  { label: "Documentation" },
                  { label: getCurrentSectionTitle(activeSection), active: true }
                ]} 
              />
            </div>
            <DocumentationContent activeSection={activeSection} />
          </div>
        </main>
      </div>
      </div>
    </>
  );
}

function getCurrentSectionTitle(activeSection: string): string {
  const sectionMap: Record<string, string> = {
    "#introduction": "Introduction",
    "#installation": "Installation", 
    "#quick-start": "Quick Start",
    "#components-overview": "Components Overview",
    "#button": "Button Component",
    "#card": "Card Component",
    "#input": "Input Component",
    "#configuration": "Configuration",
    "#api-reference": "API Reference",
    "#examples": "Examples",
  };
  return sectionMap[activeSection] || "Documentation";
}

function DocumentationContent({ activeSection }: { activeSection: string }) {
  const { content, loading, error } = useDocumentation(activeSection);

  const renderContent = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="space-y-6">
          <Callout type="error" title="Error Loading Content">
            {error}
          </Callout>
        </div>
      );
    }

    // Render markdown content
    if (content) {
      return (
        <div className="space-y-6">
          <MarkdownRenderer content={content.content} />
          {content.lastModified && (
            <div className="text-sm text-muted-foreground border-t pt-4">
              Last updated: {new Date(content.lastModified).toLocaleDateString()}
            </div>
          )}
        </div>
      );
    }

    // Fallback message for sections without content
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Documentation Section</h1>
          <p className="text-lg text-muted-foreground">
            Content for {getCurrentSectionTitle(activeSection)} is being loaded...
          </p>
        </div>

        <Callout type="info" title="Content Loading">
          If this message persists, the documentation content may not be available yet.
        </Callout>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-primary/20 text-primary rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}