import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    roomNumbers: {
        type: [Number], // 1 , 2, 3
        required: true,
    },
    roomBooked: {
        type: [Number], 
    },
});

module.exports = mongoose.model("room", roomSchema);