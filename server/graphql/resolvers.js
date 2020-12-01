const Query = {
  getAllUsers: async (root, args, ctx, info) => {},
  getAllVisits: async (root, args, ctx, info) => {},
};
const Mutation = {
  signUp: async (root, args, context, info) => {},
  signIn: async (root, args, context, info) => {},

  addAssessment: async (root, args, context, info) => {},
  updateAssessment: async (root, args, context, info) => {},
};

module.exports = { Query, Mutation };
