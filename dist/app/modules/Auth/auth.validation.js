"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'name is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const changePassWordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old Password is required.' }),
        newPassword: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh Token is required.' }),
    }),
});
const forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is required.' }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is required.' }),
        newPassword: zod_1.z.string({ required_error: 'User Password is required.' }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePassWordValidationSchema,
    refreshTokenValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema,
};
