"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_route_1 = require("../modules/event/event.route");
const helpRequest_route_1 = require("../modules/helpRequest/helpRequest.route");
const team_route_1 = require("../modules/team/team.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/events',
        route: event_route_1.eventRoutes,
    },
    {
        path: '/helpRequest',
        route: helpRequest_route_1.helpRequestRoutes,
    },
    {
        path: '/team',
        route: team_route_1.teamRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
