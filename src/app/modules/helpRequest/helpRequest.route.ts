import { Router } from 'express'
import { HelpRequestController } from './helpRequest.controller'
import ValidateRequest from '../../middleware/validateRequest'
import { HelpRequestValidationSchema } from './helpRequest.validation'

const router = Router()

// Route to create a help request
router.post(
  '/create-request',
  ValidateRequest(
    HelpRequestValidationSchema.CreateHelpRequestValidationSchema,
  ),
  HelpRequestController.createHelpRequest,
)

// Route to get all help requests
router.get('/', HelpRequestController.getAllHelpRequests)

// Route to get a single help request by ID
router.get('/:id', HelpRequestController.getSingleHelpRequest)

// Route to add a comment to a help request
// router.post(
//   '/:id/add-comment',
//   ValidateRequest(HelpRequestValidationSchema.AddCommentValidationSchema),
//   HelpRequestController.addComment,
// )

export const helpRequestRoutes = router
