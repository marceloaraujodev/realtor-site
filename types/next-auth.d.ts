// types/next-auth.d.ts or root of project
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string | null;
    name?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string | null;
      name?: string;
    };
  }

  interface JWT extends NextAuthJWT {
    id: string;
    email: string | null;
    name?: string;
  }
}
