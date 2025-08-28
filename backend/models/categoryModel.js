import mongoose from "mongoose";

const categrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

export default mongoose.model("Category", categrySchema);
