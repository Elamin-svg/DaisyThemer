# Contributing to DaisyThemer

Welcome to the **DaisyThemer** repository! We are excited to have you contribute. This document will guide you through the project architecture, tech stack, and conventions so you can get started quickly and easily.

## Tech Stack

This project is built with a modern, high-performance web stack:
- **Framework:** [TanStack Start](https://tanstack.com/start/latest) (React Router + SSR)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations:** [Motion](https://motion.dev/) (motion-primitives)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Deployment:** Cloudflare (via Wrangler & Nitro)

## Project Structure 

We use a **Feature-Sliced Design (FSD)** architecture. Everything inside the `src/` directory is logically grouped into domain-specific features and shared modules:

```text
src/
├── features/          # Domain-driven feature modules
│   ├── auth/          # Authentication flows & user sessions
│   ├── creator/       # Theme builder, previews, and CSS compiler
│   └── themes/        # Browsing, saving, and liking themes
│
├── shared/            # Reusable modules used across features
│   ├── api/           # Global API clients (e.g., Supabase setup)
│   ├── constants/     # Global constants
│   ├── types/         # Database and theme TypeScript definitions
│   ├── ui/            # Generic components (Buttons, Modals, Motion, Icons)
│   └── utils/         # Helper functions (Theme extraction, colors, etc.)
│
├── routes/            # File-based routing (TanStack Router)
└── router.tsx         # Router configuration
```

## Getting Started Locally

### 1. Prerequisites
- Node.js (latest LTS recommended)
- `npm` (default package manager)

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory based on `.env.example` (if available) and add your Supabase credentials:
```env
SUPABASE_URL=your_supabase_url 
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OAuth Providers (Google & GitHub)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=your_google_client_secret
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run the Dev Server
Start the development server with hot-module replacement:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 5. Seeding Data (Optional)

If you want to generate random themes to test the UI, you can use the built-in seed script. You will need your local Supabase Service Role Key and your Supabase User ID (which you can find in the Supabase Studio under Authentication > Users).

Run the following command to generate themes:
```bash
npx tsx scripts/seedThemes.ts <user_id> [count]
```
*(Example: `npx tsx scripts/seedThemes.ts 12345-abcde 15`)*

## Design & Coding Conventions

When submitting a pull request, please ensure you adhere to the following project-specific guidelines:

### Code Organization
- **Absolute Imports:** Always use absolute imports starting with `#/` (which maps to `src/`).
  - *Example:* `import { cn } from '#/shared/utils/utils'`
- **Feature Isolation:** If you build a component that belongs to a specific domain (like editing a theme), place it in `src/features/creator/components/`. If it is generic, place it in `src/shared/ui/`.

### Submitting Changes
1. **Branch Naming:** Create a branch for your work (e.g., `feat/add-dark-mode` or `fix/auth-redirect`).
2. **Commit Messages:** Keep commit messages concise, lowercase, and descriptive (e.g., `fix auth redirect loop`, `add pricing preview`). Avoid long, overly verbose AI-generated text.
3. **Pull Requests:** Ensure your code passes build checks (`npm run build`) before requesting a review.

Thank you for contributing!
