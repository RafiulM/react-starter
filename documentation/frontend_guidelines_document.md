# Frontend Guideline Document

This document explains how the frontend of the **react-starter** monorepo is organized and built. It covers architecture, design principles, styling, components, state management, routing, performance, testing, and more—all in plain, everyday language.

## 1. Frontend Architecture

### 1.1 Overview
- We keep our frontend in `apps/web/` inside a single repository (monorepo) that also holds the backend (`apps/api/`) and shared utilities (`packages/`).
- The web app uses **React** (with **TypeScript**) to build user interfaces as reusable components.
- We use **Yarn Workspaces** so that shared code (data models, helper functions, types) lives in `packages/` and can be used by both frontend and backend without duplication.

### 1.2 Why This Helps
- **Scalability**: Adding new pages or sections is as simple as creating new components or routes—no big rewiring needed.
- **Maintainability**: Shared logic lives in one place, so fixes and updates automatically flow to both frontend and backend.
- **Performance**: React’s virtual DOM and code splitting mean we ship only the code needed for each page, keeping load times fast.

## 2. Design Principles

To ensure a great user experience, we follow three core principles:

1. **Usability**  
   - Clear, consistent navigation (header, sidebar) that feels familiar.  
   - Forms and buttons use straightforward labels and provide immediate feedback (loading spinners, error messages).

2. **Accessibility**  
   - Every interactive element (buttons, links, form fields) is keyboard-navigable.  
   - We add ARIA labels where needed and follow color-contrast guidelines so people with vision impairments can read our content.

3. **Responsiveness**  
   - We design mobile-first: layouts adapt fluidly from small phones to large desktop screens.  
   - Breakpoints are set at common widths (480px, 768px, 1024px) to adjust columns, menus, and font sizes.

These principles show up in every page, from the sign-in form to the AI Playground, making the app easy for everyone to use.

## 3. Styling and Theming

### 3.1 Styling Approach
- We use **CSS Modules** alongside **SASS**. Each component imports its own `.module.scss` file. This gives us:
  - Scoped styles (no global collisions)  
  - Nesting and variables in SASS for cleaner code  
  - A naming convention inspired by BEM (Block__Element--Modifier) for readability.

### 3.2 Theming
- We support **light and dark mode** using CSS custom properties (variables). A top-level `ThemeProvider` in React toggles a class on `<body>` (`.theme-light` or `.theme-dark`) and updates colors accordingly.

### 3.3 Visual Style
- Our look is **modern and flat** with subtle **glassmorphism** on cards and modals (light frosted-glass backgrounds, soft shadows).

### 3.4 Color Palette
| Role         | Light Mode   | Dark Mode    |
|--------------|--------------|--------------|
| Primary      | #1F75FE      | #4D8BFE      |
| Secondary    | #FFCA28      | #FFD95B      |
| Background   | #FFFFFF      | #121212      |
| Surface      | rgba(255,255,255,0.6) | rgba(18,18,18,0.6) |
| Accent       | #00C853      | #00E676      |
| Error        | #E53935      | #EF5350      |
| Success      | #43A047      | #66BB6A      |

### 3.5 Typography
- Primary font: **Inter**, a clean, highly readable sans-serif.  
- Fallbacks: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

## 4. Component Structure

### 4.1 Folder Layout
```
apps/web/src/
├─ components/       # Reusable UI pieces (Button, Card, Input)
├─ layouts/          # Page layouts (MainLayout with header/sidebar)
├─ pages/            # Top-level page components (Dashboard, Login)
├─ hooks/            # Custom React hooks (useAuth, useTheme)
├─ styles/           # Global styles, variables
└─ utils/            # Helper functions (formatDate, apiClient)
```

### 4.2 Why Components Matter
- **Reusability**: Build once, use everywhere—buttons, cards, form fields live in `components/` so you don’t rewrite the same code.
- **Consistency**: Shared components ensure every page looks and behaves the same way.
- **Maintainability**: When you update a component, every place it’s used automatically gets the change.

## 5. State Management

### 5.1 Local vs. Global State
- **Local state**: Managed with React’s `useState` or `useReducer` inside a component for UI bits (e.g., a form’s input values).
- **Global state**: We use **React Context** for things like:
  - **Authentication** (current user, JWT token)  
  - **Theme** (light/dark mode)  
  - **Settings** (notification preferences)

Context providers wrap the app at a high level (`App.tsx`). Components use a simple `useAuth()` or `useTheme()` hook to read and update that state.

### 5.2 Data-fetching State
- For server data (API calls), we fetch in React effects (`useEffect`) or with libraries like **SWR** or **React Query** (optional). These tools help with caching, background refresh, and loading/error states.

## 6. Routing and Navigation

- We use **React Router v6**.
- In `App.tsx`, we wrap the app in `<BrowserRouter>` and define routes with `<Routes>` and `<Route>`.
- We group private (authenticated) routes under a `ProtectedRoute` component that checks for a valid token and redirects to login if needed.
- Navigation links live in the sidebar (`<NavLink>`), so clicking changes the URL and renders the matching page without a full reload.

## 7. Performance Optimization

1. **Code Splitting & Lazy Loading**  
   - Pages are loaded on demand with `React.lazy()` and `<Suspense>`, so the browser only downloads code for the page you visit.

2. **Asset Optimization**  
   - We compress images and serve SVG icons.  
   - Webpack (or Vite) tree-shakes unused code.

3. **Memoization**  
   - Use `React.memo` for pure components and `useMemo`/`useCallback` for expensive calculations or stable callbacks.

4. **Caching**  
   - Client-side data libraries (SWR/React Query) cache results and avoid unnecessary network requests.

Together, these steps keep page loads and interactions snappy.

## 8. Testing and Quality Assurance

### 8.1 Automated Checks
- **ESLint** and **Prettier** enforce code style.  
- **Husky** runs lint/format checks before every commit.

### 8.2 Unit and Integration Tests
- **Jest** + **React Testing Library** are used for:
  - Unit tests on components.  
  - Integration tests on component groups (e.g., form + API call).

### 8.3 End-to-End Tests
- **Cypress** simulates real user flows (sign-up, login, navigating the dashboard) in a real browser.

### 8.4 Coverage and Reports
- We aim for meaningful coverage on critical paths (authentication, form validation, AI Playground). Test reports run in CI to catch regressions.

## 9. Conclusion and Overall Frontend Summary

The **react-starter** frontend is built to be:
- **Modular**: Components and styles live in well-organized folders.  
- **Maintainable**: Shared code in `packages/` and standard patterns reduce duplication.  
- **User-Friendly**: Responsive, accessible, and designed with clear feedback.  
- **Performant**: Lazy loading, caching, and optimized assets keep things fast.  
- **Tested**: From unit tests to end-to-end flows, we ensure reliability.

These guidelines give you a clear path for building new pages, adding features, and keeping the codebase healthy. Welcome aboard—let’s build something great!