import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'hotel'
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'room',
    },
    roomsNumber: {
        type: [Number]
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("transaction", transactionSchema);