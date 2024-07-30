import { FastifyInstance } from 'fastify'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
import { register } from './modules/research/controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'
import { update } from './modules/research/controllers/update'
// import { validate } from './http/controllers/auth'

export const registerRoutes = async (app: FastifyInstance) => {
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)

  app.post('/research/register', { onRequest: [verifyJWT] }, register)
  app.put('/research/update', { onRequest: [verifyJWT] }, update)
}
