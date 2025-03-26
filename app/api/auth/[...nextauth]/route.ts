import NextAuth, { NextAuthOptions, User as NextAuthUser, Session } from "next-auth";
import { authOptions } from "./auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const runtime = 'nodejs';
