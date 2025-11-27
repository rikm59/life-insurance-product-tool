# Life Insurance Product Tool Builder

Interactive Next.js 14 app for building life insurance product tools through a conversational UI.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS** for styling
- **next-intl** for i18n (English and Spanish)
- **Zustand** for client-side state management
- **TanStack Query** for async data
- **Server actions** for generation and audit
- **Jest** + **React Testing Library** for unit tests
- **Playwright** for end‑to‑end tests
- Deploy on **Vercel**

## Core flows

- Conversation always begins with **language**, then **product type**, then **guided prompts**
- Free‑text input with suggestion chips for quick replies
- Parsed state drives a live summary panel and inline calculators
- “Build now” can be triggered once product type is known
- Post‑build edits update only the selected section

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tests

- **Unit tests**:

  ```bash
  npm test
  ```

- **End‑to‑end tests**:

  Run the dev server in one terminal and Playwright in another:

  ```bash
  npm run dev
  # new terminal
  npm run test:e2e
  ```

## Deployment

1. Commit your code to a Git repository.
2. Push to GitHub or another provider.
3. Import the repository into Vercel.
4. Set the build command to `npm run build` and use the default output.
5. Vercel will detect the Next.js project and deploy automatically.

## Notes

- Audit mode uses sample JSON while you wire a real PDF parser.
- Comparison mode uses seed designs in `src/data/examples.json`.
- Conversation state lives in a Zustand store; there is no persistent backend storage in this demo.
- Inline calculators keep guideline premium, MEC proximity, and loan stress tests close to the chat.