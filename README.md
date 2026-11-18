# docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

Docs are served at `/`, and the API reference is at `/api-playground`.
Previous `/docs` URLs permanently redirect to their root equivalents.
The production domain is `docs.rynni.cc`. Add it to the Vercel `docs`
project and configure the `docs` CNAME in Cloudflare using the target Vercel provides.

With the app running, verify routes with `node --test tests/routes.test.mjs`.
Set `TEST_BASE_URL` to check a deployment instead of localhost.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `src/app/(home)/[[...slug]]` | Documentation pages, including the root page.        |
| `src/app/(home)/layout.tsx` | The shared documentation layout.                     |
| `src/app/api/search/route.ts` | The Route Handler for search.                      |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
