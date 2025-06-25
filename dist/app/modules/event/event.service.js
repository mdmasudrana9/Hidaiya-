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
exports.EventService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const event_model_1 = require("./event.model");
const http_status_1 = __importDefault(require("http-status"));
const createEventIntoDB = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.create(eventData);
    return result;
});
const getAllEventsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.find();
    return result;
});
const getSingleEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event id not found');
    }
    return result;
});
const deleteEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Event id not found');
    }
    return result;
});
const updateEventInDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.EventModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
/**
 * Join an event
 */
// const joinEventIntoDB = async (eventId: string, userId: string) => {
//   const event = await EventModel.findById(eventId)
//   if (!event) {
//     throw new Error('Event not found')
//   }
//   event.attendees.push(userId)
//   await event.save()
//   return event
// }
exports.EventService = {
    createEventIntoDB,
    getAllEventsFromDB,
    getSingleEventFromDB,
    deleteEventFromDB,
    updateEventInDB,
    //  joinEventIntoDB,
};
