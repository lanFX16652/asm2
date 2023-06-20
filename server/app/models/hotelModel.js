import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0
  },
  featured: {
    type: String,
    // required: true,
  },
  rooms: {
    type: [Schema.Types.ObjectId],
    ref: "room",
  },
});

export default mongoose.model("hotel", hotelSchema);
