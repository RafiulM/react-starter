/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

const tableOfContents = [
  { id: "getting-started", title: "Getting Started" },
  { id: "project-structure", title: "Project Structure" },
  { id: "development-workflow", title: "Development Workflow" },
  { id: "authentication-ai", title: "Authentication & AI" },
  { id: "infrastructure", title: "Infrastructure" },
  { id: "contribution", title: "Contribution Guidelines" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "resources", title: "Additional Resources" },
];

function TableOfContents({ activeSection }: { activeSection: string }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-8 w-64 hidden lg:block">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table of Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}

function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex gap-8">
        <div className="flex-1 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know to get started with this React Starter Kit
          and build amazing applications.
        </p>
      </div>

      {/* Getting Started Section */}
      <section id="getting-started" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Getting Started</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Start</CardTitle>
              <CardDescription>
                Get up and running in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">1. Clone the repository</h4>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                    <code>git clone https://github.com/RafiulM/react-starter.git
cd react-starter</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">2. Install dependencies</h4>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                    <code>bun install</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">3. Start development server</h4>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                    <code>bun run dev</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Prerequisites</CardTitle>
              <CardDescription>
                What you need before you begin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Bun 1.2+ runtime (preferred) or Node.js 20+</li>
                <li>• Git for version control</li>
                <li>• Basic knowledge of React, TypeScript, and tRPC</li>
                <li>• Cloudflare account (for deployment)</li>
                <li>• PostgreSQL database (Neon recommended)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Project Structure */}
      <section id="project-structure" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Project Structure</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Architecture Overview</CardTitle>
            <CardDescription>
              Visual representation of the monorepo architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono">
{`┌─ react-starter/
├── apps/
│   ├── app/          # React 19 + TanStack Router
│   ├── web/          # Astro marketing site  
│   ├── api/          # tRPC API server
│   └── edge/         # Cloudflare Workers entry
├── packages/
│   ├── core/         # Shared types & utils
│   ├── ui/           # shadcn/ui components
│   ├── ws-protocol/  # WebSocket types
│   └── typescript-config/ # Shared TS config
├── db/               # Drizzle ORM + Neon PostgreSQL
├── infra/            # Terraform infrastructure
├── docs/             # VitePress documentation
└── scripts/          # Build & dev tools`}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Directory Overview</CardTitle>
            <CardDescription>
              Understanding the project layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">apps/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Contains all applications in the monorepo
                </p>
                <ul className="text-sm text-muted-foreground ml-8 space-y-1">
                  <li>• <code>app/</code> - Main React application (TanStack Router)</li>
                  <li>• <code>web/</code> - Marketing website (Astro)</li>
                  <li>• <code>api/</code> - tRPC API server</li>
                  <li>• <code>edge/</code> - Cloudflare Workers entry point</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">packages/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Shared packages and utilities
                </p>
                <ul className="text-sm text-muted-foreground ml-8 space-y-1">
                  <li>• <code>core/</code> - Shared TypeScript types and utilities</li>
                  <li>• <code>ui/</code> - Shared UI components (shadcn/ui)</li>
                  <li>• <code>ws-protocol/</code> - WebSocket protocol template</li>
                  <li>• <code>typescript-config/</code> - Shared TypeScript configurations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">db/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Database schema, migrations, and seeding (Drizzle ORM)
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">infra/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Infrastructure as Code (Terraform)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Development Workflow */}
      <section id="development-workflow" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Development Workflow</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Authentication Flow</CardTitle>
            <CardDescription>
              How users authenticate with Better Auth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono">
{`User Login Request
       │
       ▼
┌─────────────┐    credentials    ┌──────────────┐
│   React     │ ─────────────────► │ Better Auth  │
│ Frontend    │                    │  (Server)    │
└─────────────┘                    └──────────────┘
       ▲                                  │
       │                                  │ validate
       │                                  ▼
       │                           ┌──────────────┐
       │                           │  PostgreSQL  │
       │                           │  (User Data) │
       │                           └──────────────┘
       │                                  │
       │ JWT + Session                    │ user found
       │                                  ▼
       │                           ┌──────────────┐
       │◄─────────────────────────  │ Session      │
                                   │ Management   │
                                   └──────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Local Development</CardTitle>
              <CardDescription>
                Commands for daily development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Start React app</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/app dev</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Start API server</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/edge dev</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Run tests</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun test</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Type checking</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun typecheck</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Setup</CardTitle>
              <CardDescription>
                Configure your development environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Environment variables</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>cp .env.example .env
# Edit .env with your values</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Database migrations</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/db migrate</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Seed database</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/db seed</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Authentication & AI Modules */}
      <section id="authentication-ai" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Authentication & AI Modules</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Flow Architecture</CardTitle>
            <CardDescription>
              How frontend, backend, and services interact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono">
{`┌─────────────┐    tRPC/HTTP     ┌──────────────┐    SQL/HTTP    ┌─────────────┐
│   React App │ ◄──────────────► │ Cloudflare   │ ◄────────────► │  Neon       │
│  (Frontend) │                  │   Workers    │                 │ PostgreSQL  │
│             │                  │  (Backend)   │                 │ (Database)  │
└─────────────┘                  └──────────────┘                 └─────────────┘
       │                                │                                 │
       │ Better Auth                    │ Drizzle ORM                     │ Better Auth
       │ (Sessions)                     │ (Type Safety)                   │ (User Data)
       │                                │                                 │
       ▼                                ▼                                 ▼
┌─────────────┐    OAuth/API     ┌──────────────┐    Hyperdrive   ┌─────────────┐
│   OAuth     │ ◄──────────────► │    AI APIs   │ ◄────────────── │ Connection  │
│ Providers   │                  │ (OpenAI etc) │                 │   Pooling   │
│             │                  │              │                 │             │
└─────────────┘                  └──────────────┘                 └─────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Better Auth integration and setup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The starter kit uses Better Auth for secure, modern authentication.
                Features include email/password, OAuth providers, and magic links.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Type-safe authentication APIs</li>
                <li>• Session management</li>
                <li>• Email verification</li>
                <li>• Password reset flows</li>
                <li>• Multi-provider OAuth</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>
                Ready-to-use AI capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                AI integration layer ready for OpenAI, Anthropic, and other
                providers with built-in best practices.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OpenAI SDK integration</li>
                <li>• Streaming responses support</li>
                <li>• Rate limiting and error handling</li>
                <li>• Modular provider architecture</li>
                <li>• Type-safe API wrapper</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Infrastructure</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Deployment Architecture</CardTitle>
            <CardDescription>
              How your application is deployed to production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono">
{`                    Internet Users
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Cloudflare Global CDN                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │   Static    │ │  Workers    │ │      R2 Storage     ││
│  │   Assets    │ │  (Edge API) │ │    (Files/Media)    ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          │
                          │ (Database Queries)
                          ▼
                 ┌─────────────────┐
                 │   Hyperdrive    │ ─────► Connection Pooling
                 │  (DB Proxy)     │        & Global Caching
                 └─────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Neon PostgreSQL │
                 │   (Database)    │
                 │  Multi-region   │
                 └─────────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Deployment & Infrastructure</CardTitle>
            <CardDescription>
              Production-ready deployment setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Cloudflare Workers</h4>
                <p className="text-sm text-muted-foreground">
                  Deploy to Cloudflare's global edge network for optimal performance.
                  The starter includes Terraform configurations for infrastructure as code.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Database</h4>
                <p className="text-sm text-muted-foreground">
                  Uses Neon PostgreSQL with Drizzle ORM for type-safe database operations.
                  Includes automated migrations and seeding scripts with Better Auth integration.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">CI/CD Pipeline</h4>
                <p className="text-sm text-muted-foreground">
                  GitHub Actions workflows for automated testing, building, and deployment.
                  Includes preview deployments for pull requests.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contribution Guidelines */}
      <section id="contribution" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Contribution Guidelines</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Contributing to React Starter Kit</CardTitle>
            <CardDescription>
              How to contribute and improve the project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">1. Fork the repository</h4>
                <p className="text-sm text-muted-foreground">
                  Create your own fork to work on improvements and bug fixes.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">2. Create a feature branch</h4>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                  <code>git checkout -b feature/your-feature-name</code>
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">3. Make your changes</h4>
                <p className="text-sm text-muted-foreground">
                  Follow the existing code style and add tests for new features.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">4. Test your changes</h4>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                  <code>bun run test
bun run build</code>
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">5. Submit a pull request</h4>
                <p className="text-sm text-muted-foreground">
                  Provide a clear description of your changes and link any related issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Troubleshooting</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
              <CardDescription>
                Solutions to frequently encountered problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Dependencies won't install</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Ensure you're using Bun 1.2+ and clear any Node.js caches:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --version
rm -rf node_modules bun.lockb
bun install</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Database connection errors</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Verify your DATABASE_URL and required extensions:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/db migrate
bun --filter @repo/db seed</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Type errors after schema changes</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Regenerate types and restart TypeScript server:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun --filter @repo/db generate
bun typecheck</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Development Tips</CardTitle>
              <CardDescription>
                Best practices for smooth development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Environment Variables</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Create .env files for different environments:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>.env.local      # Local development
.env.example    # Example file (committed)
wrangler.jsonc  # Cloudflare Workers config</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Port conflicts</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Default ports used by the development servers:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>5173 - React app (@repo/app)
4321 - Astro site (@repo/web)
8787 - API server (wrangler dev)</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">UI Components</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Manage shadcn/ui components efficiently:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun ui:add button card
bun ui:essentials
bun ui:list</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Getting Help</CardTitle>
            <CardDescription>
              When you need additional support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If these solutions don't help, here are the best places to get support:
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/RafiulM/react-starter/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Issues
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/RafiulM/react-starter/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discussions
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://discord.gg/2nKEnKq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord Community
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Resources */}
      <section id="resources" className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Additional Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GitHub Repository</CardTitle>
              <CardDescription>
                Source code and issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://github.com/RafiulM/react-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discussions</CardTitle>
              <CardDescription>
                Community support and questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://github.com/RafiulM/react-starter/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Discussion
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentation</CardTitle>
              <CardDescription>
                Additional guides and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://github.com/RafiulM/react-starter/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse Docs
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Feedback Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Need Help?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          If you can't find what you're looking for, reach out to the community
          or open an issue on GitHub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a
              href="https://github.com/RafiulM/react-starter/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an Issue
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/RafiulM/react-starter/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask the Community
            </a>
          </Button>
        </div>
      </section>
        </div>
        <TableOfContents activeSection={activeSection} />
      </div>
    </div>
  );
}