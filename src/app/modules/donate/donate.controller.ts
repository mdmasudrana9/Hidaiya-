// import httpStatus from 'http-status'
// import catchAsync from '../../utils/catchAsync'
// import sendResponse from '../../utils/sendResponse'
// import { DonateService } from './donate.service'
// import { Request, Response } from 'express'
// const createDonate = catchAsync(async (req: Request, res: Response) => {
//   const result = await DonateService.createDonateIntoDB(req.body)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Donate created successfully',
//     data: result,
//   })
// })
// const getAllDonate = catchAsync(async (req: Request, res: Response) => {
//   const result = await DonateService.getAllDonateFromDB()
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Donate Get successfully',
//     data: result,
//   })
// })

// export const DonateController = {
//   createDonate,
//   getAllDonate,
//   // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
// }

// src/app/modules/donation/donate.controller.ts
// @ts-ignore
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DonateService } from './donate.service'
import { Request, Response } from 'express'

import mongoose from 'mongoose'
import SSLCommerzPayment from 'sslcommerz-lts'

const store_id = process.env.SSLCOMMERZ_STORE_ID!
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!
const is_live = false
//console.log('store_passwd  :>> ', store_passwd)

const initDonatePayment = catchAsync(async (req: Request, res: Response) => {
  // console.log('req.body :>> ', req.body)
  const { amount, method, message, donorId, date, name } = req.body

  const transactionId = 'TXN_' + Date.now()

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${process.env.BASE_URL}/donate/payment-success/${transactionId}?donorId=${donorId}&amount=${amount}&method=${method}&message=${message}&date=${date}`,
    fail_url: `${process.env.BASE_URL}/api/donate/payment-fail`,
    cancel_url: `${process.env.BASE_URL}/api/donate/payment-cancel`,
    shipping_method: 'No',
    product_name: 'Donation',
    product_category: 'Donation',
    product_profile: 'general',
    cus_name: name,
    cus_email: 'rana.cse6.bu@gamil.com',
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const apiResponse = await sslcz.init(data)
  //console.log('apiResponse :>> ', apiResponse)
  res.send({ url: apiResponse.GatewayPageURL })
})

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId
  const { donorId, amount, method, message, date } = req.query
  console.log('req.query :>> ', req.query)

  if (!donorId || !amount || !date || !method) {
    res.status(400).json({ success: false, message: 'Missing fields' })
    return
  }

  const donationData = {
    donorId: new mongoose.Types.ObjectId(donorId as string),
    amount: Number(amount), // ✅ Ensure it's a number
    method: method as
      | 'bKash'
      | 'Nagad'
      | 'Rocket'
      | 'Bank Transfer'
      | 'Cash'
      | 'Other',
    message: message as string,
    date: new Date(date as string), // ✅ Ensure valid Date object
  }

  await DonateService.createDonateIntoDB(donationData)

  res.redirect(`${process.env.FRONTEND_URL}/dashboard/donation-success`)
})

const paymentFail = catchAsync(async (_req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/donation-fail`)
})

const paymentCancel = catchAsync(async (_req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard/donation-cancel`)
})

const getAllDonate = catchAsync(async (_req: Request, res: Response) => {
  const result = await DonateService.getAllDonateFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donate Get successfully',
    data: result,
  })
})

export const DonateController = {
  initDonatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getAllDonate,
}
