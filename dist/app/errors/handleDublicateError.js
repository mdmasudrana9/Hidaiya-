"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDublicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        { path: '', message: `${extractedMessage} is allready Exists` },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorSources,
    };
};
exports.default = handleDublicateError;
