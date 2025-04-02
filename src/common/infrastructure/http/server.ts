/* eslint-disable prettier/prettier */
import { env } from '../env'
import { dataSource } from '../typeorm'
import { app } from './app'

dataSource
  .initialize()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`)
      console.log('API docs is available at GET /docs')
    })
  })
  .catch(error => {
    console.log('Error connecting to database', error)
  })
