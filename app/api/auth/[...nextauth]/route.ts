import NextAuth, { NextAuthOptions, User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt"; // Import JWT from next-auth/jwt
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongooseConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// AdapterUser type can be imported if you are using an adapter
import { AdapterUser } from "next-auth/adapters"; 

// Extend the NextAuth User type to match your application's User model
interface CustomUser {
  id: string;
  email: string | null; // Allow null for optional fields
  name?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with the provided email!");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password!");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        } 
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || "";
        token.name = user.name || "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email || "",
        name: token.name || "",
      };
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};


const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };

