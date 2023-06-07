import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("user", userSchema);

// email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   cart: {
//     items: [
//       {
//         productId: {
//           type: Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true
//         },
//         quantity: { type: Number, required: true }
//       }
//     ]
//   }