"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpRequestValidationSchema = void 0;
const zod_1 = require("zod");
const CreateHelpRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, 'Help request title is required'),
        description: zod_1.z
            .string()
            .trim()
            .min(1, 'Help request description is required'),
        urgencyLevel: zod_1.z
            .string()
            .trim()
            .min(1, 'Urgency level is required')
            .refine((value) => ['low', 'medium', 'urgent'].includes(value), {
            message: 'Urgency level must be "low", "medium", or "urgent"',
        }),
        postedBy: zod_1.z
            .string()
            .trim()
            .min(1, 'User who posted the request is required'),
        organization: zod_1.z.string().trim().optional(),
        volunteersNeeded: zod_1.z.number().min(1, 'Volunteers needed must be at least 1'),
    }),
});
const AddCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().trim().min(1, 'Comment is required'),
    }),
});
exports.HelpRequestValidationSchema = {
    CreateHelpRequestValidationSchema,
    AddCommentValidationSchema,
};
