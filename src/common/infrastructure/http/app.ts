/* eslint-disable prettier/prettier */
import cors from 'cors'
import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middlewares/errorHandler'
import { routes } from './routes'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [],
}

const SwaggerSpec = swaggerJSDoc(options)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec))
app.use(routes)
app.use(errorHandler)

export { app }
