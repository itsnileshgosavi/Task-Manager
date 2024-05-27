import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // Allow access to login and signup API routes
  if (
    pathname === '/api/login' ||
    pathname === '/api/users' ||
    pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  const loggedInUserNotAccessPath = pathname === '/login' || pathname === '/signup' || pathname ==='/api/auth/signin';

  // Redirect logged-in users trying to access login or signup pages
  if (loggedInUserNotAccessPath) {
    
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));

   
    }
  } else {
    // Redirect users trying to access protected pages without logging in
    if (!token) {
      if (pathname.startsWith('/api')) {
        return new NextResponse(
          JSON.stringify({ message: 'Access Denied', success: false }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    '/addtask',
    '/signup',
    '/your-tasks',
    '/login',
    '/profile/:path*',

  ],
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: '/api/auth/signin',
//     error: '/api/auth/error', // Error page to handle failed login
//   },
// });

// export const config = {
//   matcher: [
    
//     "/addtask",
//     "/your-tasks",
//     "/profile/:path*",
//   ],
// };

