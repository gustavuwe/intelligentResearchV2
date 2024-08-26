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
import { verify } from './modules/auth/controllers/verify'
import { fetchCandidates } from './modules/candidate/controllers/fetch'
import { fetchVoters } from './modules/voter/controllers/fetch'
import { findByName } from './modules/voter/controllers/findByName'
import { findCandidateByName } from './modules/candidate/controllers/findCandidateByName'
import { updateVoter } from './modules/voter/controllers/update'
import { verifyAdmin } from './modules/auth/controllers/verify-admin'
import { logout } from './modules/auth/controllers/logout'
import { findByResearchId } from './modules/candidate/controllers/findById'

export const registerRoutes = async (app: FastifyInstance) => {
  // auth
  app.post('/auth/sign-in', signIn)
  app.post('/auth/sign-up', signUp)
  app.post('/auth/logout', logout)

  // verify token
  app.get('/auth/verify', verify)
  app.get('/auth/verify-admin', verifyAdmin)

  // research
  app.post('/research/register', register)
  app.put('/research/update', update)
  app.delete('/research/delete', deleteResearch)
  app.get('/research', fetchResearches)

  // candidate
  app.post('/candidate/register', registerCandidate)
  app.get('/candidate', fetchCandidates)
  app.get('/candidate/findByName', findCandidateByName)
  app.get('/candidate/findByResearchId/:id', findByResearchId)

  // voter
  app.post('/voter/register', registerVoter)
  app.get('/voter', fetchVoters)
  app.get('/voter/findByName', findByName)
  app.patch('/voter/update/:id', updateVoter)

  // vote
  app.post('/vote/register', registerVote)
}
