import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      tier: "FREE" | "PRO";
    };
  }

  interface User {
    tier: "FREE" | "PRO";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tier: "FREE" | "PRO";
  }
}
