import { IReceive } from './receive.interface'
import { Receive } from './receive.model'

const createReciveIntoDB = async (eventData: IReceive) => {
  const result = await Receive.create(eventData)
  return result
}

export const ReciveService = {
  createReciveIntoDB,
  // Add other methods as needed, e.g., getAllDonations, getSingleDonation, etc.
}
