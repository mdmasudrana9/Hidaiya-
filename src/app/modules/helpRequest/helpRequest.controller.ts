import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { HelpRequestService } from './helpRequest.service'
import httpStatus from 'http-status'

/**
 * Create a new help request
 */
const createHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await HelpRequestService.createHelpRequestInDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help request created successfully',
    data: result,
  })
})

/**
 * Get all help requests
 */
const getAllHelpRequests = catchAsync(async (req: Request, res: Response) => {
  const helpRequests = await HelpRequestService.getAllHelpRequestsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help requests fetched successfully',
    data: helpRequests,
  })
})

/**
 * Get a single help request by ID
 */
const getSingleHelpRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const helpRequest = await HelpRequestService.getSingleHelpRequestFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Help request fetched successfully',
    data: helpRequest,
  })
})

/**
 * Add a comment to a help request
 */
// const addComment = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const { comment } = req.body
//   const result = await HelpRequestService.addCommentToHelpRequest(id, comment)
//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Comment added successfully',
//     data: result,
//   })
// })

export const HelpRequestController = {
  createHelpRequest,
  getAllHelpRequests,
  getSingleHelpRequest,
  //   addComment,
}
