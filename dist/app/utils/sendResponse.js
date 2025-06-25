"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status((data === null || data === void 0 ? void 0 : data.statusCode) || 500).json({
        success: (data === null || data === void 0 ? void 0 : data.success) || false,
        message: (data === null || data === void 0 ? void 0 : data.message) || 'An error occurred',
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
    });
};
exports.default = sendResponse;
