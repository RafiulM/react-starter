import React from 'react';
import { ChevronRight, Github, Star, Zap, Shield, Users, Code, Rocket } from 'lucide-react';
import { BenefitsSection, StatsSection, TestimonialsSection, TechnicalFeaturesSection } from './LandingContent';
import InteractiveLanding from './InteractiveLanding';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Modern React Stack",
      description: "Built with React 19, TypeScript, and latest tooling for maximum developer experience."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Lightning Fast",
      description: "Optimized builds with Vite, Tailwind CSS, and modern bundling for peak performance."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Authentication Ready",
      description: "Complete authentication system with Better Auth integration out of the box."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Team Collaboration",
      description: "Multi-tenant architecture with organizations, teams, and invitation system."
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-600" />,
      title: "AI Integration",
      description: "Ready-to-use AI capabilities with modern AI SDKs and cloud integration."
    },
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      title: "Production Ready",
      description: "Deployment configs for Cloudflare, Docker, and CI/CD pipelines included."
    }
  ];

  useScrollAnimation();

  return (
    <InteractiveLanding>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-20" data-animate="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Modern Web Apps
            <span className="text-blue-600"> Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A complete React starter kit with authentication, AI integration, and modern tooling. 
            Everything you need to launch your next project in minutes, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50" data-animate="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Get Started
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices to accelerate your development workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Benefits Section */}
      <section id="benefits" data-animate="benefits">
        <BenefitsSection />
      </section>

      {/* Technical Features */}
      <section id="tech-stack" data-animate="tech-stack">
        <TechnicalFeaturesSection />
      </section>

      {/* Testimonials */}
      <section id="testimonials" data-animate="testimonials">
        <TestimonialsSection />
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-animate="get-started">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Building Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join over 1,200 developers who have accelerated their development with React Starter.
            Get up and running in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center font-semibold">
              <Github className="w-5 h-5 mr-2" />
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              View Documentation
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required • Open source • MIT License
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">React Starter</h3>
              <p className="text-gray-400 text-sm">
                Built with ❤️ for the React community
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/rafiulm/react-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </InteractiveLanding>
  );
};

export default LandingPage;