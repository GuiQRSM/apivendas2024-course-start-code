import express from 'express'
import cors from 'cors'
import { routes } from './rouetes';

const app = express();

app.use(...handlers: cors())
app.use(...handlers: express.json)
app.use(...handlers: routes)

export { app }
