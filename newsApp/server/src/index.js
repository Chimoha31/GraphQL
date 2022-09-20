const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const path = require('path');


let links = [
  {
    id: "link-0",
    description: "Learn GraphQL at Udemy",
    url: "www.udemy-graphql-tutorial.com",
  },
];

// typeDefs = Schemaをセット
// !は、空であってはならない(nullはダメ)
// refactoringしたら以下の記述は要らない
// const typeDefs = gql`
// `;

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
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// playground = postmanのGraphQL版
server.listen().then(({ url }) => {
  console.log(`${url} is working 🏃🏼‍♀️💨`);
});
