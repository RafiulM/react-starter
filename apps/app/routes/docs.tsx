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

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know to get started with React Starter Kit
        </p>
      </div>

      {/* Quick Start Section */}
      <section className="mb-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Quick Start Guide</CardTitle>
            <CardDescription>
              Get up and running in under 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                git clone https://github.com/kriasoft/react-starter-kit.git<br/>
                cd react-starter-kit<br/>
                bun install<br/>
                bun dev
              </code>
            </div>
            <p className="text-muted-foreground">
              Your development server will start at{' '}
              <code className="bg-muted px-2 py-1 rounded">http://localhost:5173</code>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Project Structure */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Project Structure
        </h2>

        <Card>
          <CardContent className="pt-6">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
{`react-starter-kit/
├── apps/
│   ├── api/          # Backend API (Cloudflare Workers)
│   ├── app/          # Frontend React app (Vite)
│   ├── edge/         # Edge functions
│   └── web/          # Static marketing site (Astro)
├── packages/
│   ├── ui/           # Shared UI components
│   └── db/           # Database schema & types
├── db/               # Database migrations
├── docs/             # Documentation
└── infra/            # Infrastructure as code`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Key Concepts */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Key Concepts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🏗️ Monorepo Architecture</CardTitle>
              <CardDescription>
                Organized with Turborepo for maximum efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share code between frontend and backend seamlessly. All packages
                are built and tested together with intelligent caching.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔄 Type-Safe APIs</CardTitle>
              <CardDescription>
                End-to-end type safety with tRPC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Define your API once and get full type safety from backend to
                frontend. No more API documentation drift!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Edge-First</CardTitle>
              <CardDescription>
                Built for Cloudflare Workers and edge computing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Run your application close to your users with Cloudflare's global
                network. Automatic scaling and performance optimization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Modern UI</CardTitle>
              <CardDescription>
                Beautiful components with shadcn/ui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accessible, customizable components built on Radix UI and Tailwind CSS.
                Copy-paste from shadcn/ui or build your own design system.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Commands */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Available Commands
        </h2>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Development</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="bg-muted px-2 py-1 rounded">bun dev</code> - Start development server</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun dev:app</code> - Start frontend only</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun dev:api</code> - Start backend only</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun db:studio</code> - Database management UI</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Build & Deploy</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="bg-muted px-2 py-1 rounded">bun build</code> - Build all apps</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun type-check</code> - Type checking</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun lint</code> - Lint code</li>
                  <li><code className="bg-muted px-2 py-1 rounded">bun deploy</code> - Deploy to Cloudflare</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Environment Setup */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Environment Setup
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Required Environment Variables</CardTitle>
            <CardDescription>
              Copy .env.example to .env and configure these variables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
{`# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:5173

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token

# Optional: AI Features
OPENAI_API_KEY=sk-your-openai-key`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Blog Feature Documentation */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Blog Feature
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Manage blog posts with the built-in admin interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The blog feature includes a complete admin dashboard for creating,
              editing, and managing blog posts.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">To access the admin dashboard:</p>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Sign in to your account</li>
                <li>2. Navigate to <code className="bg-background px-1 rounded">/admin</code></li>
                <li>3. Click "Posts" in the sidebar</li>
                <li>4. Use the interface to create/edit/delete posts</li>
              </ol>
            </div>
            <div className="flex gap-4">
              <Button asChild>
                <a href="/admin">Go to Admin</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/docs/blog-feature-guide.md">View Blog Guide</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-12" />

      {/* Support & Resources */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Need Help?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Check out these resources for more information and support
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Button asChild>
            <a
              href="https://github.com/kriasoft/react-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/kriasoft/react-starter-kit/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discussions
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/kriasoft/react-starter-kit/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report Issues
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}