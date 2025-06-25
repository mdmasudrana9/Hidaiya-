import { model, Schema } from 'mongoose'
import { TZakatReciver, ZakatRciverModel } from './zakatReciver.interface'

const ZakatReciverSchema = new Schema<TZakatReciver, ZakatRciverModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
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
        validator: function (value: string) {
          const firstNameSrting = value.charAt(0).toUpperCase() + value.slice(1)
          return firstNameSrting === value
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
  },
  {
    toJSON: { virtuals: true }, // ✅ Ensure virtual properties are included
    toObject: { virtuals: true },
  },
)

// ** Virtual Property - Full Name **
// studentSchema.virtual('fullName').get(function () {
//   if (!this.name) return '' // Handle missing name field
//   return `${this?.name?.firstName} ${this?.name?.middleName ? this?.name?.middleName + ' ' : ''}${this?.name?.lastName}`
// })

//Document middleware/hook:

//Query middleware/hook:
ZakatReciverSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

ZakatReciverSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
ZakatReciverSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//for creating static methods
ZakatReciverSchema.statics.isUserExits = async function (id: string) {
  const existhingUser = await ZakatReciver.findOne({ id })

  return existhingUser
}

// custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existhingUser = await Student.findOne({ id })
//   return existhingUser
// }

export const ZakatReciver = model<TZakatReciver, ZakatRciverModel>(
  'ZakatReciver',
  ZakatReciverSchema,
)
