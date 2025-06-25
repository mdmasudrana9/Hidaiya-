"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
// event.route.ts
const express_1 = require("express");
const receive_controller_1 = require("./receive.controller");
const router = (0, express_1.Router)();
router.post('/create-donate', receive_controller_1.ReciveController.createRecive);
//router.get('/', DonateController.getAllEvents)
exports.eventRoutes = router;
