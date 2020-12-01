require("dotenv").config();
const { User, Visit } = require("../models");

const Query = {
  getAllUsers: async (root, args, ctx, info) => {
    const users = User.find();
    if (!users) {
      throw new Error("no users found");
    }
    return users;
  },
  getAllVisits: async (root, args, ctx, info) => {
    const visits = Visit.find();
    if (!visits) {
      throw new Error("no visits found");
    }
    return visits;
  },
};
const Mutation = {
  signUp: async (root, args, context, info) => {},
  signIn: async (root, args, context, info) => {},

  addAssessment: async (root, args, context, info) => {},
  updateAssessment: async (root, args, context, info) => {},
};

module.exports = { Query, Mutation };
