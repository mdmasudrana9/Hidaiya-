"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receive = void 0;
// src/app/modules/receive/receive.model.ts
const mongoose_1 = require("mongoose");
const receiveSchema = new mongoose_1.Schema({
    donorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: {
        type: String,
        enum: ['cash', 'bank', 'mobile'],
        default: 'cash',
    },
    message: { type: String },
}, { timestamps: true });
exports.Receive = (0, mongoose_1.model)('Receive', receiveSchema);
