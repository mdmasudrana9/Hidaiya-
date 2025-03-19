import mongoose, { Schema } from 'mongoose'
import { ITeam } from './team.interface'

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String },
  membershipType: {
    type: String,
    enum: ['public', 'private'],
  },
  members: [{ type: String }],
  events: [{ type: String }],
  achievements: [{ type: String }],
  leaderboardPosition: { type: Number, default: 0 },
})

export const TeamModel = mongoose.model<ITeam>('Team', TeamSchema)
