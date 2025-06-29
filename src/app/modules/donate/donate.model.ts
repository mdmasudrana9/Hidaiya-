// // src/app/modules/donation/donate.model.ts
// import { Schema, model } from 'mongoose'
// import { IDonation } from './donate.interface'

// const donateSchema = new Schema<IDonation>(
//   {
//     donorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     amount: { type: Number, required: true },
//     date: { type: Date, required: true },
//     method: {
//       type: String,
//       enum: ['bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Cash', 'Other'],
//       default: 'manual',
//     },
//     message: { type: String },
//   },
//   { timestamps: true },
// )

// export const Donation = model<IDonation>('Donation', donateSchema)

// src/app/modules/donation/donate.model.ts
import { Schema, model } from 'mongoose'
import { IDonation } from './donate.interface'

const donateSchema = new Schema<IDonation>(
  {
    donorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: {
      type: String,
      enum: ['bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Cash', 'Other'],
    },
    message: { type: String },
  },
  { timestamps: true },
)

export const Donation = model<IDonation>('Donation', donateSchema)
