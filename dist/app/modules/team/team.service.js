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
exports.TeamService = void 0;
const team_model_1 = require("./team.model");
/**
 * Create a new team
 */
const createTeamIntoDB = (teamData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.TeamModel.create(teamData);
    return result;
});
/**
 * Get all teams
 */
const getAllTeamsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.TeamModel.find();
    return result;
});
/**
 * Get a single team by ID
 */
const getSingleTeamFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.TeamModel.findById(id);
    return result;
});
/**
 * Update a team
 */
const updateTeamIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.TeamModel.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return result;
});
/**
 * Delete a team
 */
const deleteTeamFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.TeamModel.findByIdAndDelete(id);
    return result;
});
exports.TeamService = {
    createTeamIntoDB,
    getAllTeamsFromDB,
    getSingleTeamFromDB,
    updateTeamIntoDB,
    deleteTeamFromDB,
};
