import { FastifyInstance } from 'fastify'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
import { register } from './modules/research/controllers/register'
import { update } from './modules/research/controllers/update'
import { deleteResearch } from './modules/research/controllers/delete'
import { fetchResearches } from './modules/research/controllers/fetch'
import { registerVoter } from './modules/voter/controllers/register'
import { registerVote } from './modules/vote/controllers/register'
import { registerCandidate } from './modules/candidate/controllers/register'

export const registerRoutes = async (app: FastifyInstance) => {
  // auth
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)

  // research
  app.post('/research/register', register)
  app.put('/research/update', update)
  app.delete('/research/delete', deleteResearch)
  app.get('/research', fetchResearches)

  // candidate
  app.post('/candidate/register', registerCandidate)

  // voter
  app.post('/voter/register', registerVoter)

  // vote
  app.post('/vote/register', registerVote)
}
