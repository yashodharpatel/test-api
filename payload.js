import mongoose from "mongoose";

const payloadSchema = mongoose.Schema({
  drona_android_payload: {
    type: String,
    required: [true, "Please provide a payload"],
  },
});

export default mongoose.model("Payload", payloadSchema);