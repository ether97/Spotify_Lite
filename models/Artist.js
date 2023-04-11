const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = mongoose.Types.ObjectId;

const ArtistSchema = new Schema({
  picture: { type: String, required: true },
  name: { type: String, required: true },
  songs: [{ type: String }],
});

const Artist = mongoose.model("Artist", ArtistSchema, "Artists");

module.exports = Artist;
