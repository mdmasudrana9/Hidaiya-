import { IDonation } from './donate.interface'
import { Donation } from './donate.model'

const createDonateIntoDB = async (eventData: IDonation) => {
  const result = await Donation.create(eventData)
  return result
}

export const DonateService = {
  createDonateIntoDB,
  // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
}
