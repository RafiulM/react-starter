import React from 'react';
import { Check, Clock, Target, TrendingUp } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  timeSaved: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const benefits: Benefit[] = [
  {
    icon: <Clock className="w-6 h-6 text-green-600" />,
    title: "Save 40+ Hours",
    description: "Skip the setup phase and jump straight into building features that matter.",
    timeSaved: "40+ hours"
  },
  {
    icon: <Target className="w-6 h-6 text-blue-600" />,
    title: "Production Ready",
    description: "Deploy to production on day one with optimized configs and security best practices.",
    timeSaved: "Instant deploy"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    title: "Scale Effortlessly",
    description: "Monorepo architecture that grows with your team and product requirements.",
    timeSaved: "Unlimited scale"
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "React Starter saved us weeks of initial setup. We had authentication, database, and deployment working within hours instead of days.",
    author: "Sarah Chen",
    role: "Senior Developer",
    company: "TechFlow Solutions"
  },
  {
    quote: "The monorepo structure is brilliant. Our frontend, backend, and shared packages all work seamlessly together with hot reload across the entire stack.",
    author: "Marcus Rodriguez",
    role: "Lead Engineer",
    company: "StartupCraft"
  },
  {
    quote: "Authentication was always a pain point. With React Starter, we had secure auth with social logins working in under 30 minutes.",
    author: "Emily Watson",
    role: "Full-Stack Developer",
    company: "DevOps Inc"
  }
];

export const stats: Stat[] = [
  { value: "1,200", label: "Developers", suffix: "+" },
  { value: "50", label: "Production Apps", suffix: "+" },
  { value: "4.8", label: "GitHub Stars", suffix: "/5" },
  { value: "30", label: "Minutes to Setup" }
];

export const technicalFeatures = [
  {
    category: "Frontend",
    items: ["React 19 with TypeScript", "TanStack Router", "Tailwind CSS", "Jotai State Management"]
  },
  {
    category: "Backend",
    items: ["Node.js with TypeScript", "tRPC for type-safe APIs", "PostgreSQL with Drizzle ORM", "Cloudflare Workers ready"]
  },
  {
    category: "DevOps",
    items: ["Docker containerization", "CI/CD with GitHub Actions", "Cloudflare deployment", "Environment management"]
  },
  {
    category: "Security",
    items: ["Better Auth integration", "JWT tokens", "Rate limiting", "Security headers"]
  }
];

export const BenefitsSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Build Faster, Not Harder
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stop wasting time on boilerplate setup. Focus on what makes your app unique.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600 mb-2">{benefit.description}</p>
            <div className="text-sm font-medium text-blue-600">{benefit.timeSaved}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StatsSection: React.FC = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8"
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialsSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Loved by Developers
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See what developers are saying about React Starter
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="text-yellow-400 flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="text-sm">
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-gray-600">{testimonial.role}, {testimonial.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>);

export const TechnicalFeaturesSection: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Technical Excellence
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Built with industry-standard technologies and best practices
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        {technicalFeatures.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">{category.category}</h3>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>);