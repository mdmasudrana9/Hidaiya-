// // src/app/modules/donation/donate.interface.ts
// import { Types } from 'mongoose'

// export interface IDonation {
//   donorId: Types.ObjectId
//   amount: number
//   date: Date
//   method?: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Cash' | 'Other'
//   message?: string
// }

// src/app/modules/donation/donate.interface.ts
import mongoose, { Types } from 'mongoose'

export interface IDonation {
  donorId: mongoose.Types.ObjectId
  amount: number
  date: Date
  method?: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Cash' | 'Other'
  message?: string
}
