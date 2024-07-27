import Fastify from 'fastify'
import { ZodError } from 'zod'
import { authRoutes } from './http/controllers/auth/routes'
import { env } from '../src/env'

export const app = Fastify()

app.register(authRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
