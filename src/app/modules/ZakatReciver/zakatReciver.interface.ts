import { Model, Types } from 'mongoose'

export type TZakatReciver = {
  user: Types.ObjectId
  name: string
  gender: 'male' | 'female' | 'other'
  email: string
  profileImg?: string
  isDeleted: boolean
}

//for creating static methods

export interface ZakatRciverModel extends Model<TZakatReciver> {
  isUserExits(id: string): Promise<TZakatReciver | null>
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
