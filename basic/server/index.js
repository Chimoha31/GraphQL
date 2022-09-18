const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Herry Potter",
    author: "J.K. Roaling",
  },
  {
    title: "Bartimius",
    author: "Jonasan Straud",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    test: [Book]
  }
`;

const resolvers = {
  Query: {
    test: () => books,
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
