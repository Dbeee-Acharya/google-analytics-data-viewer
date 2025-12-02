# Analytics Monorepo (Frontend + Server)

This repository contains two applications managed using **pnpm workspaces**:

---

## Run this from the **analytics** root folder

```
pnpm install
```

This installs dependencies for **BOTH** _frontend_ and _backend_

```
pnpm build:all
```

This builds both projects

```
pm2 start ecosystem.config.cjs --env production
```
