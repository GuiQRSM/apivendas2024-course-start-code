import { Router } from 'express'


const routes = Router()
routes.get(path: '/', ...handlers:(req, res) => {
  return res.status(code: 200).json(body:{message: 'Olá dev'})
})

export { routes }
