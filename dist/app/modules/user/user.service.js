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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const zakatDonor_model_1 = require("../ZakatDonor/zakatDonor.model");
const zakatReciver_model_1 = require("../ZakatReciver/zakatReciver.model");
const user_model_1 = require("./user.model");
const createZakatReciverIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //create a user objects
    const userData = {};
    // if password is not given , use default password
    userData.password = password;
    //set zakatReciver role
    userData.role = 'zakatReciver';
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set generated User id
        //userData.id = await generateFacultyId()
        // create a new user
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        //payload.id = newUser[0].id
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newZakatReciver = yield zakatReciver_model_1.ZakatReciver.create([payload], { session });
        if (!newZakatReciver.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newZakatReciver;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const createZakatDonorIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //create a user objects
    const userData = {};
    // if password is not given , use default password
    userData.password = password;
    //set zakatReciver role
    userData.role = 'zakatDonor';
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set generated User id
        //userData.id = await generateDonorId()
        // create a new user
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a donor
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        //payload.id = newUser[0].id
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newZakatDonor = yield zakatDonor_model_1.ZakatDonor.create([payload], { session });
        if (!newZakatDonor.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newZakatDonor;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const getMeIntoDB = (userEmail, role) => __awaiter(void 0, void 0, void 0, function* () {
    // const decoded = veriFyToken(token, config.jwt_secret as string)
    // const { userId, role } = decoded
    console.log(userEmail, role);
    let result = null;
    if (role === 'zakatReciver') {
        result = yield zakatReciver_model_1.ZakatReciver.findOne({ email: userEmail }).populate('user');
    }
    if (role === 'zakatDonor') {
        result = yield zakatDonor_model_1.ZakatDonor.findOne({ email: userEmail }).populate('user');
    }
    // if (role === 'admin') {
    //   result = await Admin.findOne({ id: userId }).populate('user')
    // }
    return result;
});
exports.userService = {
    createZakatDonorIntoDB,
    createZakatReciverIntoDB,
    getMeIntoDB,
};
