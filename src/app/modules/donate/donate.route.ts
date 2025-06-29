// // event.route.ts
// import { Router } from 'express'
// import { DonateController } from './donate.controller'

// const router = Router()

// router.post('/create-donate', DonateController.createDonate)
// router.post('/allDonate', DonateController.getAllDonate)
// //router.get('/', DonateController.getAllEvents)

// export const donateRoutes = router
// src/app/modules/donation/donate.route.ts
import { Router } from 'express'
import { DonateController } from './donate.controller'

const router = Router()

// ✅ New payment route
router.post('/init-payment', DonateController.initDonatePayment)
router.post('/payment-success/:transactionId', DonateController.paymentSuccess)
router.post('/payment-fail', DonateController.paymentFail)
router.post('/payment-cancel', DonateController.paymentCancel)

// ✅ Existing routes
router.post('/allDonate', DonateController.getAllDonate)

export const donateRoutes = router
