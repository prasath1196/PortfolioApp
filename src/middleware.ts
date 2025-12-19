
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // Allow the actual login page to load if it's strictly /admin/login (if we had one separate),
            // but here we might serve the login form on /admin if not authenticated.
            // Strategy: Rewrite to /admin/login or just return NextResponse.next() and let the Page decide?
            // Better: If no token, and we are not verified, let the Client Content handle the "Show Login" state?
            // OR: Redirect to a public login page.

            // Since we want a "minimal" single URL /admin, let's let the Page component handle the empty state?
            // NO, security requirement: "Ensure these answers are not available on frontend".
            // If we render the Admin Dashboard component but hide it with CSS/State, the code is there.
            // So we MUST NOT render the sensitive Admin Dashboard if not authenticated.

            // So, if no token, we can just allow the request to proceed, but the Page will render the Login Form.
            // BUT, checking the token here allows us to pass a flag header.
            return NextResponse.next();
        }

        try {
            const secretKey = new TextEncoder().encode(process.env.ADMIN_SECRET);
            await jwtVerify(token, secretKey);
            // Valid token
            return NextResponse.next();
        } catch (err) {
            // Invalid token - verification failed
            // We could clear the cookie here?
            const response = NextResponse.next();
            response.cookies.delete('admin_token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
