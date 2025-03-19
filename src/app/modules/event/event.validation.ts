import { z } from 'zod'

const CreateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Event title is required'),
    description: z.string().trim().min(1, 'Event description is required'),
    date: z.string().trim().min(1, 'Event date is required'),
    time: z.string().trim().min(1, 'Event time is required'),
    location: z.string().trim().min(1, 'Event location is required'),
    category: z.string().trim().min(1, 'Event category is required'),
  }),
})

const UpdateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Event title is required').optional(),
    description: z
      .string()
      .trim()
      .min(1, 'Event description is required')
      .optional(),
    date: z.string().trim().min(1, 'Event date is required').optional(),
    time: z.string().trim().min(1, 'Event time is required').optional(),
    location: z.string().trim().min(1, 'Event location is required').optional(),
    category: z.string().trim().min(1, 'Event category is required').optional(),
  }),
})

export const EventIdValidationSchema = {
  CreateEventValidationSchema,
  UpdateEventValidationSchema,
}
