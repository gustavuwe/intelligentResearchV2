export interface JwtPayload {
  userId: string
  username: string
  role: 'USER' | 'ADMIN'
}
