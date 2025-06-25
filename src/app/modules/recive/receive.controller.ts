import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import { Request, Response } from 'express'
import { ReciveService } from './receive.service'
const createRecive = catchAsync(async (req: Request, res: Response) => {
  const result = await ReciveService.createReciveIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created successfully',
    data: result,
  })
})

export const ReciveController = {
  createRecive,
  // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
}
