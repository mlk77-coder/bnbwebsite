import { User, VerifyOtpResponse } from "@/types/auth";
import { AuthOptions, ISODateString } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher, FetcherResponse } from "./fetcher";

export interface CustomSession {
  user?: User;
  expires: ISODateString;
}

export const authOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
      if (trigger === "update") {
        const updatedUser = token.user as User;
        updatedUser.name = session?.name || updatedUser.name;
        updatedUser.email = session?.email || updatedUser.email;
        updatedUser.image = session?.image || updatedUser.image;
        updatedUser.phone = session?.phone || updatedUser.phone;
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
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials, req) {
        const phone = credentials?.phone || "";
        const otp = credentials?.otp || "";
        try {
          const response = await fetcher<VerifyOtpResponse>(
            "/auth/verify-otp",
            "en",
            {
              method: "POST",
              body: JSON.stringify({ phone, otp }),
            },
            false,
            req as Request,
          );

          if (response.ok && response.data) {
            const { user, token, token_type } = response.data.data;
            return {
              ...user,
              id: String(user.id),
              access_token: token,
              token_type,
              image: user.avatar,
            };
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
              case 422:
                throw new Error("Invalid verification code");
              default:
                throw new Error("Something went wrong!");
            }
          }
          throw new Error("Something went wrong!");
        }
      },
    }),
  ],
} satisfies AuthOptions;
