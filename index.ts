import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import mongoose from "mongoose";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return {
      req
    };
  }
});

if (!process.env.MONGO_URI) {
  throw new Error("Uri must be provided");
}

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
};
MongooseConnect();
server.listen().then(({ url }) => {
  console.log(`server started at ${url}`);
});
