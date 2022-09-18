const { ApolloServer, gql } = require("apollo-server");

let links = [
  {
    id: "link-0",
    description: "Learn GraphQL at Udemy",
    url: "www.udemy-graphql-tutorial.com",
  },
];

// typeDefs = Schemaをセット
// !は、空であってはならない(nullはダメ)
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// リゾルバ関数。(*Queryとresolversのinfoの文字列は合わせる事！)
const resolvers = {
  Query: {
    info: () => "News App Clone",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// playground = postmanのGraphQL版
server.listen().then(({ url }) => {
  console.log(`${url} is working 🏃🏼‍♀️💨`);
});
