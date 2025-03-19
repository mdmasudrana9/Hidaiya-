import { Router } from 'express'
import { TeamController } from './team.controller'
import ValidateRequest from '../../middleware/validateRequest'
import { TeamValidationSchema } from './team.validation'

const router = Router()

// Create a team
router.post(
  '/create-team',
  ValidateRequest(TeamValidationSchema.CreateTeamValidationSchema),
  TeamController.createTeam,
)

// Get all teams
router.get('/', TeamController.getAllTeams)

// Get a single team by ID
router.get('/:id', TeamController.getSingleTeam)

// Update a team
router.patch(
  '/:id',
  ValidateRequest(TeamValidationSchema.UpdateTeamValidationSchema),
  TeamController.updateTeam,
)

// Delete a team
router.delete('/:id', TeamController.deleteTeam)

export const teamRoutes = router
