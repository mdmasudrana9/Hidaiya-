"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veriFyToken = void 0;
// import jwt, { JwtPayload } from 'jsonwebtoken'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const createToken = (
//   jwtPayload: { userId: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn })
// }
// export const verifyToken = (token: string, secret: string) => {
//   return jwt.verify(token, secret) as JwtPayload
// }
const veriFyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.veriFyToken = veriFyToken;
