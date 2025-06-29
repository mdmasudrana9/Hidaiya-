// import { IDonation } from './donate.interface'
// import { Donation } from './donate.model'

// const createDonateIntoDB = async (eventData: IDonation) => {
//   const result = await Donation.create(eventData)
//   return result
// }
// const getAllDonateFromDB = async () => {
//   const result = await Donation.find()
//   return result
// }

// export const DonateService = {
//   createDonateIntoDB,
//   getAllDonateFromDB,
//   // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
// }

// src/app/modules/donation/donate.service.ts
import { IDonation } from './donate.interface'
import { Donation } from './donate.model'

const createDonateIntoDB = async (data: Partial<IDonation>) => {
  const result = await Donation.create(data)
  return result
}

const getAllDonateFromDB = async () => {
  const result = await Donation.find().populate('donorId')
  return result
}

export const DonateService = {
  createDonateIntoDB,
  getAllDonateFromDB,
}
