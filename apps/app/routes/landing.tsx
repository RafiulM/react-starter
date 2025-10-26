/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button } from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, Users, Zap, Shield, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/landing")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">StarterKit</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1">
                Features
              </a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1">
                Pricing
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" aria-label="Sign in to your account">
                Sign In
              </Button>
              <Button size="sm" aria-label="Get started with StarterKit">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32" role="main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Build Amazing Products
              <span className="text-primary block sm:inline"> Faster</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start with our powerful starter kit designed for modern web applications.
              Includes everything you need to launch your next project quickly and efficiently.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]" aria-label="Start building with StarterKit">
                <span className="mr-2">Start Building</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]" aria-label="View StarterKit documentation">
                View Documentation
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center" role="img" aria-label="4.9 out of 5 stars rating">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" aria-hidden="true" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center" role="img" aria-label="Over 10,000 developers">
                <Users className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>10,000+ developers</span>
              </div>
              <div className="flex items-center" role="img" aria-label="Ready in minutes">
                <Zap className="h-4 w-4 mr-1" aria-hidden="true" />
                <span>Ready in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-32 bg-muted/30" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Our starter kit comes packed with modern tools and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <article className="bg-card p-6 sm:p-8 rounded-lg border text-center hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Optimized for performance with modern build tools and best practices
              </p>
            </article>

            <article className="bg-card p-6 sm:p-8 rounded-lg border text-center hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure by Default</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Built with security best practices and includes authentication setup
              </p>
            </article>

            <article className="bg-card p-6 sm:p-8 rounded-lg border text-center hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">User Friendly</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Beautiful UI components with accessibility and responsive design
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Why Choose Our Starter Kit?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Modern Tech Stack</h4>
                    <p className="text-muted-foreground">
                      Built with React, TypeScript, Tailwind CSS, and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Developer Experience</h4>
                    <p className="text-muted-foreground">
                      Hot reload, TypeScript support, and excellent tooling
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Production Ready</h4>
                    <p className="text-muted-foreground">
                      Includes testing, CI/CD setup, and deployment configurations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Comprehensive Documentation</h4>
                    <p className="text-muted-foreground">
                      Detailed guides and examples to get you started quickly
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <p className="text-muted-foreground">Happy Developers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                  <p className="text-muted-foreground">Projects Created</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <p className="text-muted-foreground">Uptime Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing products
            with our starter kit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StarterKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}