/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Code2, 
  Zap, 
  Shield, 
  Globe,
  FileText,
  BookOpen,
  Rocket
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const features = [
    {
      title: "Production-Ready",
      description: "Battle-tested components and patterns for enterprise applications",
      icon: Shield,
    },
    {
      title: "Edge-First Architecture",
      description: "Optimized for global performance at CDN edge locations",
      icon: Globe,
    },
    {
      title: "Developer Experience",
      description: "Modern tooling with TypeScript, hot reload, and comprehensive testing",
      icon: Code2,
    },
    {
      title: "Lightning Fast",
      description: "Powered by Vite, Bun, and optimized for speed",
      icon: Zap,
    },
  ];

  const quickLinks = [
    {
      title: "About",
      description: "Learn more about React Starter Kit",
      to: "/about",
      icon: BookOpen,
    },
    {
      title: "Documentation",
      description: "Get started with comprehensive guides",
      href: "https://github.com/kriasoft/react-starter-kit#readme",
      icon: FileText,
    },
    {
      title: "API Demo",
      description: "Explore tRPC APIs and real-time features",
      to: "/analytics",
      icon: Rocket,
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-16 sm:pt-20 pb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 px-4 sm:px-0">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              React Starter Kit
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 px-4 sm:px-6">
            A production-ready, full-stack web application template that combines
            modern development practices with cutting-edge technologies to deliver
            exceptional performance and developer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/about">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a
                href="https://github.com/kriasoft/react-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center px-4 sm:px-0">
            Built for Modern Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg sm:text-xl leading-tight">{feature.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center px-4 sm:px-0">
            Explore the Platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickLinks.map((link) => (
              <Card key={link.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{link.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    {link.to ? (
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <Link to={link.to}>
                          Explore
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-6 sm:px-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                Join thousands of developers who have chosen React Starter Kit for
                their next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <a
                    href="https://github.com/kriasoft/react-starter-kit/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Community
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
