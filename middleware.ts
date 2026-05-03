export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/questions/:path*",
    "/flashcards/:path*",
    "/mock/:path*",
    "/billing/:path*",
  ],
};
