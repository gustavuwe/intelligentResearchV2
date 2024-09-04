import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'
import { logout } from './modules/auth/controllers/logout'
import { signIn } from './modules/auth/controllers/sign-in'
import { signUp } from './modules/auth/controllers/sign-up'
import { fetchCandidates } from './modules/candidate/controllers/fetch'
import { findByResearchId } from './modules/candidate/controllers/findById'
import { findCandidateByName } from './modules/candidate/controllers/findCandidateByName'
import { registerCandidate } from './modules/candidate/controllers/register'
import { deleteResearch } from './modules/research/controllers/delete'
import { fetchResearches } from './modules/research/controllers/fetch'
import { register } from './modules/research/controllers/register'
import { update } from './modules/research/controllers/update'
import { registerVote } from './modules/vote/controllers/register'
import { fetchVoters } from './modules/voter/controllers/fetch'
import { findByName } from './modules/voter/controllers/findByName'
import { registerVoter } from './modules/voter/controllers/register'
// import { updateVoter } from './modules/voter/controllers/update'
import { sendVote } from './modules/vote/controllers/sendVote'

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/sign-in', signIn)
  fastify.post('/sign-up', signUp)
  fastify.post('/logout', logout)
}

const researchRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', register)
  fastify.put('/update', update)
  fastify.delete('/delete/:id', deleteResearch)
  fastify.get('/', fetchResearches)
}

const candidateRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', registerCandidate)
  fastify.get('/', fetchCandidates)
  fastify.get('/findByName', findCandidateByName)
  fastify.get('/findByResearchId/:id', findByResearchId)
}

const voterRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', registerVoter)
  fastify.get('/', fetchVoters)
  fastify.get('/findByName', findByName)
  // fastify.patch('/update/:id', updateVoter)
}

const voteRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', registerVote)
  fastify.post('/sendVote', sendVote)
  // fastify.patch('/update/:id', updateVote)
}

export const registerRoutes = async (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: '/auth' })

  app.register(async (fastify) => {
    fastify.addHook('onRequest', verifyJWT)

    fastify.register(researchRoutes, { prefix: '/research' })
    fastify.register(candidateRoutes, { prefix: '/candidate' })
    fastify.register(voterRoutes, { prefix: '/voter' })
    fastify.register(voteRoutes, { prefix: '/vote' })
  })
}
