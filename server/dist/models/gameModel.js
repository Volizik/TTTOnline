"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'waiting' // waiting, in_progress
    }
});
//# sourceMappingURL=gameModel.js.map