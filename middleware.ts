import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/questions/:path*",
    "/flashcards/:path*",
    "/mock/:path*",
    "/billing/:path*",
  ],
};
