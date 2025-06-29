import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import AppError from '../../errors/AppError'
import { Request } from 'express'
import { User } from './user.model'

const createZakatDonor = catchAsync(async (req, res, next) => {
  const { password, donor: donorData } = req.body
  const result = await userService.createZakatDonorIntoDB(password, donorData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  Created Successfully',
    data: result,
  })
})

const createZakatReciver = catchAsync(async (req, res) => {
  const { password, reciver: reciverData } = req.body

  const result = await userService.createZakatReciverIntoDB(
    password,
    reciverData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  })
})
const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.params
  console.log('token :>> ', token)

  const user = await User.findOne({ verificationToken: token })
  console.log('user :>> ', user)
  if (!user) {
    res.status(400).json({ success: false, message: 'Invalid token' })
    return
  }

  // user.isVerified = true
  // user.verificationToken = undefined

  await User.updateOne(
    { _id: user._id },
    { $set: { isVerified: true }, $unset: { verificationToken: '' } },
  )
  //console.log('user :>> ', user)
  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
    redirectTo: `/dashboard/${user.role}`,
  })
})

// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body

//   const result = await userService.createAdminIntoDB(password, adminData)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created successfully',
//     data: result,
//   })
// })

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
  // }

  const { userEmail, role } = req.user
  console.log('role :>> ', role)
  const result = await userService.getMeIntoDB(userEmail, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fetched successfully',
    data: result,
  })
})

// user.controller.ts

export const userController = {
  createZakatDonor,
  createZakatReciver,
  verifyEmail,
  //createAdmin,
  getMe,
}
