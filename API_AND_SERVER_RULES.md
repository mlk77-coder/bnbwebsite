# Data Fetching & Next.js Proxy Rules

## 1. The Proxy Pattern (Next Server -> Laravel)
- For write operations (Cart updates, Auth, Checkout):
  - **Flow:** Client Component -> `src/app/api/[route]` -> `src/features/[name]/api` -> Laravel Backend.
  - This pattern must be preserved to keep business logic on the server and secure sensitive tokens.

## 2. Data Fetching (Read Operations)
- For read operations (Product listing, Details):
  - Next.js Server Components should call functions in `src/features/[name]/api` which fetch directly from Laravel.
  - Use `axiosInstance` from `@/lib/axios` to ensure consistent headers and error handling.

## 3. Error & Loading State
- Use Next.js `loading.tsx` and `error.tsx` within the `app/` directory for high-level UI feedback.
- Use `Suspense` for granular loading states within Feature components.

## 4. Specific Logic Preservation
- **Important:** Some existing features use a "Next Server calls Backend" logic for cart increments/decrements. **Do not refactor this out.** Maintain this server-side mediation for security and data integrity.
