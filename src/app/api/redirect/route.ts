import { redirect } from "next/navigation";

/**
 * @description Handles POST requests and redirects the user to a provided URI.
 * @param {Request} request - The incoming HTTP request object containing the URI in its body.
 * @returns {Promise<void>} - This function returns a void promise, indicating that it performs a redirect action.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "uri": "/new-page"
 * // }
 * 
 * The function will redirect the user to the specified URI.
 */
export async function POST(request: Request): Promise<void> {
  try {
    // Extracting the URI from the JSON body of the request
    const { uri } = await request.json();
    
    // Checking if a URI was provided
    if (!uri) {
      throw new Error("URI is required.");
    }

    // Redirecting the user to the specified URI
    redirect(uri);
  } catch (error) {
    // Handling potential errors (e.g., invalid JSON or missing URI)
    console.error("Error handling POST request:", error);
    throw new Error("Failed to process the request.");
  }
}
