// Importing necessary functions and configurations for authentication.
import { getServerSession } from "next-auth";
import { cache } from "react";
import { authOptions } from "./auth-options";

/**
 * @description Retrieves the current server session using NextAuth and memoizes the result using React's cache.
 * This function is cached for optimization, ensuring that multiple calls to get the session will return the same result.
 * 
 * @returns {Promise<any>} The server session object or null if no session exists.
 * 
 * @example
 * import getSession from "@/lib/getSession";
 * 
 * async function fetchSession() {
 *   const session = await getSession();
 *   if (session) {
 *     console.log("User is logged in:", session.user);
 *   } else {
 *     console.log("No session found");
 *   }
 * }
 */
const getSession = cache(async () => {
  // Fetching the server session using NextAuth with the provided authentication options.
  const response = await getServerSession(authOptions);
  return response;
});

export default getSession;
