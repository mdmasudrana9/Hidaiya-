// src/app/modules/donation/donate.interface.ts
import { Types } from 'mongoose'

export interface IDonation {
  donorId: Types.ObjectId
  amount: number
  date: Date
  method?: 'stripe' | 'paypal' | 'manual'
  message?: string
}
