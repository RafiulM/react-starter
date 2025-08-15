# Installation Guide

Get up and running with our application in just a few minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **npm, yarn, or pnpm** - Package manager of your choice
- **Git** - For version control

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/project.git
cd project
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://localhost:5432/myapp"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 4. Database Setup

Run the database migrations:

```bash
npm run db:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Verification

To verify your installation is working correctly:

1. Open your browser to `http://localhost:3000`
2. You should see the application dashboard
3. Check the console for any error messages

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Permission errors**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

**Database connection issues**
- Ensure PostgreSQL is running
- Verify your DATABASE_URL in `.env`
- Check firewall settings

## Next Steps

- [Quick Start Guide](quick-start) - Build your first component
- [Configuration](configuration) - Customize your setup
- [Development Tips](development) - Best practices and tips