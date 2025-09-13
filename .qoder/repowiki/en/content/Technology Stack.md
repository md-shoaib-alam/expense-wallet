# Technology Stack

<cite>
**Referenced Files in This Document**   
- [package.json](file://backend/package.json)
- [package.json](file://mobile/package.json)
- [db.js](file://backend/src/config/db.js)
- [upstash.js](file://backend/src/config/upstash.js)
- [rateLimiter.js](file://backend/src/middleware/rateLimiter.js)
- [_layout.jsx](file://mobile/app/_layout.jsx)
- [(auth)/_layout.jsx](file://mobile/app/(auth)/_layout.jsx)
- [sign-in.jsx](file://mobile/app/(auth)/sign-in.jsx)
- [sign-up.jsx](file://mobile/app/(auth)/sign-up.jsx)
- [SignOutButton.jsx](file://mobile/components/SignOutButton.jsx)
- [README.md](file://README.md)
</cite>

## Table of Contents
1. [Frontend Stack](#frontend-stack)
2. [Backend Stack](#backend-stack)
3. [Database Layer](#database-layer)
4. [Infrastructure and Utilities](#infrastructure-and-utilities)
5. [Architectural Decisions](#architectural-decisions)
6. [Security and Performance Implications](#security-and-performance-implications)

## Frontend Stack

The frontend of the expense-wallet application is built using a modern React Native stack powered by Expo, enabling cross-platform mobile development with high performance and native-like user experience.

### Expo and React Native
The application uses **React Native** (version 0.79.5) as the core framework for building native mobile interfaces using JavaScript and React. It is wrapped with **Expo** (version ~53.0.20), which provides a robust development environment, simplifies native module access, and accelerates development through managed workflows.

Expo enables features such as over-the-air updates, deep linking, secure storage, and access to device capabilities (camera, biometrics, etc.) without requiring direct native code manipulation.

### Expo Router for Navigation
**Expo Router** (~5.1.4) implements a file-based routing system inspired by Next.js, allowing declarative route definitions through the `app/` directory structure. This eliminates the need for manual route configuration and enhances developer productivity.

For example:
- `app/(auth)/sign-in.jsx` → `/sign-in` route
- `app/(root)/index.jsx` → `/` route

This structure separates authenticated (`(auth)`) and authenticated-only (`(root)`) navigation stacks.

### Authentication with @clerk/clerk-expo
Authentication is handled by **@clerk/clerk-expo** (^2.14.19), a comprehensive identity solution that provides secure user management, OAuth integrations, multi-factor authentication, and session handling.

#### Token Caching in Root Layout
In `app/_layout.jsx`, the `ClerkProvider` is configured with token caching using the `tokenCache` utility from Clerk:

```jsx
<ClerkProvider tokenCache={tokenCache}>
  <SafeScreen>
    <Slot />
  </SafeScreen>
  <StatusBar style="dark" />
</ClerkProvider>
```

This enables persistent authentication across app restarts by securely storing JWT tokens using `expo-secure-store`.

#### Authentication Flow
- **Sign-In**: Uses `useSignIn()` hook to authenticate via email/password. On success, `setActive()` activates the session and redirects to the home screen.
- **Sign-Up**: Uses `useSignUp()` to create a user and send a verification email.
- **Protected Routes**: The `(auth)/_layout.jsx` uses `useAuth()` to redirect signed-in users away from auth screens:

```jsx
if (isSignedIn) {
  return <Redirect href={'/'} />;
}
```

- **Sign-Out**: Implemented in `SignOutButton.jsx` using `useClerk().signOut()` with a confirmation dialog.

**Section sources**
- [app/_layout.jsx](file://mobile/app/_layout.jsx#L1-L15)
- [app/(auth)/_layout.jsx](file://mobile/app/(auth)/_layout.jsx#L1-L11)
- [app/(auth)/sign-in.jsx](file://mobile/app/(auth)/sign-in.jsx#L1-L68)
- [app/(auth)/sign-up.jsx](file://mobile/app/(auth)/sign-up.jsx#L1-L35)
- [SignOutButton.jsx](file://mobile/components/SignOutButton.jsx#L1-L20)

## Backend Stack

The backend is built on **Node.js** with **Express.js** (~4.21.0), providing a lightweight and scalable server architecture for handling API requests.

### Express.js Server
The entry point is `backend/src/Server.js`, which initializes the Express app, applies middleware (CORS, JSON parsing), and mounts routes. The server uses ES modules (`"type": "module"` in package.json), enabling modern import/export syntax.

### Middleware and Security
- **CORS**: Enabled via the `cors` package to allow secure cross-origin requests from the mobile client.
- **Environment Configuration**: Managed using `dotenv` to load environment variables from `.env` files.

## Database Layer

The application uses **Neon** as a serverless PostgreSQL database, accessed via the `@neondatabase/serverless` (^1.0.0) driver.

### Neon Serverless PostgreSQL
Neon provides autoscaling, branching, and serverless compute, making it ideal for applications with variable traffic. It supports full PostgreSQL compatibility, enabling complex queries, transactions, and relational modeling.

### Database Initialization and Schema
In `backend/src/config/db.js`, the database connection is established using the `neon` function:

```js
export const sql = neon(process.env.DATABASE_URL);
```

The `initDB()` function creates the `transactions` table if it doesn't exist:

```sql
CREATE TABLE IF NOT EXISTS transactions(
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
```

- `DECIMAL(10,2)` ensures precise monetary storage (up to 99999999.99).
- `user_id` links transactions to authenticated users.

### Security: Parameterized Queries
The `sql` template tag automatically parameterizes queries, preventing SQL injection:

```js
await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
```

This ensures user input is safely escaped.

**Section sources**
- [db.js](file://backend/src/config/db.js#L1-L27)

## Infrastructure and Utilities

### Rate Limiting with @upstash/ratelimit
To protect API endpoints from abuse, the application uses **@upstash/ratelimit** (^2.0.5) with Redis as the backend.

#### Configuration
In `backend/src/config/upstash.js`, a rate limiter is created using environment variables:

```js
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "60 s")
});
```

This allows 50 requests per minute per key using a sliding window algorithm.

#### Middleware Integration
The `rateLimiter.js` middleware applies rate limiting to routes:

```js
const { success } = await ratelimit.limit("my-rate-limit");
if (!success) {
  return res.status(429).json({ message: "Too many requests" });
}
next();
```

Currently, it uses a static key (`"my-rate-limit"`), but can be extended to use `req.ip` or `req.user?.user_id` for per-user or per-IP limiting.

**Section sources**
- [upstash.js](file://backend/src/config/upstash.js#L1-L9)
- [rateLimiter.js](file://backend/src/middleware/rateLimiter.js#L1-L30)

### Scheduled Jobs with cron
The `cron` (^4.3.3) package is used to schedule periodic tasks, such as database cleanup, report generation, or balance recalculations. These are defined in `backend/src/config/corns.js` (note: likely a typo for `cron.js`).

## Architectural Decisions

### Serverless PostgreSQL (Neon)
Choosing Neon enables:
- **Scalability**: Compute scales to zero when idle, reducing cost.
- **High Availability**: Built-in replication and failover.
- **Branching**: Safe schema migrations via isolated database branches.

### Redis-Based Rate Limiting (Upstash)
Using Upstash Redis for rate limiting provides:
- **Low Latency**: In-memory data store ensures fast checks.
- **Distributed Consistency**: Synchronizes limits across server instances.
- **Serverless Integration**: Seamlessly integrates with serverless backends.

### Modular Code Organization
- **Frontend**: Feature-based routing with Expo Router.
- **Backend**: Layered architecture (config, controllers, middleware, routes).
- **Separation of Concerns**: Clear boundaries between authentication, data access, and business logic.

## Security and Performance Implications

### Security
- **Authentication**: Clerk handles secure token management, password hashing, and session validation.
- **Database**: Parameterized queries prevent SQL injection.
- **Rate Limiting**: Mitigates brute-force and DDoS attacks.
- **Secure Storage**: Tokens are stored using `expo-secure-store` on device.

### Performance
- **Frontend**: React Native ensures 60fps UI; Reanimated enables smooth animations.
- **Backend**: Express.js is lightweight and fast for JSON APIs.
- **Database**: Neon’s serverless architecture optimizes resource usage.
- **Caching**: Redis can be extended for response caching in future iterations.

### Version Compatibility
- **Node.js**: Requires v19+ for `@neondatabase/serverless` (per `engines` in package.json).
- **React**: Mobile app uses React 19.0.0, compatible with Clerk and Expo.
- **Peer Dependencies**: `@clerk/clerk-expo` requires `react-native >=0.73`, which is satisfied (0.79.5).

```mermaid
graph TB
subgraph "Frontend"
A[Expo App] --> B[Clerk Auth]
B --> C[Secure Token Cache]
A --> D[API Calls]
end
subgraph "Backend"
D --> E[Express Server]
E --> F[Rate Limiter<br/>(Upstash Redis)]
E --> G[Neon PostgreSQL]
end
F --> H["Sliding Window: 50/60s"]
G --> I[Transactions Table]
```

**Diagram sources**
- [upstash.js](file://backend/src/config/upstash.js#L1-L9)
- [db.js](file://backend/src/config/db.js#L1-L27)
- [rateLimiter.js](file://backend/src/middleware/rateLimiter.js#L1-L30)