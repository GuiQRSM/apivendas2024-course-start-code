/* eslint-disable prettier/prettier */
import { AppError } from '@/common/domain/errors/app-error-'
import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
  API_URL: z.string().default('http://localhost:3333'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new AppError('Invalid environment variables', 400)
}

export const env = _env.data
