import { useAPIMutation } from "@/hooks/useApi";

type SignInResponse = { sub: string }
type LogoutResponse = {}
export const useSignIn = () =>
  useAPIMutation<SignInResponse>('/auth/sign-in', 'post', { withCredentials: true })

export const useLogout = () => useAPIMutation<LogoutResponse>('/auth/logout', 'post', { withCredentials: true })