export interface ITeam {
  name: string
  description: string
  createdBy: string
  membershipType: 'public' | 'private'
  members: string[] // Array of user IDs
  events: string[] // Array of event IDs related to the team
  achievements: string[] // Array of achievement strings
  leaderboardPosition?: number // Position on the leaderboard
}
