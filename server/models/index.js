const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roles: [String],
  issuesReported: [String],
});

const visitSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    issues: [
      {
        type: new Schema({
          badPrescription: Number,
          labDelay: Number,
          lateCheckIn: Number,
          openedLate: Number,
          carelessWasteDisposal: Number,
          prescription: Number,
          staffId: String,
          createdAt: { type: Date, default: Date.now },
        }),
      },
    ],
    patients: [{ type: new Schema({ count: Number }, { timestamps: true }) }],
    ratings: [{ type: new Schema({ nps: Number }, { timestamps: true }) }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Visit = mongoose.model("Visit", visitSchema);

module.exports = { User, Visit };
