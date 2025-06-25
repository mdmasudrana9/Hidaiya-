"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
// src/app/modules/donation/donate.model.ts
const mongoose_1 = require("mongoose");
const donateSchema = new mongoose_1.Schema({
    donorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: {
        type: String,
        enum: ['stripe', 'paypal', 'manual'],
        default: 'manual',
    },
    message: { type: String },
}, { timestamps: true });
exports.Donation = (0, mongoose_1.model)('Donation', donateSchema);
