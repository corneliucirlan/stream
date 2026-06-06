# Global Stream

Global Stream is a Next.js app for searching movies and TV shows and checking where they are available to stream, rent, buy, or watch for free across different countries.

The app uses TMDB for title data, posters, backdrops, and watch-provider availability. TMDB provider data is supplied by JustWatch.

## Features

- Search movies and TV shows from the home page.
- Preserve the last search in `sessionStorage` during the browser session.
- View title details, posters, backdrop art, overview, year, status, seasons, and cast.
- Browse watch providers by country and availability type.
- Show season-level provider availability for TV shows.
- Use a local placeholder when TMDB does not provide poster art.
- Cache TMDB GET requests with a one-hour revalidation window.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- TMDB API

## Requirements

- Node.js compatible with the installed Next.js version
- Yarn
- A TMDB API key

## Environment Variables

Create a `.env.local` file in the project root:

```bash
TMDB_API_KEY=your_tmdb_api_key
```

Optional, currently only used by the Trakt helper utility:

```bash
TRAKT_CLIENT_ID=your_trakt_client_id
```

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
yarn dev
```

Starts the local development server with Turbopack.

```bash
yarn build
```

Creates a production build.

```bash
yarn start
```

Runs the production server after a successful build.

```bash
yarn lint
```

Runs ESLint against the source files.

## Project Structure

```text
app/
  api/search/                 Search API route
  watch/[type]/[id]/          Movie and TV detail route
globals/
  components/                 Shared UI components
  types.ts                    Shared TypeScript models
sections/
  home/                       Search input and result cards
  details/                    Title details and provider sections
utils/
  tmdb/                       TMDB request/search helpers
  trakt/                      Trakt URL helper
public/
  placeholder.svg             Fallback poster image
```

## Data Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Watch-provider data is provided by JustWatch through TMDB.
