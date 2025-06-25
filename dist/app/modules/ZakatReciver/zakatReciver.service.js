"use strict";
// import httpStatus from 'http-status'
// import mongoose from 'mongoose'
// import AppError from '../../errors/AppError'
// import { User } from '../user/user.model'
// import { Student } from './zakatReciver.model'
// import QueryBuilder from '../../builder/QueryBuilder'
// import { studentSearchablefields } from './student.constant'
// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   const studentQuery = new QueryBuilder(
//     Student.find()
//       .populate('user')
//       .populate('addmissionSemester')
//       .populate({
//         path: 'academicDepartment',
//         populate: { path: 'academicFaculty' },
//       }),
//     query,
//   )
//     .search(studentSearchablefields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields()
//   const result = await studentQuery.modelQuery
//   //const meta = await studentQuery.countTotal()
//   return { result }
// }
// const getSingleStudentsFromDB = async (id: string) => {
//   const result = await Student.findById(id)
//     .populate('addmissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: { path: 'academicFaculty' },
//     })
//   // const result = await Student.aggregate([{ $match: { id: id } }])
//   // console.log(result)
//   return result
// }
// const deleteSingleStudentsFromDB = async (id: string) => {
//   const session = await mongoose.startSession() // Start session
//   session.startTransaction() // Start transaction
//   try {
//     const deletedStudent = await Student.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true, session },
//     )
//     if (!deletedStudent) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
//     }
//     const userId = deletedStudent.user
//     const deletedUser = await User.findByIdAndUpdate(
//       userId,
//       { isDeleted: true },
//       { new: true, session },
//     )
//     if (!deletedUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
//     }
//     await session.commitTransaction() // Commit transaction
//     session.endSession() // End session
//     return deletedStudent
//   } catch (error) {
//     await session.abortTransaction() // Abort transaction in case of error
//     session.endSession() // Ensure session is closed
//     throw error // Rethrow the error so the API response can handle it
//   }
// }
// // Service function to update student data
// // const updateStudentInDB = async (id: string, payload: Partial<TZakatDonor>) => {
// //   const { name, gurdian, localGuardian, ...remainingStudentData } = payload
// //   const modifiedUpdatedData: Record<string, unknown> = {
// //     ...remainingStudentData,
// //   }
// //   if (name && Object.keys(name).length) {
// //     for (const [key, value] of Object.entries(name)) {
// //       modifiedUpdatedData[`name.${key}`] = value
// //     }
// //   }
// //   if (gurdian && Object.keys(gurdian).length) {
// //     for (const [key, value] of Object.entries(gurdian)) {
// //       modifiedUpdatedData[`gurdian.${key}`] = value
// //     }
// //   }
// //   if (localGuardian && Object.keys(localGuardian).length) {
// //     for (const [key, value] of Object.entries(localGuardian)) {
// //       modifiedUpdatedData[`localGuardian.${key}`] = value
// //     }
// //   }
// //   const result = await Student.findByIdAndUpdate(
// //     id,
// //     { $set: modifiedUpdatedData },
// //     { new: true, runValidators: true }, // Return updated document and validate changes
// //   )
// //   return result
// // }
// export const StudentService = {
//   getAllStudentsFromDB,
//   getSingleStudentsFromDB,
//   deleteSingleStudentsFromDB,
//   //updateStudentInDB,
// }
