# Resume Builder

An AI-powered resume builder with a conversational interface. Create professional resumes through natural conversation with real-time preview and intelligent suggestions.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with multiple registries
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase PostgreSQL](https://supabase.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Features

- Conversational AI interface for resume creation
- Real-time resume preview with section-level updates
- Dark/Light mode support
- Password strength indicator with generate option
- Secure authentication (login, signup, password reset)
- PDF export (coming soon)
- Resume import from PDF/DOCX (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/slahiri/resume_builder.git
   cd resume_builder
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the database migration in Supabase SQL Editor:
   ```bash
   # Copy contents from supabase/migrations/001_initial_schema.sql
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Auth callback handler
│   ├── dashboard/         # Main dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── forgot-password/   # Forgot password page
│   └── reset-password/    # Reset password page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Main navigation sidebar
│   ├── user-nav.tsx      # User dropdown menu
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── actions/          # Server actions
│   ├── supabase/         # Supabase client configuration
│   ├── types/            # TypeScript types
│   └── utils.ts          # Utility functions
├── supabase/             # Database migrations
└── public/               # Static assets
```

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Component Registries

This project uses multiple shadcn/ui compatible registries:

- `@shadcn` - Official shadcn/ui components
- `@aceternity` - Aceternity UI components
- `@originui` - Origin UI components
- `@magicui` - Magic UI components
- `@motion-primitives` - Motion Primitives
- `@cult-ui` - Cult UI components
- `@assistant-ui` - Assistant UI components
- `@animate-ui` - Animate UI components
- `@ai-elements` - AI SDK Elements

### Adding Components

```bash
# From official registry
pnpm dlx shadcn@latest add button

# From other registries
pnpm dlx shadcn@latest add @aceternity/sparkles
```

## Database Schema

The application uses the following tables:

- `profiles` - User profile information
- `resumes` - Resume data (JSON structure)
- `user_settings` - User preferences and API keys
- `chat_history` - AI conversation history

All tables have Row Level Security (RLS) enabled.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint` and `pnpm build`
4. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) for details

## Links

- [Live Demo](https://resume-builder.sid.sh)
- [Changelog](./CHANGELOG.md)
