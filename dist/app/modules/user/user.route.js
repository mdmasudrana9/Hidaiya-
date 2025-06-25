"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create-zakat-donor', 
//auth(USER_ROLE.admin),
//ValidateRequest(zodValidationZakatDonorSchema),
user_controller_1.userController.createZakatDonor);
router.post('/create-zakat-reciver', 
//auth(USER_ROLE.admin),
//ValidateRequest(zodValidationZakatReciverSchema),
user_controller_1.userController.createZakatReciver);
// router.post(
//   '/create-admin',
//   // auth(USER_ROLE.admin),
//   ValidateRequest(AdminValidations.createAdminValidationSchema),
//   userController.createAdmin,
// )
router.get('/me', (0, auth_1.default)('zakatDonor', 'zakatReciver'), user_controller_1.userController.getMe);
// router.post(
//   '/change-status/:id',
//   auth('admin'),
//   ValidateRequest(uservalidation.changeStatususerValidationSchema),
//   userController.changeStatus,
// )
exports.UserRoutes = router;
