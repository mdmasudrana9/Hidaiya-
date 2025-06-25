"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpRequestRoutes = void 0;
const express_1 = require("express");
const helpRequest_controller_1 = require("./helpRequest.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const helpRequest_validation_1 = require("./helpRequest.validation");
const router = (0, express_1.Router)();
// Route to create a help request
router.post('/create-request', (0, validateRequest_1.default)(helpRequest_validation_1.HelpRequestValidationSchema.CreateHelpRequestValidationSchema), helpRequest_controller_1.HelpRequestController.createHelpRequest);
// Route to get all help requests
router.get('/', helpRequest_controller_1.HelpRequestController.getAllHelpRequests);
// Route to get a single help request by ID
router.get('/:id', helpRequest_controller_1.HelpRequestController.getSingleHelpRequest);
// Route to add a comment to a help request
// router.post(
//   '/:id/add-comment',
//   ValidateRequest(HelpRequestValidationSchema.AddCommentValidationSchema),
//   HelpRequestController.addComment,
// )
exports.helpRequestRoutes = router;
