import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "next/navigation";
 
export default authMiddleware({
  beforeAuth: redirect("/sign-in"),
  afterAuth: redirect("/"),

  publicRoutes: ["/", "/sign-in", "/sign-up"],
  ignoredRoutes: [],

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};