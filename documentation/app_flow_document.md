# App Flow Document

## Onboarding and Sign-In/Sign-Up

A first-time user discovers the application by navigating to the front-end URL, typically at http://localhost:3000 during development or the production domain in a live environment. The landing page immediately presents two clear calls to action: “Sign In” and “Sign Up.” A visitor who does not yet have an account clicks “Sign Up,” which opens a registration form requesting an email address, a password, and confirmation of the password. When the user completes the form and submits, the front-end sends a POST request to the `/api/auth/register` endpoint. The API validates the input, creates a new user record, generates a JSON Web Token, and returns it in the response. The front-end stores the token in memory or local storage and redirects the user to the main dashboard.

If an existing user clicks “Sign In,” they see a form with email and password fields. Submitting this form triggers a POST request to `/api/auth/login`. On success, the API returns a JWT token, which the front-end retains for authenticated API calls, then navigates the user to the home page. A “Forgot Password” link beneath the login form leads to a recovery page. Here the user enters their email address and clicks “Send Reset Link.” The front-end calls `/api/auth/forgot-password`, and the API sends an email containing a secure reset link. Clicking that link opens a password reset page with new-password and confirm-password fields. Submitting that form calls `/api/auth/reset-password` on the API, updates the user’s credentials, and returns the user to the sign-in page.

Signing out is available via a button in the header or sidebar labeled “Log Out.” When clicked, the front-end clears the stored token, resets any in-memory user context, and redirects back to the sign-in screen. This completes the sign-out process.

## Main Dashboard or Home Page

After signing in or completing registration, the user lands on the main dashboard. The layout consists of a vertical sidebar on the left and a content area on the right. The sidebar displays navigation items such as “Dashboard,” “Generate AI Content,” and “Profile Settings.” Above the sidebar sits the application logo and a “Log Out” button at the bottom. The header at the top of the content area shows the user’s name and a notification icon.

By default, the content area displays a welcome message and an overview widget that introduces the AI generation feature. The user can click any sidebar item to navigate to the corresponding page. Navigation is handled by React Router, which updates the URL path and renders the proper component without a full page refresh. The token stored in local storage ensures that each navigation keeps the user authenticated for API calls behind the scenes.

## Detailed Feature Flows and Page Transitions

When the user selects “Generate AI Content” from the sidebar, the front-end navigates to `/ai`. This page presents a text input area labeled “Enter prompt” and a “Generate” button. The user types a prompt and clicks “Generate,” which sends a POST request to `/api/ai/generate` with the prompt and the user’s JWT in the Authorization header. As soon as the request is sent, the UI displays a loading spinner in the content area. Once the API returns a generated response, the spinner disappears and the AI output is rendered in a scrollable text box below the form. The user can click “Copy to Clipboard” or “New Prompt” to restart the workflow.

Clicking “Profile Settings” routes the user to `/profile`, where they see a form pre-filled with their name and email. They can change their display name or email address and click “Update Profile,” sending a PUT request to `/api/auth/update-profile`. A success banner confirms the change. For password updates, there is a separate section labeled “Change Password” with current password, new password, and confirm new password fields. Submitting that section calls `/api/auth/change-password`. On success, the user sees a confirmation message and is advised to log in again with the new credentials. The front-end then clears the existing token and navigates back to the sign-in page to complete the password update flow.

Throughout these page transitions, the React Router library ensures the URL matches the displayed component. The application maintains a global authentication context so that protected routes automatically check for a valid token and redirect unauthorized users to the sign-in page if needed.

## Settings and Account Management

Within the “Profile Settings” page, users manage personal information such as their display name and email address. They also adjust account preferences including toggles for receiving email notifications or in-app alerts. Changing notification preferences calls a PATCH request to `/api/auth/update-preferences`, and the updated settings are saved and immediately reflected in the UI.

Although billing and subscription management are not implemented in v1.0, the settings section reserves space for future “Subscription” details. When billing is introduced, the user will be able to enter payment information, view invoices, and upgrade or downgrade plans through a secure payments integration page. After updating any setting, a “Back to Dashboard” link lets the user return to the main view.

## Error States and Alternate Paths

If the user submits invalid credentials on the sign-in form, the API responds with a 401 status code and an error message such as “Invalid email or password.” The front-end then displays a red error banner above the form and keeps the user on the same page. When registration inputs fail validation—such as a password that is too short or an email already in use—the API returns a 400 status with specific field errors, which the UI highlights next to each form input.

During AI content generation, if the API responds with a 500 error or the request times out, the UI replaces the spinner with a message stating “An error occurred. Please try again.” The user may click “Generate” again or adjust their prompt. If the user’s JWT expires or is malformed, any protected API call returns a 401 error. The front-end intercepts this, clears stored authentication data, and redirects the user to the sign-in screen with a message like “Session expired. Please log in again.”

Network connectivity issues are detected by the front-end when fetch requests fail entirely. In that case, a banner appears at the top of the application reading “Network error. Check your connection.” Normal operation resumes automatically once connectivity returns.

## Conclusion and Overall App Journey

From the moment a new user arrives and registers with an email and password, the application guides them through a simple onboarding flow that secures their credentials and grants immediate access to the main dashboard. The dashboard layout, with its persistent sidebar and header, allows quick navigation to core features like AI content generation and profile management. Each user action—whether generating text with AI, updating personal details, or changing a password—follows a clear sequence of form submission, API request, loading state, and user feedback.

Throughout the journey, error states are handled gracefully, informing the user of validation problems, session timeouts, or network failures. The sign-out and session-expiry flows always return users to the sign-in screen so that their account remains secure. In everyday usage, a logged-in user relies on the dashboard to explore AI features, refine their profile, and receive updates without worrying about boilerplate setup details. This seamless flow ensures that developers building on this starter kit can focus on adding business logic rather than reinventing authentication, navigation, or error-handling patterns.