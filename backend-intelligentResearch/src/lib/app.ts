import Fastify from 'fastify'
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import { registerRoutes } from '../router'

export const app = Fastify()

const jwtOptions: FastifyJWTOptions = {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '3d', // global configuration of expiration time
  },
}

app.register(fastifyJwt, jwtOptions)
app.register(registerRoutes)

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
