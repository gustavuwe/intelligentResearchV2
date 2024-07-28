import { FastifyInstance } from 'fastify'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
import { registerResearch } from './modules/research/controllers/registerResearch'
import { verifyJWT } from './middlewares/verify-jwt'
// import { validate } from './http/controllers/auth'

export const registerRoutes = async (app: FastifyInstance) => {
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)

  app.post('/research/register', { onRequest: [verifyJWT] }, registerResearch)
}
