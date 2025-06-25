"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
// event.route.ts
const express_1 = require("express");
const donate_controller_1 = require("./donate.controller");
const router = (0, express_1.Router)();
router.post('/create-donate', donate_controller_1.DonateController.createDonate);
//router.get('/', DonateController.getAllEvents)
exports.eventRoutes = router;
