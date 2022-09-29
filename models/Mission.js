const mongoose = require("mongoose");

const missionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    describe: { type: String, required: true },
    status: { type: String, enum: ["pending", "working","review","done","archive"], require: true },
    Participants:[{type: mongoose.SchemaTypes.ObjectId, ref: "User"}],
    isDeleted: { type: Boolean, default: false, required: true },

  },
  {
    timestamps: true,
  }
);

const mission = mongoose.model("Mission", missionSchema);
module.exports = mission;