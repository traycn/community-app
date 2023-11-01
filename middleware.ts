import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ['/', '/sign-in', '/sign-up'],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ["/api/uploadthing"],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};