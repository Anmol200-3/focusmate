import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Retrieve the token from cookies

  const url = req.nextUrl.clone();

  // Redirect to the login page if the user is not authenticated
  if (!token && !["/login", "/register"].includes(url.pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Apply middleware to all pages except specified paths
};
