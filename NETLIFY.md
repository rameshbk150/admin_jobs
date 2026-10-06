# Deploying to Netlify

1. Push this project to a Git provider and import the repository in Netlify.
2. In **Site configuration → Environment variables**, set `BACKEND_API_URL` to your backend API base URL, for example `https://your-backend.onrender.com/api`. The existing `NEXT_PUBLIC_API_URL` variable is also accepted for compatibility. Enter values in Netlify; do not commit `.env.local` or put its values in this repository.
3. Trigger a deploy. `netlify.toml` runs `npm run build` and enables Netlify's Next.js plugin.

The admin app calls its own `/api/...` paths, and Next.js rewrites those requests to the configured backend. This keeps browser requests same-origin and avoids browser CORS failures. The backend URL is read by Next.js on the server; use `BACKEND_API_URL` for new deployments. After changing the Netlify environment variable, redeploy the site.

Do not place secrets in variables prefixed with `NEXT_PUBLIC_`; Next.js can expose them in browser bundles.
