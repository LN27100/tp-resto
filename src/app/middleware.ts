
export { default } from "next-auth/middleware";

// Configuration du middleware
export const config = {
  matcher: ["/recipes/:path*"], 
};
