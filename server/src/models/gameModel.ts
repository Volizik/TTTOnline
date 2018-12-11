import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
