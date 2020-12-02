const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  badPrescription: Number,
  labDelay: Number,
  lateCheckIn: Number,
  openedLate: Number,
  carelessWasteDisposal: Number,
  prescription: Number,
  visitId: { type: Schema.Types.ObjectId },
  staffId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    roles: [String],
  },
  { timestamps: true, toObject: { virtuals: true } }
);
userSchema.virtual("issuesReported", {
  ref: "Issue",
  localField: "_id",
  foreignField: "staffId",
  justOne: false,
});
const visitSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    patients: [
      {
        count: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ratings: [{ nps: Number, createdAt: { type: Date, default: Date.now } }],
    revenue: [
      { revenue: Number, createdAt: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true, toObject: { virtuals: true } }
);

visitSchema.virtual("issues", {
  ref: "Issue",
  localField: "_id",
  foreignField: "visitId",
  justOne: false,
});

const User = mongoose.model("User", userSchema);
const Visit = mongoose.model("Visit", visitSchema);
const Issue = mongoose.model("Issue", issueSchema);

module.exports = { User, Visit, Issue };
