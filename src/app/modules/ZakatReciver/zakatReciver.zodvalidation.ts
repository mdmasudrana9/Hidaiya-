import { z } from 'zod'

export const zodValidationZakatReciverSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, { message: 'Student ID is required' }),
    name: z.string().trim().min(1, { message: 'Student name is required' }),
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({
        message: "Gender must be either 'male', 'female', or 'other'",
      }),
    }),
    email: z.string().trim().email({ message: 'Email must be a valid email' }),
  }),
})

export type ZakatDonor = z.infer<typeof zodValidationZakatReciverSchema>
