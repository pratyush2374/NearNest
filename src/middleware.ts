import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const url = request.nextUrl;
    const { pathname } = url;

    // Public routes that should be accessible without authentication
    const isPublicRoute =
        pathname === "/" ||
        pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname.startsWith("/reset-password") ||
        pathname.startsWith("/verify-email") ||
        pathname.startsWith("/verify-your-email");

    // Protected routes that require authentication
    const isProtectedRoute =
        pathname === "/feed" ||
        pathname.startsWith("/post/") ||
        pathname === "/create-post" ||
        pathname === "/profile";

    // If user is authenticated and trying to access public routes,
    if (
        token &&
        isPublicRoute &&
        !pathname.startsWith("/verify-email") &&
        !pathname.startsWith("/reset-password") &&
        !pathname.startsWith("/verify-your-email")
    ) {
        return NextResponse.redirect(new URL("/feed", request.url));
    }

    // If user is not authenticated and trying to access protected routes,
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Allow all other cases
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/sign-in",
        "/sign-up",
        "/reset-password/:path*",
        "/verify-email/:path*",
        "/feed",
        "/post/:path*",
        "/create-post",
        "/profile",
    ],
};
