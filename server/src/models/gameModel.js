"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        "default": ''
    },
    created_date: {
        type: Date,
        "default": Date.now
    },
    status: {
        type: String,
        "default": 'waiting' // waiting, in_progress
    }
});
