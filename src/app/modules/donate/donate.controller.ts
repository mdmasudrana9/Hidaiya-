import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DonateService } from './donate.service'
import { Request, Response } from 'express'
const createDonate = catchAsync(async (req: Request, res: Response) => {
  const result = await DonateService.createDonateIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created successfully',
    data: result,
  })
})

export const DonateController = {
  createDonate,
  // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
}
