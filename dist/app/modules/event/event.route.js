"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
// event.route.ts
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const event_validation_1 = require("./event.validation");
const event_controller_1 = require("./event.controller");
const router = (0, express_1.Router)();
router.post('/create-event', (0, validateRequest_1.default)(event_validation_1.EventIdValidationSchema.CreateEventValidationSchema), event_controller_1.EventController.createEvent);
router.get('/', event_controller_1.EventController.getAllEvents);
router.get('/:id', event_controller_1.EventController.getSingleEvent);
router.patch('/:id', (0, validateRequest_1.default)(event_validation_1.EventIdValidationSchema.UpdateEventValidationSchema), event_controller_1.EventController.updateEvent);
router.delete('/:id', event_controller_1.EventController.deleteEvent);
exports.eventRoutes = router;
