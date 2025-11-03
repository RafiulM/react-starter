# Frontend Guideline Document: React Starter Kit

This document outlines the frontend setup, architecture, design principles, and technologies behind the React Starter Kit. It’s written in everyday language so anyone can understand how to build, style, and maintain the frontend without getting lost in technical jargon.

## 1. Frontend Architecture

### Technology Stack
- **React 19**: Our UI library for building components.
- **TanStack Router**: A type-safe router that handles navigation and data loading.
- **Vite**: A lightning-fast dev server and build tool.
- **Tailwind CSS** & **shadcn/ui**: Utility-first styling with a headless, customizable component library.
- **Jotai**: An atomic state management library for local state.
- **TypeScript**: Ensures type safety across the frontend code.

### Monorepo Structure
- Organized under `apps/app` for the main React app, sharing code with other workspaces (e.g., `packages/ui`, `packages/core`).
- Promotes code reuse and consistent versions across multiple applications.

### How It Supports Scalability, Maintainability, and Performance
- **Scalability**: Modular code in separate packages lets teams work independently on features or shared utilities.
- **Maintainability**: TypeScript and shared component libraries prevent duplication and ease refactoring.
- **Performance**: Vite’s hot module replacement (HMR), code splitting, and edge-first deployment on Cloudflare Workers reduce load times globally.

## 2. Design Principles

1. **Usability**
   - Clear navigation, consistent layouts, and predictable interactions.
   - Forms and controls follow familiar patterns (labels, placeholders, and error messages).

2. **Accessibility**
   - Semantic HTML tags (buttons, headings, landmarks).
   - ARIA attributes where needed and focus management in dialogs and menus.
   - Color contrast meeting WCAG guidelines.

3. **Responsiveness**
   - Mobile-first design with Tailwind’s breakpoint utilities (`sm`, `md`, `lg`, `xl`).
   - Flexible layouts using CSS grid and flexbox utilities.

4. **Consistency**
   - Shared UI components from `packages/ui` ensure the same look and feel.
   - Design tokens (colors, spacing, font sizes) defined in one place.

## 3. Styling and Theming

### Styling Approach
- **Tailwind CSS**: Utility classes for rapid styling without writing custom CSS.
- **shadcn/ui**: Headless components built on Tailwind, offering accessible defaults and full customization.

### Theming
- All colors and font sizes are managed in `tailwind.config.js`.
- Dark and light modes available via CSS variables and a simple toggle stored in Jotai.

### Visual Style
- **Flat, Modern Design**: Minimal shadows, clean edges, and ample white space.
- **Subtle Depth**: Light shadows on cards and modals for visual hierarchy.

### Color Palette
- **Primary**: #1E3A8A (Indigo-800)
- **Secondary**: #2563EB (Blue-600)
- **Accent**: #10B981 (Emerald-500)
- **Neutral Light**: #F3F4F6 (Gray-100)
- **Neutral Dark**: #374151 (Gray-700)
- **Feedback**:
  - Success: #16A34A (Green-600)
  - Warning: #F59E0B (Amber-500)
  - Error: #DC2626 (Red-600)

### Fonts
- **Primary Font**: Inter (a modern, highly legible sans-serif).
- Loaded via CDN or local import in `index.html`.

## 4. Component Structure

- **Atomic Design**: Components organized as atoms (buttons, inputs), molecules (form groups, cards), and organisms (headers, footers).
- **Shared Library**: `packages/ui` holds all reusable components.
- **Local Overrides**: App-specific tweaks live in `apps/app/components`.

Why Component-Based Architecture Matters:
- **Reusability**: Write once, use everywhere.
- **Testability**: Isolated components are easier to test.
- **Maintainability**: Clear boundaries and responsibilities.

## 5. State Management

- **Jotai for Client State**:
  - Fine-grained atoms for individual pieces of state (e.g., theme, user preferences).
- **TanStack Router Loaders**:
  - Fetch server data on route entry, automatically cache and update UI.
- **Server State**:
  - Handled via tRPC calls; React components retrieve and mutate data through TanStack Router’s loader/actions.

This hybrid approach keeps local UI state separate from server data, ensuring a snappy experience and predictable updates.

## 6. Routing and Navigation

- **TanStack Router**:
  - Define routes in a central file (`router.ts`).
  - Nested layouts (e.g., `/dashboard` and its subpages) automatically render within parent components.
  - Data loaders tied to routes fetch required data before rendering.
- **Navigation Structure**:
  - Top-level menu links for main sections (Home, Dashboard, Profile).
  - Sidebar or tabs for nested subsections within a page.

## 7. Performance Optimization

1. **Code Splitting & Lazy Loading**
   - Dynamic `import()` for large or rarely used components.
   - Route-based splitting via TanStack Router.

2. **Asset Optimization**
   - Vite auto-compresses and hashes assets.
   - SVGs inlined or loaded as React components for smaller bundle size.

3. **Edge-First Deployment**
   - Cloudflare Workers deliver static assets and API from the nearest location.
   - Caching headers configured for long-term asset caching.

4. **Bundle Analysis**
   - Use `vite-plugin-inspect` or `rollup-plugin-visualizer` to track bundle size.

## 8. Testing and Quality Assurance

- **Unit Tests**: Vitest for testing utility functions and small components.
- **Component Tests**: React Testing Library for rendering components and asserting behavior.
- **Integration Tests**: Combining multiple units (e.g., form + API call mock) to ensure flows work.
- **End-to-End Tests**: Cypress or Playwright for full user journey tests (login, form submission).
- **Linting & Formatting**:
  - ESLint with recommended rules plus TypeScript plugin.
  - Prettier for consistent code style.
- **CI Pipeline**:
  - GitHub Actions running tests, linting, and build on every pull request.

## 9. Conclusion and Summary

The React Starter Kit frontend is built around a modern, scalable architecture that prioritizes performance, type safety, and developer experience. Key takeaways:
- Monorepo structure for code sharing and consistency.
- Clear design principles: usability, accessibility, responsiveness.
- Tailwind CSS + shadcn/ui for fast, consistent styling.
- Atomic component organization enhancing reuse and testability.
- Hybrid state management with Jotai and TanStack Router loaders.
- Edge-first deployment minimizing latency worldwide.
- Robust testing strategy ensuring code quality.

By following these guidelines, teams can efficiently build and maintain a frontend that meets user needs, scales with growing requirements, and stays fast across the globe.