"use server";
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

 
export default authMiddleware({
  beforeAuth: (req) => { 
    NextResponse.redirect(new URL('/sign-in', req.url));
  },
  afterAuth: (req) => {
    // NextResponse.redirect(new URL('/', req.url));
  },

  publicRoutes: ["/", "/sign-in", "/sign-up"],
  ignoredRoutes: [],

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};