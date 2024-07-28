import { FastifyInstance } from 'fastify'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
// import { validate } from './http/controllers/auth'

export const registerRoutes = (app: FastifyInstance) => {
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)
}
