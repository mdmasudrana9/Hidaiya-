// event.route.ts
import { Router } from 'express'
import { DonateController } from './donate.controller'

const router = Router()

router.post('/create-donate', DonateController.createDonate)
//router.get('/', DonateController.getAllEvents)

export const eventRoutes = router
