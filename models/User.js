const mongoose = require("mongoose");
//Create schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    position:{ type:String,default:"staff",enum:["manage","staff"],required: true},
    missions:[{type: mongoose.SchemaTypes.ObjectId, ref: "Mission"}],
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;