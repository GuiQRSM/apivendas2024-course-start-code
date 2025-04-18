/* eslint-disable prettier/prettier */
import { AppError } from './app-error-'

/* eslint-disable prettier/prettier */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}
