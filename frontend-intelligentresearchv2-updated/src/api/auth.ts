import { useAPIMutation } from "@/hooks/useApi";

type SignInResponse = { sub: string }
type LogoutResponse = {}
type DeleteResponse = {}
export const useSignIn = () =>
  useAPIMutation<SignInResponse>('/auth/sign-in', 'post', { withCredentials: true })

export const useLogout = () => useAPIMutation<LogoutResponse>('/auth/logout', 'post', { withCredentials: true })

export const useDeleteByUserId = (userId: string) => useAPIMutation<DeleteResponse>(`/auth/delete/${userId}`, 'delete', { withCredentials: true })