import express from 'express'
import ValidateRequest from '../../middleware/validateRequest'

import { zodValidationZakatDonorSchema } from '../ZakatDonor/zakatDonor.zodvalidation'
import { zodValidationZakatReciverSchema } from '../ZakatReciver/zakatReciver.zodvalidation'
import { userController } from './user.controller'
import auth from '../../middleware/auth'
const router = express.Router()

router.post(
  '/create-zakat-donor',
  //auth(USER_ROLE.admin),
  //ValidateRequest(zodValidationZakatDonorSchema),
  userController.createZakatDonor,
)
router.post(
  '/create-zakat-reciver',
  //auth(USER_ROLE.admin),
  //ValidateRequest(zodValidationZakatReciverSchema),
  userController.createZakatReciver,
)
// router.post(
//   '/create-admin',
//   // auth(USER_ROLE.admin),
//   ValidateRequest(AdminValidations.createAdminValidationSchema),
//   userController.createAdmin,
// )

router.get('/me', auth('zakatDonor', 'zakatReciver'), userController.getMe)
// router.post(
//   '/change-status/:id',
//   auth('admin'),
//   ValidateRequest(uservalidation.changeStatususerValidationSchema),
//   userController.changeStatus,
// )

export const UserRoutes = router
