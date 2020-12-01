const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("./graphql/resolvers");
const fs = require("fs");
const typeDefs = gql(
  fs.readFileSync("./server/graphql/schema.gql", { encoding: "utf-8" })
);

let port = process.env.PORT || 8080;

const serverConfig = {
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  endpoint: "/graphQL",
};

const server = new ApolloServer(serverConfig);

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 server ready at ${url}`);
});
