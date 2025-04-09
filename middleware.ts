import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/signing", "/signup"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
