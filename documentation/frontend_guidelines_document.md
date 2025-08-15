# Frontend Guideline Document

This document outlines the frontend setup for the `react-starter` monorepo. It covers architecture, design principles, styling, component structure, state management, routing, performance tips, testing strategies, and a summary. Anyone should be able to understand how we build and maintain the user interface without needing deep technical knowledge.

## 1. Frontend Architecture

### Overview
- The frontend lives in `apps/web` (or `apps/client`) inside the monorepo. It’s a React application written in TypeScript.
- We use React 18+ for building UIs, React Router v6 for navigation, and Redux Toolkit for state management.
- CSS Modules with Sass power our styling, ensuring styles are scoped to components and prevent naming conflicts.

### How It Supports Scalability, Maintainability, and Performance
- **Monorepo Structure**: Co-locates frontend, backend, and shared packages. Promotes code sharing, consistent tooling, and easier version management.
- **TypeScript Everywhere**: Provides static typing that catches bugs early and improves editor assistance (autocomplete, refactoring).
- **Component-Based Design**: Breaks UI into reusable pieces. Teams can work on different features without stepping on each other’s toes.
- **Lazy Loading & Code Splitting**: Enables loading only the code needed for the current view, reducing initial load time.

## 2. Design Principles

### Usability
- Keep interfaces intuitive and predictable.
- Use clear labels, straightforward navigation, and provide feedback for user actions (e.g., button loading states).

### Accessibility (a11y)
- Follow WCAG 2.1 guidelines:
  - Ensure all interactive elements are keyboard-navigable.
  - Use semantic HTML (buttons, headings, lists).
  - Provide appropriate ARIA labels when needed.
  - Maintain color contrast ratios of at least 4.5:1 for text.

### Responsiveness
- The layout adjusts gracefully from mobile (320px) to large desktop (1920px).
- Use CSS Grid and Flexbox for flexible, content-driven layouts.
- Define breakpoints: 576px (sm), 768px (md), 992px (lg), 1200px (xl).

## 3. Styling and Theming

### Styling Approach
- **CSS Modules + Sass**: Each component gets its own `.module.scss` file. Styles are locally scoped by default, avoiding global namespace pollution.
- **Naming Convention**: We follow BEM-inspired class names within modules (e.g., `Header__title`, `Card--highlighted`).

### Theming
- A central `theme.scss` defines variables for colors, typography, spacing, and breakpoints.
- Components import and use these variables to ensure consistency.

### Visual Style
- Style: Modern flat design with subtle shadows and rounded corners (4px). Minimal glassmorphism to keep the UI light.

### Color Palette
- Primary: #1D4ED8 (blue)
- Secondary: #10B981 (green)
- Accent: #F59E0B (amber)
- Background: #F3F4F6 (light gray)
- Surface: #FFFFFF (white)
- Text Primary: #111827 (dark gray)
- Text Secondary: #6B7280 (medium gray)

### Typography
- Font Family: Inter, sans-serif
- Headings: weight 600–700
- Body: weight 400
- Line-height: 1.5

## 4. Component Structure

### Folder Organization
```
apps/web/src/
  components/      # Reusable UI pieces (buttons, inputs, cards)
    Button/
      Button.tsx
      Button.module.scss
  features/        # Feature-specific components (AuthForm, Dashboard)
  layout/          # Layout components (Header, Footer, Sidebar)
  pages/           # Route-level components (HomePage, ProfilePage)
  hooks/           # Custom React hooks
  services/        # API calls and business logic
  store/           # Redux setup
  utils/           # Helper functions
```

### Reuse and Maintainability
- Each component folder contains its logic, styles, and tests.
- Shared UI components live in `components/` and are documented with usage examples.
- Atomic design principles encourage small “atom” components (Button, Input) that compose into larger “molecules” and “organisms.”

## 5. State Management

### Approach
- **Redux Toolkit** centralizes global state in a `store/` folder.
- Each feature has its own slice (`createSlice`) with actions and reducers.
- Components subscribe to needed state via `useSelector` and dispatch changes with `useDispatch`.

### Sharing State
- Local component state uses `useState` or `useReducer`.
- Global state (e.g., user session, theme, notifications) lives in the Redux store.
- Async logic handled with Redux Thunks or Redux Toolkit’s `createAsyncThunk`.

## 6. Routing and Navigation

### Library
- We use **React Router v6** for client-side routing.

### Structure
```js
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainLayout />}>  
      <Route index element={<HomePage />} />
      <Route path="login" element={<AuthPage />} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```
- **ProtectedRoute** wrapper redirects unauthenticated users to `/login`.
- Layout components (`<MainLayout>`) contain shared UI (header, footer).

## 7. Performance Optimization

- **Code Splitting**: Use `React.lazy` and `Suspense` to load page components on demand.
- **Image Optimization**: Serve compressed images (`.webp` or resized `.jpg/.png`) via build tools.
- **Tree Shaking**: Leverage ES modules so unused code is removed during bundling.
- **Caching**: Set long cache headers for static assets in deployment.
- **Bundle Analysis**: Regularly inspect bundle size (e.g., with `source-map-explorer`) to catch bloat.

## 8. Testing and Quality Assurance

### Testing Levels
- **Unit Tests**: Validate individual functions and components using **Jest** and **React Testing Library**.
- **Integration Tests**: Test how components work together (e.g., form submissions) with React Testing Library.
- **End-to-End Tests**: Cover critical user flows (signup, login, data fetch) with **Cypress** or **Playwright**.

### Tooling
- **ESLint** with TypeScript rules enforces code style and catches common errors.
- **Prettier** standardizes formatting.
- **Husky** runs `lint` and `test` scripts on pre-commit to prevent bad code from entering the repo.
- **CI Integration**: GitHub Actions (or similar) runs lint, build, and test on every pull request.

## 9. Conclusion and Overall Frontend Summary

This document lays out a clear, opinionated frontend setup: a React + TypeScript app living in a monorepo, styled with CSS Modules and Sass, and following modern design principles. We chose Redux Toolkit for state management and React Router for navigation. Performance is boosted by code splitting and optimized assets, while automated linting and testing ensure high-quality output.

Together, these guidelines ensure that any developer—new or experienced—can confidently build, extend, and maintain the user interface, keeping the application scalable, accessible, and performant.