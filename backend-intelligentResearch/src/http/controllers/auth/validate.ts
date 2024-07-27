import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    email: z.string(),
  })

  const { email } = validateCheckInParamsSchema.parse(request.body)

  const validateCheckInUseCase = makeAuthenticateUseCase() // substitutes instance of classes

  await validateCheckInUseCase.execute({
    email,
  })

  return reply.status(204).send()
}
