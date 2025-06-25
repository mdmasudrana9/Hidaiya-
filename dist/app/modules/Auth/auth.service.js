"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //Acess Granted :send AccessToken . RefreshToken
    //Create token and send it to the user
    const JwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_secret, {
        //expiresIn: config.jwt_access_expiration,
        expiresIn: '1d',
    });
    const refreshToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_refresh_secret, {
        //expiresIn: config.jwt_refresh_expiration,
        expiresIn: '365d',
    });
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userData.userId)
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }
//   //checking if the password is correct
//   if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   )
//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   )
//   return null
// }
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //if the token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    //if the user role is not in the required roles
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized !');
    }
    //Create token and send it to the user
    const JwtPayload = {
        userId: user,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_secret, {
        //expiresIn: config.jwt_access_expiration,
        expiresIn: '1d',
    });
    return {
        accessToken,
    };
});
// const forgotPassword = async (userId: string) => {
//   const user = await User.isUserExistsByCustomId(userId)
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }
//   const JwtPayload = {
//     userId: user.id,
//     role: user.role,
//   }
//   const resetToken = jwt.sign(JwtPayload, config.jwt_secret as any, {
//     //expiresIn: config.jwt_access_expiration,
//     expiresIn: '10m',
//   })
//   const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`
//   console.log(resetUILink)
//   sendEmail(user.email, resetUILink)
//   //return resetUILink
// }
// const resetPassword = async (
//   payload: { id: string; newPassword: string },
//   token: string,
// ) => {
//   const user = await User.isUserExistsByCustomId(payload.id)
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }
//   const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
//   if (decoded.userId !== payload.id) {
//     throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized !')
//   }
//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   )
//   await User.findOneAndUpdate(
//     {
//       id: decoded.userId,
//       role: decoded.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   )
//   console.log(decoded)
// }
exports.AuthService = {
    loginUser,
    //   changePassword,
    refreshToken,
    //   forgotPassword,
    //   resetPassword,
};
