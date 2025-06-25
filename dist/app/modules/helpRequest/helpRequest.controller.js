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
exports.HelpRequestController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const helpRequest_service_1 = require("./helpRequest.service");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create a new help request
 */
const createHelpRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield helpRequest_service_1.HelpRequestService.createHelpRequestInDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Help request created successfully',
        data: result,
    });
}));
/**
 * Get all help requests
 */
const getAllHelpRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const helpRequests = yield helpRequest_service_1.HelpRequestService.getAllHelpRequestsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Help requests fetched successfully',
        data: helpRequests,
    });
}));
/**
 * Get a single help request by ID
 */
const getSingleHelpRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const helpRequest = yield helpRequest_service_1.HelpRequestService.getSingleHelpRequestFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Help request fetched successfully',
        data: helpRequest,
    });
}));
/**
 * Add a comment to a help request
 */
// const addComment = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const { comment } = req.body
//   const result = await HelpRequestService.addCommentToHelpRequest(id, comment)
//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Comment added successfully',
//     data: result,
//   })
// })
exports.HelpRequestController = {
    createHelpRequest,
    getAllHelpRequests,
    getSingleHelpRequest,
    //   addComment,
};
