# React Enterprise Starter Kit 🚀

[![Build Status](https://img.shields.io/github/actions/workflow/status/RafiulM/react-starter/ci.yml?branch=main)](https://github.com/RafiulM/react-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com)

A production-ready React monorepo starter with enterprise-grade tooling, infrastructure as code, and AI-powered development workflows. Built for teams who want to ship fast without compromising on quality or scalability.

## 🎯 What You'll Get

- **⚡ Lightning-fast setup**: Get running in under 5 minutes
- **🏗️ Enterprise architecture**: Scalable monorepo with clear separation of concerns
- **🚀 Modern stack**: React 18, TypeScript, Vite, Tailwind CSS
- **☁️ Cloud-native**: Deploy to Cloudflare Workers with automated infrastructure
- **🤖 AI-powered**: Claude AI integration for development assistance
- **📊 Database**: PostgreSQL with Drizzle ORM and automatic migrations
- **🔧 Developer experience**: Husky, ESLint, Prettier, hot reload
- **🧪 Testing**: Jest, React Testing Library, Playwright E2E
- **📦 Package management**: Bun for maximum performance

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Environment Setup](#-environment-setup)
- [Infrastructure](#-infrastructure)
- [AI Development](#-ai-development)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)

### 1. Clone & Install

```bash
git clone https://github.com/RafiulM/react-starter.git
cd react-starter
bun install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/react_starter"

# Cloudflare
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_API_TOKEN="your-api-token"

# OpenAI (for AI features)
OPENAI_API_KEY="sk-your-openai-key"

# Google Cloud (optional)
GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
```

### 3. Database Setup

For local development with PostgreSQL:

```bash
# Using Docker (recommended)
docker run --name react-starter-db \
  -e POSTGRES_DB=react_starter \
  -e POSTGRES_USER=username \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Run migrations
bun run db:migrate
```

### 4. Start Development

```bash
# Start all services
bun run dev

# Or start specific apps
bun run dev:web       # React app only
bun run dev:api       # API only
bun run dev:workers   # Cloudflare Workers only
```

Your apps will be available at:
- **React App**: http://localhost:5173
- **API**: http://localhost:3001
- **Cloudflare Workers**: http://localhost:8787

## 📁 Project Structure

```
react-starter/
├── apps/
│   ├── web/                    # React application (Vite)
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── pages/         # Route components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── stores/        # State management
│   │   │   └── utils/         # Utility functions
│   │   └── package.json
│   ├── api/                   # Express API server
│   │   ├── src/
│   │   │   ├── routes/        # API routes
│   │   │   ├── controllers/   # Route handlers
│   │   │   ├── middleware/    # Express middleware
│   │   │   └── models/        # Data models
│   │   └── package.json
│   └── workers/               # Cloudflare Workers
│       ├── src/
│       │   ├── handlers/      # Worker handlers
│       │   ├── utils/         # Worker utilities
│       │   └── index.ts       # Worker entry
│       └── wrangler.toml
├── packages/
│   ├── ui/                    # Shared UI components
│   │   ├── src/
│   │   │   ├── components/    # Reusable React components
│   │   │   └── index.ts       # Package exports
│   │   └── package.json
│   ├── core/                  # Shared business logic
│   │   ├── src/
│   │   │   ├── types/         # TypeScript types
│   │   │   ├── utils/         # Shared utilities
│   │   │   └── constants/     # Shared constants
│   │   └── package.json
│   └── config/                # Shared configurations
│       ├── eslint/            # ESLint configs
│       ├── prettier/          # Prettier configs
│       └── package.json
├── infrastructure/            # Terraform configurations
│   ├── terraform/             # Infrastructure as code
│   └── scripts/               # Deployment scripts
├── .github/                   # GitHub workflows
├── documentation/             # Project documentation
└── package.json              # Root package.json
```

## 🛠️ Development Workflow

### Available Commands

```bash
# Development
bun run dev              # Start all apps in development
bun run dev:web          # Start React app only
bun run dev:api          # Start API server only
bun run dev:workers      # Start Cloudflare Workers only

# Building
bun run build            # Build all apps
bun run build:web        # Build React app
bun run build:api        # Build API server
bun run build:workers    # Build Cloudflare Workers

# Testing
bun run test             # Run all tests
bun run test:unit        # Run unit tests
bun run test:e2e         # Run E2E tests
bun run test:watch       # Run tests in watch mode

# Database
bun run db:generate      # Generate migrations
bun run db:migrate       # Run migrations
bun run db:seed          # Seed database with sample data
bun run db:studio        # Open Drizzle Studio

# Code Quality
bun run lint             # Run ESLint
bun run lint:fix         # Fix ESLint issues
bun run format           # Format code with Prettier
bun run type-check       # Run TypeScript checks

# AI Development
bun run ai:setup         # Setup AI development environment
bun run ai:develop       # Start AI-assisted development
```

### Git Workflow

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **Pre-commit**: Runs linting and formatting
- **Pre-push**: Runs type checking and tests
- **Commit-msg**: Validates commit messages (Conventional Commits)

### VS Code Setup

Install recommended extensions:

```bash
# Install recommended extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension Prisma.prisma
```

## 🔧 Environment Setup

### Cloudflare Configuration

1. **Create Cloudflare account**: [Sign up here](https://dash.cloudflare.com/sign-up)
2. **Get API token**: Create a token with these permissions:
   - Zone:Zone:Read
   - Zone:Page Rules:Edit
   - Account:Cloudflare Workers:Edit
   - Account:Cloudflare Pages:Edit

3. **Configure Wrangler**:

```bash
bunx wrangler login
bunx wrangler config
```

### Database Configuration

#### Option 1: Neon PostgreSQL (Cloud)

```bash
# Create a new project
bunx neonctl projects create --name react-starter

# Get connection string
bunx neonctl connection-string --project-id your-project-id
```

#### Option 2: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb react_starter
```

### Google Cloud Setup (Optional)

1. **Create Google Cloud project**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable APIs**: Cloud Translation, Cloud Vision, etc.
3. **Create service account**: Download JSON key
4. **Set environment variable**: `GOOGLE_APPLICATION_CREDENTIALS`

## ☁️ Infrastructure

### Terraform Setup

```bash
# Initialize Terraform
cd infrastructure/terraform
terraform init

# Plan changes
terraform plan

# Apply infrastructure
terraform apply
```

### Deployment Environments

| Environment | Branch | URL | Database |
|-------------|--------|-----|----------|
| **Development** | `main` | `http://localhost:5173` | Local PostgreSQL |
| **Preview** | PR branches | `https://preview-{sha}.vercel.app` | Neon Preview |
| **Production** | `main` | `https://your-domain.com` | Neon Production |

### Manual Deployment

```bash
# Deploy to Cloudflare Workers
bun run deploy:workers

# Deploy to Vercel (React app)
bun run deploy:web

# Deploy API to Railway/Heroku
bun run deploy:api
```

## 🤖 AI Development

This project includes Claude AI integration for development assistance:

### Setup AI Assistant

```bash
# Configure Claude AI
bun run ai:setup

# Start AI-assisted development
bun run ai:develop
```

### AI Commands

```bash
# Generate component
bun run ai:component Button --props="variant, size"

# Generate API endpoint
bun run ai:endpoint users --methods="GET, POST"

# Generate database migration
bun run ai:migration create_users_table

# Fix TypeScript errors
bun run ai:fix-types
```

### AI Development Workflow

1. **Describe your feature** in natural language
2. **AI generates code** with proper TypeScript types
3. **Review and refine** the generated code
4. **Run tests** to ensure everything works
5. **Commit with AI-generated** commit messages

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
bun run test:unit

# Run tests with coverage
bun run test:unit --coverage

# Run tests in watch mode
bun run test:watch
```

### E2E Tests

```bash
# Install Playwright browsers (first time)
bunx playwright install

# Run E2E tests
bun run test:e2e

# Run tests in headed mode
bun run test:e2e --headed
```

### Testing Strategy

- **Unit Tests**: Components, utilities, and API endpoints
- **Integration Tests**: Database operations and API routes
- **E2E Tests**: Critical user flows across the application
- **Visual Regression**: Component snapshots with Storybook

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Reset database
bun run db:reset

# Check database connection
bun run db:check

# Fix connection issues
bun run db:doctor
```

#### Port Already in Use

```bash
# Kill processes on ports
npx kill-port 5173 3001 8787

# Or use different ports
PORT=5174 bun run dev:web
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
tsc --build --force

# Check for type issues
bun run type-check
```

#### Cloudflare Workers Issues

```bash
# Reset Wrangler config
wrangler logout
wrangler login

# Check worker logs
wrangler tail
```

### Debug Mode

Enable debug logging:

```bash
# Enable all debug logs
DEBUG=* bun run dev

# Enable specific debug logs
DEBUG=react-starter:* bun run dev
```

### Getting Help

1. **Check issues**: [GitHub Issues](https://github.com/RafiulM/react-starter/issues)
2. **Discord community**: [Join our Discord](https://discord.gg/react-starter)
3. **Documentation**: Check the `/documentation` folder
4. **AI assistance**: Use `bun run ai:help "your question"`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow our [Contributing Guide](CONTRIBUTING.md)
4. **Run tests**: `bun run test`
5. **Submit PR**: Push to your fork and create a pull request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb config with custom rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: For clear git history
- **Testing**: All code must have tests

### Commit Convention

```bash
# Format: type(scope): description
feat(api): add user authentication
fix(web): resolve routing issue
docs(readme): update installation guide
test(api): add user endpoint tests
```

### Pull Request Process

1. **Ensure tests pass**: `bun run test`
2. **Update documentation**: If adding features
3. **Add tests**: For new functionality
4. **Get code review**: At least one approval required
5. **Merge**: Squash and merge to main

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel**: For the amazing deployment platform
- **Cloudflare**: For edge computing and CDN
- **Neon**: For serverless PostgreSQL
- **Contributors**: Thank you to all our contributors!

---

<div align="center">
  <p>
    <a href="https://react-starter.dev">Website</a> •
    <a href="https://discord.gg/react-starter">Discord</a> •
    <a href="https://twitter.com/react_starter">Twitter</a>
  </p>
  <p>
    <i>Built with ❤️ by the React Starter team</i>
  </p>
</div>