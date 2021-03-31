require('dotenv').config({
  path: ".env"
})

// application dependencies
const express = require('express')
const logger = require('pino')()
const bodyParser = require('body-parser')

// load express routes modules
const healthz = require('./api/healthz')
const users = require('./api/users')
const auth = require('./api/auth')

// load ENV values
// const { PORT } = process.env
// if (PORT == null || PORT === "") {
//   logger.info("PORT env value is not defined")
//   process.exit(1)
// }
const PORT = "9500";

const { JWT_SECRET } = process.env
if (JWT_SECRET == null || JWT_SECRET === "") {
  logger.info("JWT_SECRET env value is not defined")
  process.exit(1)
}

// preprare and run API service
const app = express()
app.use(bodyParser.json({ type: 'application/json' }))
app.use('/v1/healthz', healthz)
app.use('/v1/users', users)
app.use('/v1/auth', auth)
app.listen(PORT, () => logger.info(`server running on port=${PORT}`))

// listen OS signals
process.on("SIGTERM", () => {
  logger.warn("here in SIGTERM")
  process.exit(0)
});
process.on("SIGINT", () => {
  logger.warn("here in SIGINT")
  process.exit(0)
  // db.close()
});