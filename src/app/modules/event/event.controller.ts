import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EventService } from './event.service'
import httpStatus from 'http-status'

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.createEventIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created successfully',
    data: result,
  })
})

/**
 * Get all events
 */
const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const events = await EventService.getAllEventsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Get successfully',
    data: events,
  })
})

/**
 * Get a single event by ID
 */
const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const event = await EventService.getSingleEventFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Event retrived successfully',
    data: event,
  })
})

/**
 * Join an event
 */
// const joinEvent = catchAsync(async (req: Request, res: Response) => {
//   const { eventId } = req.params
//   const userId = req.body.userId
//   const result = await EventService.joinEvent(eventId, userId)
//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Joined event successfully',
//     data: result,
//   })
// })

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await EventService.deleteEventFromDB(id)

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Event not found',
      data: null,
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  })
})

/**
 * Update an event by ID
 */
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await EventService.updateEventInDB(id, req.body)

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Event not found',
      data: null,
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  })
})

export const EventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  // joinEvent,
}
