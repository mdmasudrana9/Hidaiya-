"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken);
// router.post(
//   '/forget-password',
//   ValidateRequest(AuthValidation.forgotPasswordValidationSchema),
//   AuthController.forgotPassword,
// )
// router.post(
//   '/reset-password',
//   ValidateRequest(AuthValidation.resetPasswordValidationSchema),
//   AuthController.resetPassword,
// )
// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   ValidateRequest(AuthValidation.changePassWordValidationSchema),
//   AuthController.changePassword,
// )
// router.get('/:id', AdminControllers.getSingleAdmin)
// router.patch(
//   '/:id',
//   ValidateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// )
// router.delete('/:adminId', AdminControllers.deleteAdmin)
exports.AuthRoutes = router;
