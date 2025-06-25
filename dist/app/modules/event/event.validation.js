"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventIdValidationSchema = void 0;
const zod_1 = require("zod");
const CreateEventValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, 'Event title is required'),
        description: zod_1.z.string().trim().min(1, 'Event description is required'),
        date: zod_1.z.string().trim().min(1, 'Event date is required'),
        time: zod_1.z.string().trim().min(1, 'Event time is required'),
        location: zod_1.z.string().trim().min(1, 'Event location is required'),
        category: zod_1.z.string().trim().min(1, 'Event category is required'),
    }),
});
const UpdateEventValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, 'Event title is required').optional(),
        description: zod_1.z
            .string()
            .trim()
            .min(1, 'Event description is required')
            .optional(),
        date: zod_1.z.string().trim().min(1, 'Event date is required').optional(),
        time: zod_1.z.string().trim().min(1, 'Event time is required').optional(),
        location: zod_1.z.string().trim().min(1, 'Event location is required').optional(),
        category: zod_1.z.string().trim().min(1, 'Event category is required').optional(),
    }),
});
exports.EventIdValidationSchema = {
    CreateEventValidationSchema,
    UpdateEventValidationSchema,
};
