import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { registerRoutes } from '../router'
import { env } from './env'

export const app = Fastify({
  logger: {
    level: 'debug',
  },
})
// BACKUP

// app.register(cors, {
//   // allow all origins
//   // origin: true,
//   origin: env.FRONTEND_URL || 'http://localhost:3000',
//   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// })

app.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [env.FRONTEND_URL, 'http://localhost:3000']
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      cb(null, true)
      return
    }
    cb(new Error('Not allowed by CORS'), false)
  },
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
