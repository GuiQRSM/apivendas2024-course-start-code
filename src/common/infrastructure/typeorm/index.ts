/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm'
import { env } from '../env'

export const dataSource = new DataSource({
  type: env.DB__TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  schema: env.DB_SCHEMA,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  entities: ['**/entities/*.ts'],
  migrations: ['**/migrations/*.ts'],
  synchronize: false,
  logging: false,
})
