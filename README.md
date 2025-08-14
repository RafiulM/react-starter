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

We welcome contributions! This project follows a comprehensive contribution process designed to maintain high code quality and ensure smooth collaboration.

### 🚀 Quick Start Contributing

1. **Fork the repository** on GitHub
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/react-starter.git`
3. **Create feature branch**: `git checkout -b feature/amazing-feature`
4. **Set up development**: `bun install && cp .env.example .env.local`
5. **Make changes**: Follow our comprehensive [Contributing Guide](CONTRIBUTING.md)
6. **Test thoroughly**: `bun run test && bun run type-check`
7. **Submit PR**: Push to your fork and create a pull request

### 📋 Ways to Contribute

- **🐛 Bug Reports**: Use our [Bug Report Template](https://github.com/RafiulM/react-starter/issues/new?template=bug_report.yml)
- **✨ Feature Requests**: Use our [Feature Request Template](https://github.com/RafiulM/react-starter/issues/new?template=feature_request.yml)
- **📖 Documentation**: Improve docs, README, or add examples
- **🧪 Testing**: Add tests, improve test coverage
- **🔧 Code**: Fix bugs, implement features, refactor code
- **🎨 Design**: Improve UI/UX, add new components
- **📊 Performance**: Optimize queries, improve bundle size
- **🔒 Security**: Report vulnerabilities, improve security

### 🔧 Development Guidelines

#### Code Standards
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Airbnb config with custom project-specific rules
- **Prettier**: Consistent code formatting across the entire codebase
- **Testing**: Minimum 80% code coverage required for new features
- **Documentation**: All public APIs and complex functions must be documented

#### Commit Convention (Conventional Commits)
```bash
# Format: type(scope): description
feat(web): add dark mode toggle component
fix(api): resolve user authentication token expiration
docs(readme): update installation instructions for Windows
test(ui): add visual regression tests for Button component
refactor(utils): simplify date formatting utility functions
style(web): format code with updated Prettier configuration
chore(deps): update React to version 18.3.0
```

#### Branch Naming Strategy
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements
- `hotfix/description` - Critical production fixes

### 🔄 Pull Request Process

1. **Pre-submission Checklist**:
   - [ ] All tests pass: `bun run test`
   - [ ] Type checking passes: `bun run type-check`
   - [ ] Linting passes: `bun run lint`
   - [ ] Formatting is consistent: `bun run format`
   - [ ] Documentation updated for new features
   - [ ] Commit messages follow convention

2. **PR Description Template**:
   ```markdown
   ## Summary
   Brief description of changes made

   ## Type of Change
   - [ ] Bug fix (non-breaking change which fixes an issue)
   - [ ] New feature (non-breaking change which adds functionality)
   - [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactoring

   ## Testing
   - [ ] Tests pass locally
   - [ ] New tests added for new functionality
   - [ ] Existing tests updated if needed
   - [ ] Manual testing completed

   ## Screenshots/Videos
   <!-- If applicable, add screenshots or videos to demonstrate changes -->

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Code is commented where necessary
   - [ ] Documentation updated
   - [ ] No breaking changes (or documented if any)
   ```

3. **Review Process**:
   - **Automated Checks**: All CI checks must pass
   - **Code Review**: At least one maintainer approval required
   - **Testing**: Feature must be tested in preview environment
   - **Documentation**: Updates must be reviewed for clarity
   - **Security**: Security implications must be assessed

### 🎯 Issue Reporting

#### Bug Reports
Found a bug? Please use our [Bug Report Template](https://github.com/RafiulM/react-starter/issues/new?template=bug_report.yml) which includes:
- Environment details (OS, Node version, browser)
- Step-by-step reproduction instructions
- Expected vs actual behavior
- Screenshots/videos if applicable
- Error logs and console output

#### Feature Requests
Have an idea? Use our [Feature Request Template](https://github.com/RafiulM/react-starter/issues/new?template=feature_request.yml) with:
- Problem statement and use case
- Proposed solution and alternatives
- Impact assessment and affected areas
- Implementation details if available

### 📚 Resources for Contributors

- **[Contributing Guide](CONTRIBUTING.md)**: Comprehensive development setup and guidelines
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Community guidelines and expectations
- **[Architecture Guide](documentation/architecture.md)**: Technical architecture overview
- **[API Documentation](documentation/api.md)**: API endpoints and usage
- **[Component Library](packages/ui/README.md)**: Shared UI component documentation
- **[Discord Community](https://discord.gg/react-starter)**: Real-time discussion and support

### 🏆 Recognition

Contributors are recognized through:
- **GitHub Contributors**: Automatic recognition in repository contributors
- **README Contributors**: Special mention in our contributors section
- **CHANGELOG.md**: Attribution for significant contributions
- **Release Notes**: Highlighted in GitHub releases
- **Discord Role**: Special contributor role in our community

### 📞 Getting Help

- **GitHub Issues**: [Bug reports and feature requests](https://github.com/RafiulM/react-starter/issues)
- **GitHub Discussions**: [General questions and ideas](https://github.com/RafiulM/react-starter/discussions)
- **Discord**: [Join our community](https://discord.gg/react-starter)
- **Documentation**: Check the `/documentation` folder
- **AI Assistant**: Use `bun run ai:help "your question"`

### 🎯 First-Time Contributors

Not sure where to start? Check out our [Good First Issues](https://github.com/RafiulM/react-starter/labels/good%20first%20issue) or [Help Wanted](https://github.com/RafiulM/react-starter/labels/help%20wanted) labels. We also welcome:
- **Documentation improvements**
- **Test coverage additions**
- **UI/UX enhancements**
- **Performance optimizations**
- **Accessibility improvements**

**Ready to contribute?** Start by reading our [Contributing Guide](CONTRIBUTING.md) and joining our community!

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