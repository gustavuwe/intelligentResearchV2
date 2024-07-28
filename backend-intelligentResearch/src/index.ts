import { app } from './lib/app'
import { env } from './lib/env'

app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log('🚀 HTTP Server Running!')
})
