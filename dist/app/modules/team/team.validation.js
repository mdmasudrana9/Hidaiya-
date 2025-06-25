"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamValidationSchema = void 0;
const zod_1 = require("zod");
const CreateTeamValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, 'Team name is required'),
        description: zod_1.z.string().trim().min(1, 'Team description is required'),
        membershipType: zod_1.z
            .string()
            .trim()
            .min(1, 'Membership type is required')
            .refine((value) => ['public', 'private'].includes(value), {
            message: 'Membership type must be either "public" or "private"',
        })
            .optional(),
        createdBy: zod_1.z
            .string()
            .trim()
            .min(1, 'User ID of the team creator is required')
            .optional(),
    }),
});
const UpdateTeamValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, 'Team name is required').optional(),
        description: zod_1.z
            .string()
            .trim()
            .min(1, 'Team description is required')
            .optional(),
        membershipType: zod_1.z
            .string()
            .trim()
            .min(1, 'Membership type is required')
            .refine((value) => ['public', 'private'].includes(value), {
            message: 'Membership type must be either "public" or "private"',
        })
            .optional(),
    }),
});
exports.TeamValidationSchema = {
    CreateTeamValidationSchema,
    UpdateTeamValidationSchema,
};
