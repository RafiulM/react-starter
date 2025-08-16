/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button } from "@repo/ui";
import { Link } from "@tanstack/react-router";
import {
  Code,
  Shield,
  Zap,
  Users,
  GitBranch,
  Sparkles,
  ArrowRight,
  Star,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Custom hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
}

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [techStackRef, techStackVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: GitBranch,
      title: "Monorepo Structure",
      description:
        "Built with modern monorepo architecture using Bun workspaces for optimal development experience.",
    },
    {
      icon: Shield,
      title: "Authentication Ready",
      description:
        "Complete authentication system with JWT tokens, user management, and secure session handling.",
    },
    {
      icon: Sparkles,
      title: "AI Integration",
      description:
        "Pre-configured AI utilities and tools ready for integration with popular AI services.",
    },
    {
      icon: Code,
      title: "TypeScript First",
      description:
        "Full TypeScript support with strict configuration for maximum type safety and developer experience.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description:
        "Optimized build setup with Vite, modern tooling, and performance best practices built-in.",
    },
    {
      icon: Users,
      title: "Developer Experience",
      description:
        "Pre-commit hooks, linting, formatting, and automated testing for seamless development workflow.",
    },
  ];

  const techStack = [
    { name: "React 18", color: "bg-blue-500" },
    { name: "TypeScript", color: "bg-blue-600" },
    { name: "Tailwind CSS", color: "bg-teal-500" },
    { name: "Vite", color: "bg-purple-500" },
    { name: "TanStack Router", color: "bg-orange-500" },
    { name: "Cloudflare Workers", color: "bg-orange-600" },
  ];

  const socialProof = {
    githubStars: "1.2k",
    downloads: "5.8k",
    contributors: "15",
    forks: "89"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/90 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-primary animate-pulse" />
              <span className="ml-2 text-xl font-bold">React Starter</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-primary transition-colors hover:scale-105 transform"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('tech-stack')}
                className="text-gray-700 hover:text-primary transition-colors hover:scale-105 transform"
              >
                Tech Stack
              </button>
              <a
                href="https://github.com/rafiulm/react-starter"
                className="text-gray-700 hover:text-primary transition-colors inline-flex items-center hover:scale-105 transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <Button asChild className="hidden md:flex">
              <Link to="/dashboard" className="hover:scale-105 transform transition-transform">
                Get Started
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="py-4 space-y-2 border-t">
              <button 
                onClick={() => {
                  scrollToSection('features');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  scrollToSection('tech-stack');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Tech Stack
              </button>
              <a
                href="https://github.com/rafiulm/react-starter"
                className="block px-4 py-2 text-gray-700 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <div className="px-4 py-2">
                <Button asChild className="w-full">
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}/>
          <div className={`absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}/>
          <div className={`absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
            heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}/>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } hover:bg-primary/20 cursor-pointer group`}
            >
              <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Modern React Development Made Simple
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } hover:scale-105 transform transition-transform`}
            >
              Build Amazing Apps
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Faster Than Ever</span>
            </h1>
            <p
              className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              A production-ready React starter with modern tooling, authentication,
              AI utilities, and best practices built-in. Start building in minutes,
              not hours.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button 
                size="lg" 
                asChild 
                className="group hover:scale-105 transform transition-all duration-300 hover:shadow-lg">
                <Link to="/dashboard" className="inline-flex items-center">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="group hover:scale-105 transform transition-all duration-300 hover:shadow-lg">
                <a
                  href="https://github.com/rafiulm/react-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Star className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Star on GitHub
                  <span className="ml-2 px-2 py-1 text-xs bg-white/20 rounded-full">{socialProof.githubStars}</span>
                </a>
              </Button>
            </div>
            
            {/* Scroll indicator */}
            <div className="mt-16 animate-bounce">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>
            
            {/* Social Proof */}
            <div className={`mt-12 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{socialProof.githubStars}</div>
                <div className="text-sm text-gray-600">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{socialProof.downloads}</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{socialProof.contributors}</div>
                <div className="text-sm text-gray-600">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{socialProof.forks}</div>
                <div className="text-sm text-gray-600">Forks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        id="features" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Everything You Need to Start
            </h2>
            <p 
              className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Built with modern tools and best practices to help you ship faster
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-6 rounded-xl border bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section 
        ref={techStackRef} 
        id="tech-stack" 
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
                techStackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Modern Tech Stack
            </h2>
            <p 
              className={`text-xl text-gray-600 transition-all duration-700 delay-200 ${
                techStackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Built with the latest and greatest technologies
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <span
                key={tech.name}
                className={`px-4 py-2 rounded-full text-white text-sm font-medium ${tech.color} hover:scale-110 transform transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  techStackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-primary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}/>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Ready to Get Started?
          </h2>
          <p 
            className={`text-xl mb-8 text-primary-foreground/90 transition-all duration-700 delay-200 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Join thousands of developers building amazing apps with our starter
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button 
              size="lg" 
              variant="secondary" 
              asChild
              className="group hover:scale-105 transform transition-all duration-300 hover:shadow-lg"
            >
              <Link to="/dashboard" className="inline-flex items-center">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg" 
              asChild
            >
              <a
                href="https://github.com/rafiulm/react-starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-semibold">React Starter</span>
              </div>
              <p className="text-gray-400 mb-4">
                A modern React starter template with everything you need to build amazing applications.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/rafiulm/react-starter"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">GitHub</span>
                  GitHub
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('tech-stack')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Tech Stack
                  </button>
                </li>
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <Link 
                    to="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter/issues"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Issues
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter/discussions"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discussions
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter/releases"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Releases
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Get Started</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Try Demo →
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clone Repository →
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/rafiulm/react-starter#installation"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Installation Guide →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 React Starter. Built with modern tools and ❤️
            </p>
            <div className="flex space-x-4"
            >
              <a
                href="https://github.com/rafiulm/react-starter"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-4 w-4" />
                <span className="ml-1">{socialProof.githubStars}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}