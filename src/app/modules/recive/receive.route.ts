// event.route.ts
import { Router } from 'express'
import { ReciveController } from './receive.controller'

const router = Router()

router.post('/create-donate', ReciveController.createRecive)
//router.get('/', DonateController.getAllEvents)

export const eventRoutes = router
