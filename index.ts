import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";
import mongoose from "mongoose";
import { User } from "./models/User";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return {
      req,
      User
    };
  },
  cors: {
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001"
        : "https://apollo-stack-51stit47a.vercel.app"
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
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`server started at ${url}`);
});
