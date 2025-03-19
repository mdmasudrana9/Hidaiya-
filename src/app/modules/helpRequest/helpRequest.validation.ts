import { z } from 'zod'

const CreateHelpRequestValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Help request title is required'),
    description: z
      .string()
      .trim()
      .min(1, 'Help request description is required'),
    urgencyLevel: z
      .string()
      .trim()
      .min(1, 'Urgency level is required')
      .refine((value) => ['low', 'medium', 'urgent'].includes(value), {
        message: 'Urgency level must be "low", "medium", or "urgent"',
      }),
    postedBy: z
      .string()
      .trim()
      .min(1, 'User who posted the request is required'),
    organization: z.string().trim().optional(),
    volunteersNeeded: z.number().min(1, 'Volunteers needed must be at least 1'),
  }),
})

const AddCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string().trim().min(1, 'Comment is required'),
  }),
})

export const HelpRequestValidationSchema = {
  CreateHelpRequestValidationSchema,
  AddCommentValidationSchema,
}
