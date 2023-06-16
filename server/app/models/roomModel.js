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
    roomsNumber: [
        {
            number: { type: Number },
            unavailableDate: { type: [Date] }
        }
    ]
});

module.exports = mongoose.model("room", roomSchema);