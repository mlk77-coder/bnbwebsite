"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * AuthProvider component that wraps its children with the `SessionProvider` from NextAuth.
 * This ensures that the session information is available to all components within the application.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the `SessionProvider`.
 * @returns {JSX.Element} The `SessionProvider` component wrapping its children.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): React.ReactElement {
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchInterval={0}
      session={session}
    >
      {children}
    </SessionProvider>
  );
}
