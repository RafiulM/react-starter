flowchart TD
  Start[Start] --> LandingPage[Landing Page]
  LandingPage -->|Get Started| RegisterForm[Registration Form]
  LandingPage -->|Sign In| LoginForm[Login Form]
  RegisterForm --> CallRegisterAPI[Call auth/register]
  CallRegisterAPI --> RegistrationSuccess[Registration Success]
  RegistrationSuccess --> Dashboard[Dashboard]
  LoginForm -->|Forgot Password| ForgotPasswordPage[Forgot Password Page]
  LoginForm --> CallLoginAPI[Call auth/login]
  CallLoginAPI -->|Success| Dashboard
  CallLoginAPI -->|Error| LoginError[Login Error]
  LoginError --> ShowFormError[Show Form Error]
  ForgotPasswordPage --> CallForgotAPI[Call auth/forgot-password]
  CallForgotAPI --> PasswordResetPage[Password Reset Page]
  PasswordResetPage --> CallResetAPI[Call auth/reset-password]
  CallResetAPI --> ResetSuccess[Password Reset Success]
  ResetSuccess --> LoginForm
  Dashboard -->|AI Playground| AIPlayground[AI Playground]
  Dashboard -->|Profile| ProfilePage[Profile Page]
  Dashboard -->|Settings| SettingsPage[Settings Page]
  Dashboard -->|Logout| Logout[Logout]
  Logout --> ClearToken[Clear Token]
  ClearToken --> LandingPage
  AIPlayground --> EnterPrompt[Enter Prompt]
  EnterPrompt --> SubmitPrompt[Submit Prompt]
  SubmitPrompt --> CallAIAPI[Call api/ai]
  CallAIAPI --> ShowResponse[Show AI Response]
  ShowResponse -->|New Session| EnterPrompt
  ProfilePage --> EditProfile[Edit Profile]
  EditProfile --> SaveProfile[Save Changes]
  SaveProfile --> CallUpdateProfileAPI[Call api/users id]
  CallUpdateProfileAPI --> ProfileUpdated[Profile Updated]
  ProfileUpdated --> Dashboard
  SettingsPage --> PreferenceSettings[Preferences]
  SettingsPage --> SecuritySettings[Security]
  PreferenceSettings --> TogglePreference[Toggle Preference]
  TogglePreference --> CallSaveSettingsAPI[Call api/settings]
  CallSaveSettingsAPI --> SettingsSaved[Settings Saved]
  SettingsSaved --> SettingsPage
  SecuritySettings --> ChangePassword[Change Password]
  ChangePassword --> EnterChangePwd[Enter Current and New Password]
  EnterChangePwd --> CallChangePwdAPI[Call auth/change-password]
  CallChangePwdAPI --> PwdChangeSuccess[Password Changed]
  PwdChangeSuccess --> Logout
  CallRegisterAPI -->|401| AuthError[Unauthorized]
  CallLoginAPI -->|401| AuthError
  CallForgotAPI -->|401| AuthError
  CallResetAPI -->|401| AuthError
  CallAIAPI -->|401| AuthError
  CallUpdateProfileAPI -->|401| AuthError
  CallSaveSettingsAPI -->|401| AuthError
  CallChangePwdAPI -->|401| AuthError
  AuthError --> ClearToken
  ClearToken --> RedirectLogin[Redirect to Login]
  RedirectLogin --> LoginForm
  CallRegisterAPI -->|Network Error| NetworkError[Network Error]
  CallLoginAPI -->|Network Error| NetworkError
  CallForgotAPI -->|Network Error| NetworkError
  CallResetAPI -->|Network Error| NetworkError
  CallAIAPI -->|Network Error| NetworkError
  CallUpdateProfileAPI -->|Network Error| NetworkError
  CallSaveSettingsAPI -->|Network Error| NetworkError
  CallChangePwdAPI -->|Network Error| NetworkError
  NetworkError --> ShowOfflineModal[Show Offline Modal]
  ShowOfflineModal --> RetryAction[Retry]
  RetryAction --> Start
  UnknownRoute[Unknown Route] --> Page404[404 Page]
  Page404 -->|Return| Dashboard
  ServerError[Server Error 500] --> ErrorScreen[Error Screen]
  ErrorScreen --> Dashboard