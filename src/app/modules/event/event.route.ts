// event.route.ts
import { Router } from 'express'
import ValidateRequest from '../../middleware/validateRequest'
import { EventIdValidationSchema } from './event.validation'
import { EventController } from './event.controller'

const router = Router()

router.post(
  '/create-event',
  ValidateRequest(EventIdValidationSchema.CreateEventValidationSchema),
  EventController.createEvent,
)
router.get('/', EventController.getAllEvents)
router.get('/:id', EventController.getSingleEvent)
router.patch(
  '/:id',
  ValidateRequest(EventIdValidationSchema.UpdateEventValidationSchema),
  EventController.updateEvent,
)
router.delete('/:id', EventController.deleteEvent)

export const eventRoutes = router
