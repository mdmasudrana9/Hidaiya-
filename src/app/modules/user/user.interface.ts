import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  email: string
  password: string
  needsPasswordChange?: boolean
  passwordChangedAt?: Date
  role: 'zakatDonor' | 'admin' | 'zakatReciver' | 'superAdmin'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
  isVerified: boolean
  verificationToken?: string
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(email: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
