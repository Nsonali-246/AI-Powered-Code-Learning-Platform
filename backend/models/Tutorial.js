import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;