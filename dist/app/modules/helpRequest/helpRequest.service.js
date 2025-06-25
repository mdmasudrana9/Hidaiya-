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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpRequestService = void 0;
const helpRequest_model_1 = require("./helpRequest.model");
/**
 * Create a new help request
 */
const createHelpRequestInDB = (helpRequestData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield helpRequest_model_1.HelpRequestModel.create(helpRequestData);
    return result;
});
/**
 * Get all help requests
 */
const getAllHelpRequestsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield helpRequest_model_1.HelpRequestModel.find();
    return result;
});
/**
 * Get a single help request by ID
 */
const getSingleHelpRequestFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield helpRequest_model_1.HelpRequestModel.findById(id);
    return result;
});
/**
 * Add a comment to a help request
 */
// const addCommentToHelpRequest = async (id: string, comment: string) => {
//   const helpRequest = await HelpRequestModel.findById(id)
//   if (!helpRequest) {
//     throw new Error('Help request not found')
//   }
//   helpRequest.comments.push(comment)
//   await helpRequest.save()
//   return helpRequest
// }
exports.HelpRequestService = {
    createHelpRequestInDB,
    getAllHelpRequestsFromDB,
    getSingleHelpRequestFromDB,
    //   addCommentToHelpRequest,
};
