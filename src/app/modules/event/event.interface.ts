export interface IEvent {
  title: string
  description: string
  date: Date
  time: string
  location: string
  category: string
  createdBy: string
  attendees?: string[]
}
