import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  displayName: String,
  email: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
