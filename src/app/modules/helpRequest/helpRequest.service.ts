import { IHelpRequest } from './helpRequest.interface'
import { HelpRequestModel } from './helpRequest.model'

/**
 * Create a new help request
 */
const createHelpRequestInDB = async (helpRequestData: IHelpRequest) => {
  const result = await HelpRequestModel.create(helpRequestData)
  return result
}

/**
 * Get all help requests
 */
const getAllHelpRequestsFromDB = async () => {
  const result = await HelpRequestModel.find()
  return result
}

/**
 * Get a single help request by ID
 */
const getSingleHelpRequestFromDB = async (id: string) => {
  const result = await HelpRequestModel.findById(id)
  return result
}

/**
 * Add a comment to a help request
 */
// const addCommentToHelpRequest = async (id: string, comment: string) => {
//   const helpRequest = await HelpRequestModel.findById(id)
//   if (!helpRequest) {
//     throw new Error('Help request not found')
//   }
//   helpRequest.comments.push(comment)
//   await helpRequest.save()
//   return helpRequest
// }

export const HelpRequestService = {
  createHelpRequestInDB,
  getAllHelpRequestsFromDB,
  getSingleHelpRequestFromDB,
  //   addCommentToHelpRequest,
}
