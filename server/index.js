const { ApolloServer, gql } = require("apollo-server");

let port = process.env.PORT || 8080;

const serverConfig = {
  playground: true,
  introspection: true,
  endpoint: "/graphQL",
};

const server = new ApolloServer(serverConfig);

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 server ready at ${url}`);
});
