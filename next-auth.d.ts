import { User } from "@/types/auth";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
