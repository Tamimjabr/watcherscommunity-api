import { connectDB } from './config/mongoose';
import { errorMiddleware } from './middlewares/error-middleware';
import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import { router } from './routes/router';
import { addEventListener } from './helpers/event-emitter';

const main = async () => {
  await connectDB()
  const app: Application = express()

  // Security
  app.use(helmet())
  app.use(cors())
  // app.use(
  //   cors({
  //     exposedHeaders: ["custom-header"]
  //   })
  // )

  // Logging
  app.use(logger('dev'))

  // Parse requests of the content type application/json.
  app.use(express.json())

  app.use(router)
  app.use(errorMiddleware)

  addEventListener()

  app.listen(process.env.PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} at http://localhost:${process.env.PORT}`
    )
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)