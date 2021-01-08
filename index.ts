import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";
import mongoose from "mongoose";
import { User } from "./models/User";
import { Agent } from "./models/Agent";

const app = express();
app.set("trust proxy", "1");

// app.use(
//   cookieSession({
//     secret: process.env.JWT_SECRET,
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
//     ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
//     secure: process.env.NODE_ENV !== "development"
//   })
// );

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    return {
      req,
      User,
      Agent,
      res
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

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001"
        : "https://apollo-stack.vercel.app",
    allowedHeaders: "Access-Control-Allow-Credentials"
  }
});

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`server started at http://localhost:4000${server.graphqlPath}`);
});
