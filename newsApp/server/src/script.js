// This is a client library to access to the database
const { PrismaClient } = require("@prisma/client");
const { makeStrictEnum } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

async function main() {
  //schema.prismaのfileでLinkとしているから、以下もprisma.linkにしなければならない
  // SQL文を知らなくても、create()メソッドを使うことでdatabaseに保存することができる
  const newLink = await prisma.link.create({
    data: {
      description: "Learn GraphQL at Udemy",
      url: "www.udemy-graphql-tutorial.com",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    prisma.$disconnect;
  });
