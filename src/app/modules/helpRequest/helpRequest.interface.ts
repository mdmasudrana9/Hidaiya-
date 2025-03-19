export interface IHelpRequest {
  title: string
  description: string
  urgencyLevel: 'low' | 'medium' | 'urgent'
  postedBy: string
  organization?: string // Optional, if the request is posted by an organization
  volunteersNeeded: number
  comments?: string[]
  createdAt: Date
  updatedAt: Date
}
