// Importing authentication options from the custom configuration.
// Importing NextAuth to set up authentication routes.
import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";

/**
 * @description Sets up NextAuth authentication for both GET and POST methods using the provided authentication options.
 * 
 * The authentication options are defined in the `authOptions` and passed to the NextAuth function.
 * 
 * @see https://next-auth.js.org/getting-started/introduction for more details on NextAuth setup and configuration.
 */
const nextAuth = NextAuth(authOptions);

// Exporting the NextAuth handler for both GET and POST HTTP methods.
export { nextAuth as GET, nextAuth as POST };
