import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TeamService } from './team.service'
import httpStatus from 'http-status'

/**
 * Create a new team
 */
const createTeam = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.createTeamIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team created successfully',
    data: result,
  })
})

/**
 * Get all teams
 */
const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const teams = await TeamService.getAllTeamsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teams retrieved successfully',
    data: teams,
  })
})

/**
 * Get a single team by ID
 */
const getSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const team = await TeamService.getSingleTeamFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team retrieved successfully',
    data: team,
  })
})

/**
 * Update a team
 */
const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedTeam = await TeamService.updateTeamIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team updated successfully',
    data: updatedTeam,
  })
})

/**
 * Delete a team
 */
const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await TeamService.deleteTeamFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team deleted successfully',
  })
})

export const TeamController = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
}
