require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User, Visit, Issue } = require("../models");

const Query = {
  getAllUsers: async (root, args, ctx, info) => {
    const users = User.find().populate("issuesReported");
    if (!users) {
      throw new Error("no users found");
    }
    return users;
  },
  getAllVisits: async (root, args, ctx, info) => {
    const visits = Visit.find().populate("issues");
    if (!visits) {
      throw new Error("no visits found");
    }
    return visits;
  },
};
const Mutation = {
  signUp: async (root, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await User.create({ ...args, roles: ["staff"], password });

    return { user };
  },
  signIn: async (root, args, context, info) => {
    const user = await User.findOne({ email: args.email });

    if (!user) {
      throw new Error("No such user found ");
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    return { user };
  },

  addAssessment: async (root, args, context, info) => {
    const visitId = mongoose.Types.ObjectId();
    if (args.issues) {
      Issue.create({
        ...args.issues,
        staffId: args.staffId,
        visitId: visitId,
      });
    }
    let visit = await Visit.create({ ...args, _id: visitId });
    visit = await visit.populate("issues").execPopulate();
    return visit;
  },
  updateAssessment: async (root, args, context, info) => {
    const visit = await Visit.findOneAndUpdate(
      { _id: args.visitId },
      {
        $push: {
          issues: [{ ...args.issues, staffId: args.staffId }],
          patients: [args.patients],
          revenue: [args.revenue],
        },
      }
    );
    return visit;
  },
};

module.exports = { Query, Mutation };
