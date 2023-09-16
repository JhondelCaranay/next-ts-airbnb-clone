import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      // if has token return true else false
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
