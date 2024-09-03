import { verifyJWT } from "@/utils/jwtVerification";

export const useAuthentication = () => {
  const payload = verifyJWT()

  if (!payload) {
    return { authenticated: false, isAdmin: false };
  }

  return { authenticated: true, isAdmin: payload.role === "ADMIN" };
}