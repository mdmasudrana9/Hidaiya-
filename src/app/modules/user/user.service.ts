import httpStatus from 'http-status'
import mongoose from 'mongoose'
import crypto from 'crypto'
import AppError from '../../errors/AppError'
import { TZakatDonor } from '../ZakatDonor/zakatDonor.interface'
import { ZakatDonor } from '../ZakatDonor/zakatDonor.model'
import { TZakatReciver } from '../ZakatReciver/zakatReciver.interface'
import { ZakatReciver } from '../ZakatReciver/zakatReciver.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import sendEmail from '../../../utils/sendEmail'

// const createZakatReciverIntoDB = async (
//   password: string,
//   payload: TZakatReciver,
// ) => {
//   //create a user objects
//   const userData: Partial<TUser> = {}
//   // if password is not given , use default password
//   userData.password = password

//   //set zakatReciver role

//   userData.role = 'zakatReciver'
//   userData.email = payload.email

//   const session = await mongoose.startSession()

//   try {
//     session.startTransaction()
//     //set generated User id
//     //userData.id = await generateFacultyId()

//     // create a new user
//     const newUser = await User.create([userData], { session })

//     //create a faculty
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
//     }
//     // set id , _id as user
//     //payload.id = newUser[0].id
//     payload.user = newUser[0]._id //reference _id

//     // create a faculty (transaction-2)

//     const newZakatReciver = await ZakatReciver.create([payload], { session })

//     if (!newZakatReciver.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
//     }

//     await session.commitTransaction()
//     await session.endSession()

//     return newZakatReciver
//   } catch (error: any) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw new Error(error)
//   }
// }

const createZakatReciverIntoDB = async (
  password: string,
  payload: TZakatDonor,
) => {
  //create a user objects
  const userData: Partial<TUser> = {}
  // if password is not given , use default password
  userData.password = password

  //set zakatReciver role

  userData.role = 'zakatReciver'
  userData.email = payload.email

  const verificationToken = crypto.randomBytes(64).toString('hex')
  userData.verificationToken = verificationToken
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated User id
    //userData.id = await generateDonorId()

    // create a new user
    const newUser = await User.create([userData], { session })

    //create a donor
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    //payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newZakatReciver = await ZakatReciver.create([payload], { session })

    if (!newZakatReciver.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    // 👉 Email পাঠাও
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    const html = `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
    await sendEmail(payload.email, 'Verify Your Email', html)

    await session.commitTransaction()
    await session.endSession()

    return newZakatReciver
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const createZakatDonorIntoDB = async (
  password: string,
  payload: TZakatDonor,
) => {
  //create a user objects
  const userData: Partial<TUser> = {}
  // if password is not given , use default password
  userData.password = password

  //set zakatReciver role

  userData.role = 'zakatDonor'
  userData.email = payload.email

  const verificationToken = crypto.randomBytes(64).toString('hex')
  userData.verificationToken = verificationToken
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated User id
    //userData.id = await generateDonorId()

    // create a new user
    const newUser = await User.create([userData], { session })

    //create a donor
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    //payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newZakatDonor = await ZakatDonor.create([payload], { session })

    if (!newZakatDonor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    // 👉 Email পাঠাও
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    const html = `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
    await sendEmail(payload.email, 'Verify Your Email', html)

    await session.commitTransaction()
    await session.endSession()

    return newZakatDonor
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const getMeIntoDB = async (userEmail: string, role: string) => {
  // const decoded = veriFyToken(token, config.jwt_secret as string)
  // const { userId, role } = decoded
  console.log(userEmail, role)

  let result = null
  if (role === 'zakatReciver') {
    result = await ZakatReciver.findOne({ email: userEmail }).populate('user')
  }
  if (role === 'zakatDonor') {
    result = await ZakatDonor.findOne({ email: userEmail }).populate('user')
  }
  // if (role === 'admin') {
  //   result = await Admin.findOne({ id: userId }).populate('user')
  // }

  return result
}

export const userService = {
  createZakatDonorIntoDB,
  createZakatReciverIntoDB,
  getMeIntoDB,
}
