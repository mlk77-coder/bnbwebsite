import { LoginResponse, User } from "@/types/auth";
import { AuthOptions, ISODateString } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import generateAppleClientSecret from "./appleClientSecret";
import { fetcher, FetcherResponse } from "./fetcher";

export interface CustomSession {
  user?: User;
  expires: ISODateString;
}

export const authOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (user) token.user = user;
      if (trigger === "update") {
        const updatedUser = token.user as User;
        updatedUser.name = session?.name || updatedUser.name;
        updatedUser.email = session?.email || updatedUser.email;
        updatedUser.image = session?.image || updatedUser.image;
        updatedUser.phone = session?.phone || updatedUser.phone;
      }
      if (account) {
        if (account.provider === "google") {
          const googleToken = account.access_token;
          try {
            const response = await fetcher<LoginResponse>(
              "/login/google",
              "en",
              {
                method: "POST",
                body: JSON.stringify({ token: googleToken }),
              },
            );
            if (response.ok && response.data) {
              token.user = response.data.data;
            }
          } catch (error) {
            console.error("Error verifying Google token:", error);
          }
        } else if (account.provider === "apple") {
          const idToken = account.id_token;
          try {
            const response = await fetcher<LoginResponse>(
              "/login/apple",
              "en",
              {
                method: "POST",
                body: JSON.stringify({ token: idToken }),
              },
            );
            if (response.ok && response.data) {
              token.user = response.data.data;
            }
          } catch (error) {
            console.error("Error verifying Apple token:", error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      const s = session as CustomSession;
      s.user = token.user as User;
      return s;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        s_id: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email || "";
        const password = credentials?.password || "";
        const s_id = credentials?.s_id || "";
        try {
          const response = await fetcher<LoginResponse>(
            "/login",
            "en",
            {
              method: "POST",
              body: JSON.stringify({ email, password, s_id }),
            },
            false,
            req as Request,
          );

          if (response.ok && response.data) {
            const user = response.data.data;
            return { ...user, id: "" };
          } else {
            return null;
          }
        } catch (error) {
          if (
            typeof error === "object" &&
            error !== null &&
            "status" in error
          ) {
            const fetcherError = error as FetcherResponse<unknown>;
            switch (fetcherError.status) {
              case 400:
                throw new Error("Email or password is incorrect");
              case 434:
                throw new Error("434");
              default:
                throw new Error("Something went wrong!");
            }
          }
          throw new Error("Something went wrong!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: generateAppleClientSecret(),
    //   authorization: {
    //     params: {
    //       scope: "name email",
    //       response_mode: "form_post",
    //       response_type: "code",
    //     },
    //   },
    // }),
  ],
} satisfies AuthOptions;
