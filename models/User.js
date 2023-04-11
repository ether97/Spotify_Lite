const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  follows: [{ type: String, required: true }],
  likedSongs: [{ type: refType, ref: "Song" }],
});

const User = mongoose.model("User", UserSchema, "Users");

module.exports = User;
