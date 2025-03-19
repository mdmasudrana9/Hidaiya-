import { z } from 'zod'

const CreateTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Team name is required'),
    description: z.string().trim().min(1, 'Team description is required'),
    membershipType: z
      .string()
      .trim()
      .min(1, 'Membership type is required')
      .refine((value) => ['public', 'private'].includes(value), {
        message: 'Membership type must be either "public" or "private"',
      })
      .optional(),
    createdBy: z
      .string()
      .trim()
      .min(1, 'User ID of the team creator is required')
      .optional(),
  }),
})

const UpdateTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Team name is required').optional(),
    description: z
      .string()
      .trim()
      .min(1, 'Team description is required')
      .optional(),
    membershipType: z
      .string()
      .trim()
      .min(1, 'Membership type is required')
      .refine((value) => ['public', 'private'].includes(value), {
        message: 'Membership type must be either "public" or "private"',
      })
      .optional(),
  }),
})

export const TeamValidationSchema = {
  CreateTeamValidationSchema,
  UpdateTeamValidationSchema,
}
