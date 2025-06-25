// src/app/modules/receive/receive.model.ts
import { Schema, model } from 'mongoose'
import { IReceive } from './receive.interface'

const receiveSchema = new Schema<IReceive>(
  {
    donorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: {
      type: String,
      enum: ['cash', 'bank', 'mobile'],
      default: 'cash',
    },
    message: { type: String },
  },
  { timestamps: true },
)

export const Receive = model<IReceive>('Receive', receiveSchema)
