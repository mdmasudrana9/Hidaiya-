"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const createZakatDonor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, donor: donorData } = req.body;
    const result = yield user_service_1.userService.createZakatDonorIntoDB(password, donorData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student  Created Successfully',
        data: result,
    });
}));
const createZakatReciver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, reciver: reciverData } = req.body;
    const result = yield user_service_1.userService.createZakatReciverIntoDB(password, reciverData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty is created successfully',
        data: result,
    });
}));
// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body
//   const result = await userService.createAdminIntoDB(password, adminData)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created successfully',
//     data: result,
//   })
// })
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.headers.authorization
    // if (!token) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
    // }
    const { userEmail, role } = req.user;
    console.log('role :>> ', role);
    const result = yield user_service_1.userService.getMeIntoDB(userEmail, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User data fetched successfully',
        data: result,
    });
}));
exports.userController = {
    createZakatDonor,
    createZakatReciver,
    //createAdmin,
    getMe,
};
