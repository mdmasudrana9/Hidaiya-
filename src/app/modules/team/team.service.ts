import { ITeam } from './team.interface'
import { TeamModel } from './team.model'

/**
 * Create a new team
 */
const createTeamIntoDB = async (teamData: ITeam) => {
  const result = await TeamModel.create(teamData)
  return result
}

/**
 * Get all teams
 */
const getAllTeamsFromDB = async () => {
  const result = await TeamModel.find()
  return result
}

/**
 * Get a single team by ID
 */
const getSingleTeamFromDB = async (id: string) => {
  const result = await TeamModel.findById(id)
  return result
}

/**
 * Update a team
 */
const updateTeamIntoDB = async (id: string, updateData: Partial<ITeam>) => {
  const result = await TeamModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
  return result
}

/**
 * Delete a team
 */
const deleteTeamFromDB = async (id: string) => {
  const result = await TeamModel.findByIdAndDelete(id)
  return result
}

export const TeamService = {
  createTeamIntoDB,
  getAllTeamsFromDB,
  getSingleTeamFromDB,
  updateTeamIntoDB,
  deleteTeamFromDB,
}
