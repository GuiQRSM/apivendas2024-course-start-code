/* eslint-disable prettier/prettier */
import { env } from '../env'
import { app } from './app'

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
