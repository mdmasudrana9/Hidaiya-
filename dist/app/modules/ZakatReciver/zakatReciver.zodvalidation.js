"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodValidationZakatReciverSchema = void 0;
const zod_1 = require("zod");
exports.zodValidationZakatReciverSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().trim().min(1, { message: 'Student ID is required' }),
        name: zod_1.z.string().trim().min(1, { message: 'Student name is required' }),
        gender: zod_1.z.enum(['male', 'female', 'other'], {
            errorMap: () => ({
                message: "Gender must be either 'male', 'female', or 'other'",
            }),
        }),
        email: zod_1.z.string().trim().email({ message: 'Email must be a valid email' }),
    }),
});
