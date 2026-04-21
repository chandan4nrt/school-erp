import { auth } from "@/lib/auth";// Using your auth.ts export

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user?.role;

    const isAuthPage = nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/signup");

    const isDashboardPage = nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname.startsWith("/teacher") ||
        nextUrl.pathname.startsWith("/student");

    // 1. Redirect logged-in users away from Auth pages
    if (isLoggedIn && isAuthPage && role) {
        return Response.redirect(new URL(`/${role.toLowerCase()}`, nextUrl));
    }

    // 2. Protect dashboard routes
    if (isDashboardPage) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/signin", nextUrl));
        }

        // Ensure user is on their correct role-based dashboard
        if (role) {
            const pathRole = nextUrl.pathname.split("/")[1].toUpperCase();
            if (role !== pathRole) {
                return Response.redirect(new URL(`/${role.toLowerCase()}`, nextUrl));
            }
        }
    }
});

export const config = {
    // Matcher remains the same
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};