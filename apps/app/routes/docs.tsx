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
          and build amazing applications.
        </p>
      </div>

      {/* Getting Started Section */}
      <section className="mb-20">
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
                    <code>git clone https://github.com/kriasoft/react-starter-kit.git
cd react-starter-kit</code>
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
                <li>• Node.js 20+ or Bun runtime</li>
                <li>• Git for version control</li>
                <li>• Basic knowledge of React and TypeScript</li>
                <li>• Cloudflare account (for deployment)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Project Structure */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Project Structure</h2>
        
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
                  <li>• <code>app/</code> - Main React application</li>
                  <li>• <code>web/</code> - Marketing website (Astro)</li>
                  <li>• <code>api/</code> - API server</li>
                  <li>• <code>edge/</code> - Edge functions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">packages/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Shared packages and utilities
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">db/</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Database schema, migrations, and seeding
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
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Development Workflow</h2>
        
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
                  <h4 className="font-medium text-sm">Start all services</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run dev</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Run tests</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run test</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Type checking</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run type-check</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Database migrations</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run db:push</code>
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
                    <code>cp .env.example .env</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Database setup</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run db:setup</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Seed database</h4>
                  <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                    <code>bun run db:seed</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Authentication & AI Modules */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Authentication & AI Modules</h2>
        
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
                Built-in AI modules for common use cases including chat,
                content generation, and intelligent automation.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OpenAI integration</li>
                <li>• Streaming responses</li>
                <li>• Rate limiting</li>
                <li>• Context management</li>
                <li>• Cost tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Infrastructure</h2>
        
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
                  Uses PostgreSQL with Cloudflare Hyperdrive for global database access.
                  Includes automated migrations and seeding scripts.
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
      <section className="mb-20">
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

      {/* Additional Resources */}
      <section className="mb-20">
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
                  href="https://github.com/kriasoft/react-starter-kit"
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
                  href="https://github.com/kriasoft/react-starter-kit/discussions"
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
              <CardTitle className="text-lg">Examples</CardTitle>
              <CardDescription>
                Real-world usage examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://github.com/kriasoft/react-starter-kit/tree/main/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse Examples
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
              href="https://github.com/kriasoft/react-starter-kit/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an Issue
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/kriasoft/react-starter-kit/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask the Community
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}