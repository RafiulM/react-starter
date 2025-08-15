# Contributing to React Starter

Thank you for your interest in contributing to this React starter project! This document provides guidelines and instructions for contributing effectively.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Pull Request Guidelines](#pull-request-guidelines)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **Bun**: 1.2.0 or higher (recommended package manager)
- **Git**: Latest version

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-starter.git
   cd react-starter
   ```

3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/RafiulM/react-starter.git
   ```

## 🔧 Development Setup

### Install Dependencies

```bash
# Install all dependencies
bun install

# Install git hooks
bun run prepare
```

### Environment Setup

1. Copy environment variables:
   ```bash
   # For the API app
   cp apps/api/.env.example apps/api/.env
   
   # For the Edge app
   cp apps/edge/.env.example apps/edge/.env
   ```

2. Fill in the required environment variables in the `.env` files

### Start Development Servers

```bash
# Start all apps in development mode
bun run dev

# Start specific apps
bun run dev:web    # Start web app
bun run dev:api    # Start API server
bun run dev:edge   # Start edge functions
```

Available development servers:
- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **Edge Functions**: http://localhost:3002

## 🎨 Code Standards

### Code Formatting

We use **ESLint** and **Prettier** to maintain consistent code style:

- **ESLint**: Enforces code quality and best practices
- **Prettier**: Handles code formatting automatically

#### Configuration Files
- ESLint: `eslint.config.ts`
- Prettier: `package.json` (under `prettier` key)

#### VS Code Setup

Recommended VS Code extensions will be suggested when you open the project. Install the recommended extensions for:
- ESLint integration
- Prettier formatting
- TypeScript support
- React development

### Code Style Guidelines

- Use **TypeScript** for all new files
- Follow **React functional components** with hooks
- Use **camelCase** for variables and functions
- Use **PascalCase** for components and types
- Use **kebab-case** for file names (e.g., `user-profile.tsx`)
- Prefer **arrow functions** for callbacks and components
- Use **early returns** to reduce nesting
- Keep components **small and focused**

### Git Hooks

We use **Husky** to run pre-commit checks:
- **Linting**: ESLint checks
- **Formatting**: Prettier formatting
- **Type checking**: TypeScript compilation check
- **Tests**: Runs related test suites

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names following this pattern:
- `feature/add-user-authentication`
- `fix/login-form-validation`
- `docs/update-readme`
- `refactor/api-error-handling`
- `test/add-unit-tests`

### Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(auth): add user registration form
fix(api): resolve user data validation issue
docs(readme): update installation instructions
style(web): format component files with prettier
test(api): add unit tests for user endpoints
refactor(web): simplify state management in user profile
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun run test

# Run tests for specific apps
bun run test:web
bun run test:api
bun run test:edge

# Run tests in watch mode
bun run test --watch

# Run tests with coverage
bun run test --coverage
```

### Test Structure

- **Unit tests**: Test individual functions and components
- **Integration tests**: Test API endpoints and database operations
- **E2E tests**: Test complete user workflows (when available)

### Writing Tests

- Place tests in `__tests__` directories or `*.test.ts` files
- Use **Vitest** for testing framework
- Follow **AAA pattern**: Arrange, Act, Assert
- Write **descriptive test names** that explain the behavior
- Aim for **high test coverage** (>80%)

## 📝 Submitting Changes

### Before Submitting

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following the code standards

4. **Run quality checks**:
   ```bash
   # Run linting
   bun run lint
   
   # Run type checking
   bun run typecheck
   
   # Run tests
   bun run test
   
   # Build the project
   bun run build
   ```

5. **Commit your changes** with descriptive messages

## 🐛 Issue Reporting

### GitHub Templates

This repository currently **does not use GitHub issue or pull request templates**. When creating issues or PRs, please follow the guidelines below to ensure your contributions are well-documented and easy to understand.

### Bug Reports

When reporting bugs, include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs **actual behavior**
- **Environment details** (browser, OS, Node version)
- **Screenshots** or **error messages** if applicable
- **Minimal reproduction case** if possible

**Bug Report Format:**
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Node.js version: [e.g. 18.17.0]
- Package manager: [e.g. bun@1.2.19]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other context about the problem
```

### Feature Requests

For feature requests, provide:

- **Clear description** of the proposed feature
- **Use case** and **motivation**
- **Possible implementation** approach
- **Alternatives** considered

**Feature Request Format:**
```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this feature work?

## Use Cases
Specific examples of when this would be useful

## Implementation Ideas
Any thoughts on how this could be implemented

## Alternatives Considered
Other approaches you've considered
```

## 🔄 Pull Request Guidelines

### Before Creating PR

1. **Ensure tests pass**:
   ```bash
   bun run test
   bun run typecheck
   bun run lint
   ```

2. **Update documentation** if your changes affect usage

3. **Add tests** for new features or bug fixes

### Pull Request Description Template

Since we don't use GitHub PR templates, please use this format when creating pull requests:

```markdown
## Summary
Brief description of the changes made.

## Changes Made
- List specific changes
- Use bullet points for clarity
- Reference specific files/components changed

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Other (please describe):

## Testing
- [ ] Tests pass locally (`bun run test`)
- [ ] Added tests for new functionality
- [ ] Updated existing tests
- [ ] Manual testing completed
- [ ] Updated documentation if needed

## Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented where necessary
- [ ] Corresponding changes to documentation made
- [ ] No new warnings generated
- [ ] All tests pass
- [ ] Commit messages follow conventional commits format

## Screenshots (if applicable)
Include before/after screenshots for UI changes. Use markdown tables for comparison:

| Before | After |
|--------|--------|
| ![before](url) | ![after](url) |

## Related Issues
Fixes #(issue_number)
Related to #(issue_number)

## Breaking Changes
List any breaking changes and migration steps required.

## Additional Notes
Any additional context or notes for reviewers.
```

### PR Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Address feedback** promptly
4. **Squash commits** if requested
5. **Update branch** with latest main if needed

## 🎯 Project Structure

```
react-starter/
├── apps/
│   ├── api/          # API server (Express/Node.js)
│   ├── app/          # Main React web application
│   ├── edge/         # Edge functions (Cloudflare Workers)
│   └── web/          # Static web pages (Astro)
├── db/               # Database schema and migrations
├── docs/             # Documentation (VitePress)
├── packages/         # Shared packages/utilities
├── scripts/          # Build and utility scripts
└── infra/            # Infrastructure (Terraform)
```

## 📚 Additional Resources

- [Project Documentation](docs/)
- [API Documentation](apps/api/README.md)
- [Web App README](apps/app/README.md)
- [Database Schema](docs/database-schema.md)
- [Deployment Guide](docs/deployment.md)

## ❓ Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Project Documentation**: Check the `docs/` directory
- **Code Comments**: Look for inline documentation

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

Thank you for contributing to this React starter project! Your efforts help make this a better resource for the entire React community.