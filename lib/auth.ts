import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, tier: user.tier as "FREE" | "PRO" };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const target = new URL(url, baseUrl);
      if (target.origin !== baseUrl) return baseUrl;
      if (target.pathname === "/login" || target.pathname === "/register") {
        return `${baseUrl}/dashboard`;
      }
      return target.toString();
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tier = (user as { tier: "FREE" | "PRO" }).tier ?? "FREE";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.tier = token.tier as "FREE" | "PRO";
      }
      return session;
    },
  },
};
