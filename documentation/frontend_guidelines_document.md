# Frontend Guideline Document

This document outlines the frontend setup, design principles, and technologies used in our React starter kit. It is intended for anyone joining the project—developers and non-technical stakeholders alike—so we’ve kept the language simple and clear.

## 1. Frontend Architecture

### 1.1 Overall Structure
- **Monorepo Layout**: Our frontend and backend live in a single repository under `apps/`. The frontend sits in `apps/web` and the API in `apps/api`. This makes it easy to share code (like types or utilities) and keep dependencies in sync.
- **Create React App (CRA)**: We bootstrap the frontend with Create React App using TypeScript. CRA handles bundling, live reloading, and production builds out of the box.
- **Yarn Workspaces**: We use Yarn Workspaces to manage our packages—frontend and backend dependencies are hoisted to the root when possible. This speeds up installs and prevents version conflicts.

### 1.2 Scalability, Maintainability, Performance
- **Scalability**: Feature-based folder structure (see Component Structure) allows teams to add new pages and modules without touching unrelated code.
- **Maintainability**: TypeScript ensures type safety, reducing runtime errors. Clear naming conventions and shared types keep the code self-documenting.
- **Performance**: CRA’s production build optimizes code, and we apply lazy loading and code splitting (see Performance Optimization) to keep initial bundle sizes small.

## 2. Design Principles

We follow these key principles to create an intuitive, accessible, and responsive user experience:

- **Usability**: Simple, clear layouts with obvious call-to-action buttons. Common patterns (forms, modals, menus) behave as users expect.
- **Accessibility**: All interactive elements use semantic HTML, proper ARIA labels, and keyboard navigation. Contrast ratios meet WCAG AA standards.
- **Responsiveness**: The UI adapts gracefully from mobile (320px width) to large desktop screens (up to 1920px). Breakpoints are defined in our design tokens.
- **Consistency**: We reuse common components (buttons, inputs, cards) to provide a unified look and feel across the app.

### 2.1 Applying Principles in UI
- Form fields display inline validation messages.
- Buttons use consistent padding and hover states.
- Error messages are shown in a prominent color and include clear instructions for recovery.
- Mobile menus collapse into a hamburger icon; sidebars hide on narrow screens.

## 3. Styling and Theming

### 3.1 Styling Approach
- **CSS Modules**: We scope styles locally by using `.module.css` files alongside components. This prevents naming collisions and makes it easy to see which styles belong to which component.
- **SASS Support (Optional)**: For more complex style logic, you can rename `.module.css` to `.module.scss` and use SASS features like variables and nesting.

### 3.2 Theming and Design Style
- **Design Style**: Modern flat design with subtle material-inspired depth (shadows and elevation).
- **Theming**: We define colors, spacing, and typography in a single `theme.ts` file. Components read values from this theme, ensuring a consistent look.

### 3.3 Color Palette
- Primary: `#6200EE` (purple)
- Secondary: `#03DAC6` (teal)
- Background: `#F5F5F5` (light gray)
- Surface (cards, panels): `#FFFFFF` (white)
- Error: `#B00020` (red)
- Text Primary: `#000000` (black)
- Text Secondary: `#666666` (dark gray)

### 3.4 Typography
- **Font Family**: “Roboto”, sans-serif
- **Weights**: 400 (regular), 500 (medium), 700 (bold)
- **Sizing**: Root font size is 16px. Headings, body, and captions follow an 8pt-based scale (e.g., 24px for H1, 20px for H2).

## 4. Component Structure

### 4.1 Organization
We group files by feature or page:
```
apps/web/src/
  ├── components/       # Reusable UI pieces (Button, Input, Card)
  ├── features/         # Feature modules (auth/, ai/, profile/)
  │     ├── auth/
  │     │     ├── LoginForm.tsx
  │     │     ├── RegisterForm.tsx
  │     │     └── auth.module.css
  ├── pages/            # Route components (HomePage.tsx, AiPage.tsx)
  ├── hooks/            # Custom React hooks (useAuth, useAi)
  ├── context/          # Global context providers (AuthContext)
  └── theme.ts          # Design tokens (colors, fonts)
```

### 4.2 Reusability and Maintainability
- **Single Responsibility**: Each component does one thing (e.g., <Button> only handles styling and clicks).
- **Presentational vs. Container**: Presentational components focus on UI; container components handle data fetching and state.
- **Centralized Exports**: `components/index.ts` exports all shared components, simplifying imports.

## 5. State Management

### 5.1 Approach
- **React Context + Hooks**: We use Context for global data like the authenticated user and theme settings.
- **Local State with useState/useReducer**: Individual components or features manage their own local state.

### 5.2 When to Scale Up
For very large apps with complex state logic, you can introduce **Redux Toolkit** or **Recoil**. The existing folder structure will accommodate a new `store/` directory and slice files.

### 5.3 Example: Auth Context
```tsx
// AuthContext.tsx
export const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  // login, logout functions...
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 6. Routing and Navigation

- **React Router v6**: We define routes in `App.tsx` using `<BrowserRouter>`, `<Routes>`, and `<Route>`.
- **Protected Routes**: A wrapper component checks for authentication before rendering protected pages, redirecting to `/login` if needed.
- **Nested Routes**: Pages like `/profile` can have sub-routes (e.g., `/profile/settings`).

Example:
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="ai" element={<AiPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## 7. Performance Optimization

- **Code Splitting & Lazy Loading**: Use `React.lazy` and `<Suspense>` to load pages only when needed:
  ```tsx
  const AiPage = React.lazy(() => import('./pages/AiPage'));
  ```
- **Memoization**: Wrap expensive components with `React.memo` and functions with `useCallback` or `useMemo`.
- **Image Optimization**: Serve optimized images (WebP) and use lazy loading (`<img loading="lazy" />`).
- **Bundle Analysis**: Run `npm run build && npx source-map-explorer build/static/js/*.js` to inspect bundle sizes.

## 8. Testing and Quality Assurance

### 8.1 Unit Tests
- **Jest**: Our test runner for pure functions and small React components.
- **React Testing Library**: To render components and assert on user-facing behavior.

Example:
```tsx
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('renders label', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 8.2 Integration Tests
- Test how multiple components work together (e.g., form submission triggers API call and shows success message). Use React Testing Library with mocked fetch or MSW (Mock Service Worker).

### 8.3 End-to-End (E2E) Tests
- **Cypress**: Automate full user flows—sign up, log in, generate AI content, log out.
- Store test data in a separate test account or use API endpoints to reset state before tests.

### 8.4 Code Quality
- **ESLint + Prettier**: Linting and formatting rules enforced on save and on every commit via Husky.
- **VS Code Settings**: Shared `.vscode/settings.json` ensures everyone uses the same editor rules.

## 9. Conclusion and Overall Frontend Summary

Our frontend guidelines combine a clear folder structure, shared design tokens, and well-defined processes for routing, state, and styling. By following these rules, every team member can:

- Jump into development quickly with the monorepo setup.
- Build consistent, accessible interfaces using our color palette and typography.
- Share and reuse components without confusion.
- Manage global and local state in a predictable way.
- Optimize for speed and quality through lazy loading, memoization, and automated tests.

These guidelines support our goal: give developers a solid foundation so they can focus on building features—rather than wrestling with boilerplate or ambiguous patterns. Welcome aboard!