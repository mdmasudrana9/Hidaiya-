import { Model, Types } from 'mongoose'

export type TZakatDonor = {
  user: Types.ObjectId
  name: string
  gender: 'male' | 'female' | 'other'
  email: string
  profileImg?: string
  isDeleted: boolean
}

//for creating static methods

export interface ZakatDonorModel extends Model<TZakatDonor> {
  isUserExits(id: string): Promise<TZakatDonor | null>
}

// custom instance method

// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
