import { FastifyInstance } from 'fastify'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
import { register } from './modules/research/controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'
import { update } from './modules/research/controllers/update'

export const registerRoutes = async (app: FastifyInstance) => {
  // auth
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)

  // research
  app.post('/research/register', { onRequest: [verifyJWT] }, register)
  app.put('/research/update', { onRequest: [verifyJWT] }, update)
}
