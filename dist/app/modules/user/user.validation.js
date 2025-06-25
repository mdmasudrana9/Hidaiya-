"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uservalidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const userValidationSchema = zod_1.z.object({
    //id: z.string().trim().min(1, { message: 'Student ID is required' }),
    password: zod_1.z
        .string({
        invalid_type_error: 'password must be string',
    })
        .max(20, { message: 'password can not be 20 charectre' })
        .optional(),
});
const changeStatususerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_constant_1.userStatus]),
    }),
});
exports.uservalidation = {
    userValidationSchema,
    changeStatususerValidationSchema,
};
