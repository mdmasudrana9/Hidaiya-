import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    //if the token is not provided from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,

        'You are not authorized to access this route for !token',
      )
    }

    //if the token is valid
    let decoded
    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
    } catch (error) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route decoded',
      )
    }

    const { role, userEmail, iat } = decoded
    //if the user role is not in the required roles
    // checking if the user is exist
    console.log('role :>> ', role, 'email :>> ', userEmail, 'iat :>> ', iat)
    const user = await User.isUserExistsByCustomId(userEmail)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found  user!')
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
    }

    // checking if the user is blocked
    const userStatus = user?.status

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route role',
      )
    }
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
