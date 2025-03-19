import AppError from '../../errors/AppError'
import { IEvent } from './event.interface'
import { EventModel } from './event.model'
import httpStatus from 'http-status'

const createEventIntoDB = async (eventData: IEvent) => {
  const result = await EventModel.create(eventData)
  return result
}

const getAllEventsFromDB = async () => {
  const result = await EventModel.find()
  return result
}

const getSingleEventFromDB = async (id: string) => {
  const result = await EventModel.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event id not found')
  }
  return result
}

const deleteEventFromDB = async (id: string) => {
  const result = await EventModel.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event id not found')
  }
  return result
}

const updateEventInDB = async (id: string, updateData: Partial<IEvent>) => {
  const result = await EventModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
  return result
}

/**
 * Join an event
 */
// const joinEventIntoDB = async (eventId: string, userId: string) => {
//   const event = await EventModel.findById(eventId)
//   if (!event) {
//     throw new Error('Event not found')
//   }

//   event.attendees.push(userId)
//   await event.save()
//   return event
// }

export const EventService = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  deleteEventFromDB,
  updateEventInDB,
  //  joinEventIntoDB,
}
