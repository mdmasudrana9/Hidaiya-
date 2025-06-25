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
exports.ZakatReciver = void 0;
const mongoose_1 = require("mongoose");
const ZakatReciverSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: String,
        //built-in validator
        trim: true,
        required: [true, 'First name is required'],
        maxlength: [20, 'First name can not be more than 50 characters'],
        //custom validator function
        validate: {
            validator: function (value) {
                const firstNameSrting = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameSrting === value;
            },
            message: '{VALUE} is not in the capitalize',
        },
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "Gender can only be 'male', 'female', or 'other'",
        },
        required: [true, 'Gender is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    profileImg: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: { virtuals: true }, // ✅ Ensure virtual properties are included
    toObject: { virtuals: true },
});
// ** Virtual Property - Full Name **
// studentSchema.virtual('fullName').get(function () {
//   if (!this.name) return '' // Handle missing name field
//   return `${this?.name?.firstName} ${this?.name?.middleName ? this?.name?.middleName + ' ' : ''}${this?.name?.lastName}`
// })
//Document middleware/hook:
//Query middleware/hook:
ZakatReciverSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ZakatReciverSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ZakatReciverSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//for creating static methods
ZakatReciverSchema.statics.isUserExits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existhingUser = yield exports.ZakatReciver.findOne({ id });
        return existhingUser;
    });
};
// custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existhingUser = await Student.findOne({ id })
//   return existhingUser
// }
exports.ZakatReciver = (0, mongoose_1.model)('ZakatReciver', ZakatReciverSchema);
