import mongoose, { Schema } from 'mongoose'
import { IEvent } from './event.interface'

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  attendees: [{ type: String }],
})

export const EventModel = mongoose.model<IEvent>('Event', EventSchema)
