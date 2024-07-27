import { FastifyInstance } from 'fastify'

import { validate } from './validate'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/validate', validate)
}
