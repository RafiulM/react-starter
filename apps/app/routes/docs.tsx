/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Book, FileText, Folder, Settings, Users, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { docsContent } from "@/lib/docs-content";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

const navigation = [
  {
    title: "Getting Started",
    icon: Book,
    sections: [
      { title: "Setup Guide", href: "/docs/setup" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Project Structure",
    icon: Folder,
    sections: [
      { title: "Folder Structure", href: "/docs/folder-structure" },
      { title: "Monorepo Overview", href: "/docs/monorepo" },
      { title: "Apps & Packages", href: "/docs/apps-packages" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    sections: [
      { title: "Authentication", href: "/docs/api/auth" },
      { title: "User Management", href: "/docs/api/users" },
      { title: "AI Integration", href: "/docs/api/ai" },
    ],
  },
  {
    title: "Contributing",
    icon: Users,
    sections: [
      { title: "Development Workflow", href: "/docs/contributing" },
      { title: "Code Standards", href: "/docs/standards" },
      { title: "Commit Conventions", href: "/docs/commits" },
    ],
  },
];

function DocsPage() {
  const [activeSection, setActiveSection] = useState("/docs/setup");

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-muted/50 border-r h-screen sticky top-0 overflow-y-auto hidden md:block">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-semibold">Documentation</h1>
            </div>
            
            <nav className="space-y-6" role="navigation" aria-label="Documentation navigation">
              {navigation.map((category) => (
                <div key={category.title}>
                  <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category.title}
                  </h3>
                  <ul className="space-y-1">
                    {category.sections.map((section) => (
                      <li key={section.href}>
                        <button
                          onClick={() => setActiveSection(section.href)}
                          className={cn(
                            "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors text-left",
                            activeSection === section.href
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                          )}
                          aria-current={activeSection === section.href ? "page" : undefined}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li aria-hidden="true" className="text-muted-foreground">/</li>
                <li className="text-muted-foreground">Documentation</li>
                {activeSection !== "/docs/setup" && (
                  <>
                    <li aria-hidden="true" className="text-muted-foreground">/</li>
                    <li className="text-foreground font-medium">
                      {navigation
                        .flatMap(cat => cat.sections)
                        .find(section => section.href === activeSection)?.title}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">React Starter Documentation</h1>
              <p className="text-muted-foreground">
                Complete guide to getting started with the React Starter template
              </p>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden mb-6">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
                aria-label="Select documentation section"
              >
                {navigation.map((category) => (
                  <optgroup key={category.title} label={category.title}>
                    {category.sections.map((section) => (
                      <option key={section.href} value={section.href}>{section.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {activeSection === "/docs/setup" && 
              <div dangerouslySetInnerHTML={{ __html: docsContent.setupGuide.content }} className="prose prose-gray max-w-none" />
            }
            {activeSection === "/docs/folder-structure" && 
              <div dangerouslySetInnerHTML={{ __html: docsContent.folderStructure.content }} className="prose prose-gray max-w-none" />
            }
            {activeSection === "/docs/contributing" && 
              <div dangerouslySetInnerHTML={{ __html: docsContent.contributing.content }} className="prose prose-gray max-w-none" />
            }
            {activeSection === "/docs/api/auth" && 
              <div dangerouslySetInnerHTML={{ __html: docsContent.apiReference.content }} className="prose prose-gray max-w-none" />
            }
          </div>
        </main>
      </div>
    </div>
  );
}


export default DocsPage;