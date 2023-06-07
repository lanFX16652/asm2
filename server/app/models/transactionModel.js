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
    room: {
        type: [Schema.Types.ObjectId],
        ref: 'room',
    },
    roomNumber: {
        type: [Number]
    },
    dateStart: {
        type: String,
        required: true,
    },
    dateEnd: {
        type: String,
        required: true,
    },
    price: {
        type: String,
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