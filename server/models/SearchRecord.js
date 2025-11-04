import mongoose from "mongoose";

const SearchRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  term: { type: String, index: true },
  timestamp: { type: Date, default: Date.now },
});

const SearchRecord = mongoose.model("SearchRecord", SearchRecordSchema);

export default SearchRecord;