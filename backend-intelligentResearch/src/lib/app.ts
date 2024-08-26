import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import { registerRoutes } from '../router'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = Fastify()

// const jwtOptions: FastifyJWTOptions = {
//   secret: env.JWT_SECRET,
//   cookie: {
//     cookieName: 'refreshToken',
//     signed: false,
//   },
//   sign: {
//     expiresIn: '10m',
//   },
// }
app.register(cors, {
  // allow all origins
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
})
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
