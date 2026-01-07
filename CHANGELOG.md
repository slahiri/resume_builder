# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Password visibility toggle**: All password fields now have an eye icon to show/hide password
- **Password strength indicator**: Visual strength bar with color coding (red → green)
- **Password criteria checklist**: Real-time validation showing:
  - Minimum 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character
- **Generate strong password button**: Auto-generates a secure 16-character password
- **Backdrop blur on modals**: Dialog overlays now have a subtle blur effect
- **Reset password modal**: Logged-in users can reset password via modal (not redirect)
- **User navigation dropdown**: Avatar with profile menu in sidebar footer
- **Dark/Light mode toggle**: Theme switcher in user dropdown menu
- **App sidebar**: Navigation with Dashboard, New Resume, My Resumes, Import Resume, History, Settings

### Changed
- Updated all password forms (login, signup, reset password) to use new PasswordInput component
- Dialog overlay now includes backdrop blur effect

## [0.1.0] - 2025-01-08

### Added
- Initial project setup with Next.js 15 and React 19
- Supabase authentication (login, signup, forgot password, reset password)
- Database schema with profiles, resumes, user_settings, chat_history tables
- Row Level Security (RLS) policies for all tables
- shadcn/ui component library with multiple registries:
  - @shadcn, @aceternity, @originui, @magicui, @motion-primitives
  - @cult-ui, @assistant-ui, @animate-ui, @ai-elements
- Root path redirect to login/dashboard based on auth state
- Vercel deployment configuration
