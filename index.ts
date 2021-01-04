import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";
import mongoose from "mongoose";
import { User } from "./models/User";
import { Agent } from "./models/Agent";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001"
        : "https://apollo-stack-51stit47a.vercel.app"
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return {
      req,
      User,
      Agent
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

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`server started at http://localhost:4000${server.graphqlPath}`);
});
