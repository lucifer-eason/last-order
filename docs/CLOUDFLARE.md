# Deploy LAST ORDER to Cloudflare Pages

Current production site: https://last-order-starline.pages.dev

The project is already linked to the dedicated GitHub repository. Pushing to `main` triggers deployment. The steps below document how to reproduce the setup.

The game is a static site. No paid plan, server, database, build dependency, or custom domain purchase is required for this deployment.

## GitHub integration

The source is the `main` branch of the private `lucifer-eason/last-order` repository.

In the Cloudflare dashboard, open **Workers & Pages → Create application → Pages → Connect to Git**. Authorize GitHub and select `lucifer-eason/last-order`.

| Setting | Value |
| --- | --- |
| Project name | `last-order-starline` (choose a unique variation if unavailable) |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Leave blank (repository root) |
| Build command | Leave blank |
| Build output directory | `dist` |
| Environment variables | None |

Select **Save and Deploy**. Use the actual `pages.dev` address returned by Cloudflare. The suggested project name is not proof that an address has been registered. GitHub-integrated Pages projects automatically deploy new commits from the configured branch.

## Direct upload alternative

For the fastest manual upload, create a new Pages project using **Upload assets** and upload `LAST-ORDER-cloudflare.zip`. This ZIP contains `index.html` and all game assets directly at its root. The source-project ZIP is not a deployment ZIP.

Choose Git integration if automatic GitHub deployments are wanted. A project created with Direct Upload cannot later switch to native Git integration; use a new project for that route.

## Optional CLI deployment

With Node.js installed and a working network, log in to your own Cloudflare account:

```sh
npx wrangler@4 login
npx wrangler@4 pages project create last-order-starline --production-branch main
npx wrangler@4 pages deploy dist --project-name last-order-starline --branch main
```

Run these commands from the game source folder, where `dist` is present. Wrangler reports the real deployment URL. Do not put credentials into the source repository, game, or chat.

## Verification after deployment

Open the returned production address. Confirm the cover loads, clock in, hear an order, prepare and serve it, open the notebook, and reload to check persistence. Voice availability depends on the browser. The existing automated checks do not replace this browser playtest.

## Official references

- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/platform/limits/
