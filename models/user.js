import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  fuid: { type: String, default: null },
  joinedOn: { type: Date, default: Date.now },
  todayQuestionCount: { type: Number, default: 0 },
  stripeId: { type: String },
  activePlan: { type: Object, default: null }
});

export default mongoose.model("User", userSchema);
