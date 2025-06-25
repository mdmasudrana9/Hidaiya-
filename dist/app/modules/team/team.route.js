"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = require("express");
const team_controller_1 = require("./team.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const team_validation_1 = require("./team.validation");
const router = (0, express_1.Router)();
// Create a team
router.post('/create-team', (0, validateRequest_1.default)(team_validation_1.TeamValidationSchema.CreateTeamValidationSchema), team_controller_1.TeamController.createTeam);
// Get all teams
router.get('/', team_controller_1.TeamController.getAllTeams);
// Get a single team by ID
router.get('/:id', team_controller_1.TeamController.getSingleTeam);
// Update a team
router.patch('/:id', (0, validateRequest_1.default)(team_validation_1.TeamValidationSchema.UpdateTeamValidationSchema), team_controller_1.TeamController.updateTeam);
// Delete a team
router.delete('/:id', team_controller_1.TeamController.deleteTeam);
exports.teamRoutes = router;
