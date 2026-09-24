# 🍻 Happy Hour

A full-stack web app for discovering and discussing happy hour deals at nearby bars and restaurants. Users sign in with GitHub, create categories, post venues, and discuss them in nested comment threads.

**Live demo → [happy-hour-gamma.vercel.app](https://happy-hour-gamma.vercel.app/)**

> **Project status:** active personal project. The community layer (auth, categories, venues, threaded comments, search) is built and deployed; the location- and time-aware deal filtering described in the [Roadmap](#roadmap) is still in progress.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [License](#license)

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, React Server Components, Turbopack dev server) |
| Language | TypeScript (strict) |
| UI | React 19, [HeroUI](https://www.heroui.com/), Tailwind CSS 3, Framer Motion |
| Auth | [Auth.js / NextAuth v5](https://authjs.dev) with the GitHub OAuth provider + Prisma adapter |
| Data | PostgreSQL (Neon) via [Prisma](https://www.prisma.io) 6 |
| Validation | [Zod](https://zod.dev) schemas on every mutation |
| Editor | [Tiptap](https://tiptap.dev) rich-text editor |
| Hosting / CI | Vercel, Dependabot |

## Features

### Built

- **GitHub OAuth sign-in** — session-backed accounts persisted through the Prisma adapter, with server actions for sign-in/sign-out.
- **Categories** — user-created, slug-addressable groupings of venues (`/categories/[slug]`).
- **Venue posts** — titled write-ups scoped to a category, authored through a rich-text editor.
- **Nested comment threads** — arbitrarily deep replies rendered recursively from a single query.
- **Search** — case-insensitive matching across venue titles and content, ranked by discussion volume.
- **Ranked feeds** — the home page surfaces the most-discussed venues; category pages order by comment count.
- **Streaming UI** — `Suspense` boundaries with purpose-built skeleton components, so slow queries never block first paint.

### In progress

See [Roadmap](#roadmap).

## Architecture

The app is App-Router-first: almost all data access happens on the server, and very little JavaScript ships to the browser.

- **Server Components for reads.** Pages call query functions in [src/db/queries/](src/db/queries/) directly — no API layer, no client-side fetching library, no loading spinner for the initial render.
- **Server Actions for writes.** Every mutation lives in [src/actions/](src/actions/) as a `"use server"` function wired to a `<form action={...}>`. Each one validates input with a Zod schema, checks the session, returns typed field-level errors for the form to render, then calls `revalidatePath` and redirects. See [create-location.ts](src/actions/create-location.ts) for the pattern.
- **Progressive enhancement.** Because forms post to server actions, the core flows work without client-side JS; `useActionState` layers on inline validation feedback where it helps.
- **Streaming with Suspense.** The venue detail page renders the venue and its comment tree in independent `Suspense` boundaries, each with a matching skeleton, so the two queries stream in as they resolve.
- **Recursive comment rendering.** [comment-show.tsx](src/components/comments/comment-show.tsx) fetches the comment list once and recurses over `parentId` relationships, so an N-deep thread costs one query rather than N.
- **Centralised routing.** URLs are generated through the [paths.ts](src/paths.ts) helper rather than hardcoded strings, so a route change is a one-file edit.
- **Typed query boundaries.** Query modules export composed types (e.g. `LocationWithData`) describing exactly what each `include` returns, so components can't read fields that were never selected.

## Data Model

Prisma schema: [prisma/schema.prisma](prisma/schema.prisma)

```text
User ──┬── Account / Session / VerificationToken   (Auth.js adapter tables)
       ├── Location[]
       └── Comment[]

Category ──< Location ──< Comment ──< Comment   (self-referential replies via parentId)
```

`Comment.parentId` is a nullable self-relation, which is what makes unbounded reply nesting possible. Cascading deletes keep orphaned sessions, venues, and replies from accumulating.

## Project Structure

```text
src/
├── actions/      Server actions — all mutations, each Zod-validated and auth-checked
├── app/          App Router routes, layouts, and the Auth.js route handler
│   ├── categories/[slug]/locations/[locationId]/   Venue detail + comment thread
│   └── search/                                     Search results
├── components/   Server and client components, grouped by domain
├── db/
│   ├── index.ts  Prisma client singleton
│   └── queries/  Typed read queries
├── auth.ts       Auth.js configuration (GitHub provider + Prisma adapter)
└── paths.ts      Single source of truth for route generation
prisma/schema.prisma
```

## Getting Started

**Prerequisites:** Node.js 18.18+, a PostgreSQL database, and a GitHub OAuth app.

```bash
git clone https://github.com/ngroenewold95/happy-hour.git
cd happy-hour
npm install          # postinstall runs `prisma generate`
```

Create a `.env.local` containing:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js session encryption key (`npx auth secret`) |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `AUTH_TRUST_HOST` | Set to `true` for local development |

Set the OAuth app's callback URL to `http://localhost:3000/api/auth/callback/github`.

Then push the schema and start the dev server:

```bash
npx prisma db push
npm run dev          # http://localhost:3000
```

With access to the Vercel project, `vercel env pull .env.local` fetches the environment instead.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |

## Roadmap

- [ ] Structured venue records — address, hours, and deal windows as first-class fields rather than free text
- [ ] Filter by location, time of day, and drink or cuisine type
- [ ] "Happening now" feed driven by deal windows
- [ ] Saved/favourite venues per user
- [ ] Edit and delete for venues and comments
- [ ] Automated test coverage for server actions

## License

[MIT](LICENSE)
