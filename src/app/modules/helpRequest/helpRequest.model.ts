import mongoose, { Schema } from 'mongoose'
import { IHelpRequest } from './helpRequest.interface'

const HelpRequestSchema = new Schema<IHelpRequest>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    urgencyLevel: {
      type: String,
      enum: ['low', 'medium', 'urgent'],
      required: true,
    },
    postedBy: { type: String, required: true },
    organization: { type: String, required: false },
    volunteersNeeded: { type: Number, required: true },
    comments: [{ type: String }],
  },
  { timestamps: true },
)

export const HelpRequestModel = mongoose.model<IHelpRequest>(
  'HelpRequest',
  HelpRequestSchema,
)
