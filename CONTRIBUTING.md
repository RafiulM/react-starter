# Contributing to React Starter

Thank you for your interest in contributing to React Starter! This document provides guidelines and instructions for contributing to our monorepo project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (check with `node --version`)
- pnpm (preferred package manager)
- Git

### Quick Setup
1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-starter.git
   cd react-starter
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Development Environment**
   ```bash
   # Copy environment variables
   cp .env.example .env
   
   # Start development servers
   pnpm dev
   ```

## 🏗️ Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Messages
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add dark mode toggle to settings page
fix: resolve memory leak in dashboard component
docs: update API documentation for new endpoints
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test -- src/components/Button.test.tsx
```

### Test Coverage
- Aim for >80% code coverage
- Write tests for new features
- Update tests when modifying existing functionality

## 🎨 Code Standards

### Code Formatting
We use Prettier for code formatting and ESLint for linting:

```bash
# Check formatting
pnpm format:check

# Fix formatting issues
pnpm format:fix

# Check linting
pnpm lint

# Fix linting issues automatically
pnpm lint:fix
```

### Pre-commit Hooks
Husky pre-commit hooks automatically run:
- Linting (ESLint)
- Formatting (Prettier)
- Type checking (TypeScript)
- Tests (Jest)

### TypeScript
- Use strict TypeScript settings
- Avoid `any` type - use proper type definitions
- Add JSDoc comments for complex functions

## 📁 Monorepo Structure

Our monorepo is organized as:

```
react-starter/
├── apps/                 # Applications
│   ├── web/             # React web application
│   └── docs/            # Documentation site
├── packages/            # Shared packages
│   ├── ui/              # UI components
│   ├── utils/           # Utility functions
│   └── config/          # Shared configuration
├── infrastructure/      # Infrastructure as Code
│   ├── terraform/       # Cloud infrastructure
│   └── docker/          # Container configurations
├── documentation/       # Project documentation
└── .github/            # GitHub workflows and templates
```

### Frontend Contributions
- **Location**: `apps/web/`
- **Tech Stack**: React, TypeScript, Tailwind CSS
- **Components**: Use shared UI library from `packages/ui/`

### Backend Contributions
- **Location**: `apps/api/` (if exists)
- **Tech Stack**: Node.js, Express, PostgreSQL
- **Database**: Neon PostgreSQL

### Shared Packages
- **UI Components**: `packages/ui/`
- **Utilities**: `packages/utils/`
- **Configuration**: `packages/config/`

## 🔧 Development Commands

### Available Scripts
```bash
# Development
pnpm dev              # Start all development servers
pnpm dev:web          # Start web app only
pnpm dev:docs         # Start docs site only

# Building
pnpm build           # Build all packages
pnpm build:web       # Build web app
pnpm build:packages  # Build shared packages

# Testing
pnpm test            # Run all tests
pnpm test:web        # Run web app tests
pnpm test:packages   # Run package tests

# Quality
pnpm lint            # Lint all code
pnpm format          # Format all code
pnpm type-check      # Type check all packages
```

## 📋 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow code standards
   - Write/update tests
   - Update documentation

3. **Test Changes**
   ```bash
   pnpm test
   pnpm build
   pnpm lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **PR Description Template**
   ```markdown
   ## Summary
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tests pass locally
   - [ ] Added tests for new functionality
   - [ ] Updated documentation

   ## Screenshots (if applicable)
   Add screenshots or GIFs showing changes
   ```

## 🔍 Code Review Process

### Review Criteria
- **Functionality**: Does the code work as expected?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Testing**: Are there adequate tests?
- **Documentation**: Is the code well-documented?

### Review Guidelines
- Be constructive and respectful
- Focus on the code, not the person
- Provide specific, actionable feedback
- Approve when ready, request changes if improvements needed

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, include:
- **Bug description**: Clear, concise description
- **Reproduction steps**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable

### Feature Requests
For feature requests, include:
- **Feature description**: What you want to add
- **Use case**: Why this feature is needed
- **Proposed solution**: How you think it should work
- **Alternatives**: Other approaches considered

## 📞 Getting Help

### Resources
- **Documentation**: Check `documentation/` folder
- **Issues**: Browse [GitHub Issues](https://github.com/RafiulM/react-starter/issues)
- **Discussions**: Start a [GitHub Discussion](https://github.com/RafiulM/react-starter/discussions)

### Support Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Discord**: Real-time chat (if available)

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you agree to uphold this code.

## 🏆 Recognition

Contributors are recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Release notes
- **GitHub**: Contributors graph

Thank you for contributing to React Starter! 🚀