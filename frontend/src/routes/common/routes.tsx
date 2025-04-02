import { AUTH_ROUTES } from "./routePaths";
import GoogleOAuthFailure from "@/page/auth/GoogleOAuthFailure";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];