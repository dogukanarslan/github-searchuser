# GitHub Search

GitHub Search is a Next.js application for browsing GitHub users and repositories.

- search and browse users
- search and browse repositories
- view a user's followers, following, starred repositories, and repositories
- inspect repository details such as branches, contributors, and languages
- follow or unfollow users
- star or unstar repositories

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- NextAuth

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```bash
AUTH_SECRET=replace-with-a-random-secret
AUTH_GITHUB_ID=your-github-oauth-app-client-id
AUTH_GITHUB_SECRET=your-github-oauth-app-client-secret
NEXTAUTH_URL=http://localhost:3000
```

3. Configure a GitHub OAuth App.

Use this callback URL:

```bash
http://localhost:3000/api/auth/callback/github
```

4. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run start` starts the production server
- `npm run type-check` runs TypeScript checks
- `npm run lint` runs ESLint
- `npm run format` formats the project with Prettier
