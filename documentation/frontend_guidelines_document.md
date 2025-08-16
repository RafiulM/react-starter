# Frontend Guideline Document

This document explains the frontend setup, design principles, and technologies used in the `rafiulm/react-starter` project. Anyone—technical or not—can follow these guidelines to understand and extend the frontend without confusion.

## 1. Frontend Architecture

**Overview**
- Core UI library: **React** with **TypeScript** for type safety.
- Routing: **React Router** to manage page navigation without full reloads.
- Monorepo structure: the frontend lives in `apps/frontend/`, sharing configuration and dependencies with the `apps/api` backend.

**Scalability**
- Component-based structure allows teams to add, update, or replace features independently.
- Shared utilities (API clients, hooks, context providers) live in a common folder so changes propagate across the app.

**Maintainability**
- Strict TypeScript settings (`--strict`) catch errors early and document data shapes.
- ESLint and Prettier run automatically via Husky hooks, enforcing consistent code style and preventing accidental merge conflicts.

**Performance**
- Code splitting via `React.lazy` and `Suspense` ensures only the code needed for each page loads.
- Optimized builds remove unused code (tree shaking) and generate compressed bundles (gzip or Brotli).

## 2. Design Principles

**1. Usability**
- Keep interfaces simple and intuitive: clear labels, predictable navigation, and feedback on actions (loading spinners, success/toast messages).

**2. Accessibility**
- Follow WCAG guidelines: semantic HTML elements, ARIA roles where needed, and keyboard focus states.
- Color choices meet contrast ratios for readability.

**3. Responsiveness**
- Mobile-first CSS: layouts adjust seamlessly from small phones to large desktops.
- Use relative units (`rem`, `%`) and CSS Grid or Flexbox for flexible layouts.

**4. Consistency**
- Reusable components (buttons, inputs, cards) follow the same padding, margin, and typography rules.
- Single source of truth for spacing and font sizes via CSS variables or a design tokens file.

## 3. Styling and Theming

**Styling Approach**
- **CSS Modules** with optional **SASS** preprocessor for scoped styles and nesting.
- Class names follow the **BEM** (Block–Element–Modifier) pattern:
  - `Button` component:  
    • `.button` (Block)  
    • `.button--primary` (Modifier)  
    • `.button__icon` (Element)

**Theming**
- A central `_variables.scss` or `themes.ts` file defines color variables, font sizes, and spacing tokens.
- The root `<html>` or `<body>` tag gets a class (e.g., `theme-light` / `theme-dark`) to switch palettes.

**Visual Style**
- **Modern flat design** with subtle shadows and smooth transitions.
- Occasional **glassmorphism** accents on modals or cards for a touch of depth.

**Color Palette**
- Primary: `#1E90FF` (Dodger Blue)
- Secondary: `#6C63FF` (Violet)
- Accent: `#FF8C00` (Dark Orange)
- Background: `#F5F7FA` (Light Gray)
- Surface: `#FFFFFF` (White)
- Text Primary: `#1A1A1A` (Very Dark Gray)
- Text Secondary: `#4A4A4A` (Dark Gray)

**Typography**
- Base font: **Inter**, a modern, legible sans-serif.
- Fallbacks: `system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif`.

## 4. Component Structure

**Folder Organization**
```
apps/frontend/
└─ src/
   ├─ components/       # Reusable UI pieces
   │  ├─ Button/
   │  ├─ Card/
   │  └─ ...
   ├─ pages/            # Top-level views (mapped by React Router)
   ├─ hooks/            # Custom React hooks
   ├─ context/          # React Context providers
   ├─ services/         # API client modules
   └─ styles/           # Global styles, variables
```

**Reusability**
- Each component has its own folder with `Component.tsx`, `Component.module.scss`, and `Component.test.tsx`.
- Encourages isolation and easier maintenance—updating one button style updates all uses.

## 5. State Management

**Local State**
- Handled with React’s built-in `useState`, `useReducer` for complex component logic.

**Global State**
- **React Context** for shared data like theme, user session, or feature flags.
- For larger apps, adopt **Redux Toolkit**:
  - Simplifies reducers and actions.
  - Built-in support for middleware, type-safe hooks (`useAppDispatch`, `useAppSelector`).

**Data Fetching**
- Use `useEffect` or a library like **React Query** (optional) to cache, dedupe, and sync server state.

## 6. Routing and Navigation

- **React Router v6** handles navigation:
  - `BrowserRouter` at app root.
  - `Routes` and `Route` components map URLs to page components.
  - Nested routes for layouts (e.g., sidebar + content).

- **Programmatic navigation** via the `useNavigate` hook.
- **Route guards** implemented in a custom `ProtectedRoute` wrapper that checks user context or tokens before rendering a page.

## 7. Performance Optimization

- **Lazy Loading**: Split components and pages to load on demand using `React.lazy` and `<Suspense>`.
- **Image Optimization**: Use responsive images (`srcset`), modern formats (WebP), and lazy-load offscreen images.
- **Memoization**: Wrap expensive calculations or pure components with `React.memo`, `useMemo`, or `useCallback`.
- **Asset Minification**: CSS and JS are minified during the production build.
- **Bundle Analysis**: Regularly run tools like `webpack-bundle-analyzer` to spot large dependencies.

## 8. Testing and Quality Assurance

**Unit Tests**
- **Jest** and **React Testing Library**:
  - Test individual components, hooks, and utility functions.
  - Aim for clear, behavior-driven tests (e.g., “when clicking the button, the modal opens”).

**Integration Tests**
- Combine components and API calls in isolation using mocked service modules.

**End-to-End Tests**
- **Cypress** or **Playwright**:
  - Simulate user flows (login, form submissions, navigation).
  - Run against local dev server or deployed preview builds.

**Linting & Formatting**
- **ESLint** with TypeScript plugin enforces code rules.
- **Prettier** for consistent formatting.
- **Husky** Git hooks run lint and tests before commits and pushes.

## 9. Conclusion and Overall Frontend Summary

The `react-starter` frontend is built on React and TypeScript, emphasizing a clear component structure, consistent styling, and solid type safety. Key takeaways:
- Scalable, maintainable architecture through monorepo and component-based design.
- User-centered design guided by usability, accessibility, and responsiveness.
- Flexible styling with CSS Modules, BEM, theming support, and a modern flat aesthetic.
- Lightweight state management using React Context, with room to adopt Redux Toolkit or React Query as needed.
- Smooth navigation via React Router and guarded routes for authentication.
- Performance best practices like lazy loading, memoization, and bundle analysis.
- Comprehensive testing strategy covering unit, integration, and end-to-end tests.

These guidelines align with the project’s goal to provide a rock-solid foundation for building modern web applications quickly and consistently. By following them, you’ll ensure a high-quality user experience and a developer experience that scales with your team and codebase.
