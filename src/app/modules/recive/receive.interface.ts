// src/app/modules/receive/receive.interface.ts
import { Types } from 'mongoose'

export interface IReceive {
  donorId: Types.ObjectId // who gave the donation
  receiverId: Types.ObjectId // who receives the donation
  amount: number // donation amount
  date: Date // when it happened
  method?: 'cash' | 'bank' | 'mobile' // how it was received
  message?: string // optional note or purpose
}
